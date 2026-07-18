import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Brain, 
  MessageSquare, 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  Trophy, 
  RotateCcw, 
  Flame, 
  Info,
  User,
  CheckCircle2,
  Sparkle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { supabase } from './lib/supabase';

// Define the gem structure
interface Gem {
  id: string;
  type: string;
}

interface GemType {
  id: string;
  emoji: string;
  label: string;
  colorClass: string;
  bgClass: string;
  colorHex: string;
  fact: string;
  icon: React.ComponentType<any>;
}

// 6 gem types with emojis, colors, facts, and icons
const GEM_TYPES: Record<string, GemType> = {
  data: {
    id: 'data',
    emoji: '📚',
    label: 'Data',
    colorClass: 'text-sky-400 border-sky-500 shadow-sky-500/20',
    bgClass: 'bg-sky-500/20 hover:bg-sky-500/35 border-sky-500/50 text-sky-200',
    colorHex: '#0ea5e9',
    fact: "High-quality, diverse data is the foundation of any successful AI model.",
    icon: Database
  },
  model: {
    id: 'model',
    emoji: '🧠',
    label: 'Model',
    colorClass: 'text-emerald-400 border-emerald-500 shadow-emerald-500/20',
    bgClass: 'bg-emerald-500/20 hover:bg-emerald-500/35 border-emerald-500/50 text-emerald-200',
    colorHex: '#10b981',
    fact: "AI models process data to recognize patterns and make decisions.",
    icon: Brain
  },
  prompt: {
    id: 'prompt',
    emoji: '💬',
    label: 'Prompt',
    colorClass: 'text-amber-400 border-amber-500 shadow-amber-500/20',
    bgClass: 'bg-amber-500/20 hover:bg-amber-500/35 border-amber-500/50 text-amber-200',
    colorHex: '#f59e0b',
    fact: "Prompt engineering guides AI outputs without retraining the underlying model.",
    icon: MessageSquare
  },
  neuron: {
    id: 'neuron',
    emoji: '🕸️',
    label: 'Neuron',
    colorClass: 'text-violet-400 border-violet-500 shadow-violet-500/20',
    bgClass: 'bg-violet-500/20 hover:bg-violet-500/35 border-violet-500/50 text-violet-200',
    colorHex: '#8b5cf6',
    fact: "Neural networks consist of layers of interconnected nodes that mimic biological brains.",
    icon: Cpu
  },
  output: {
    id: 'output',
    emoji: '✨',
    label: 'Output',
    colorClass: 'text-rose-400 border-rose-500 shadow-rose-500/20',
    bgClass: 'bg-rose-500/20 hover:bg-rose-500/35 border-rose-500/50 text-rose-200',
    colorHex: '#f43f5e',
    fact: "AI output is generated probabilistically by predicting the most likely next tokens.",
    icon: Sparkles
  },
  bias: {
    id: 'bias',
    emoji: '⚠️',
    label: 'Bias',
    colorClass: 'text-red-400 border-red-500 shadow-red-500/20',
    bgClass: 'bg-red-500/20 hover:bg-red-500/35 border-red-500/50 text-red-200',
    colorHex: '#ef4444',
    fact: "AI bias arises when training datasets reflect human stereotypes or systematic errors.",
    icon: AlertTriangle
  }
};

const GEM_IDS = Object.keys(GEM_TYPES);
const ROWS = 7;
const COLS = 6;
const TARGET_SCORE_BASE = 600;

export default function App() {
  // Game state
  const [board, setBoard] = useState<Gem[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(20);
  const [combo, setCombo] = useState(1);
  const [matchedSet, setMatchedSet] = useState<string[]>([]); // "r,c" strings
  const [currentFact, setCurrentFact] = useState<string | null>("Match 3 identical gems to clear them and unlock AI insights!");
  const [busy, setBusy] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [level, setLevel] = useState(1);
  const [reshuffling, setReshuffling] = useState(false);

  // Leaderboard / DB state
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [nickname, setNickname] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dbError, setDbError] = useState(false);

  // Target score for the current level
  const targetScore = TARGET_SCORE_BASE * level;

  // Initialize board and fetch leaderboard
  useEffect(() => {
    startNewGame();
    fetchLeaderboard();
  }, []);

  // Board generation ensuring no initial match-3 clusters
  const generateNewBoard = (): Gem[][] => {
    const newBoard: (Gem | null)[][] = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
    let idCounter = 0;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const invalidTypes = new Set<string>();
        // Check two cells above
        if (r >= 2) {
          const top1 = newBoard[r - 1][c]?.type;
          const top2 = newBoard[r - 2][c]?.type;
          if (top1 && top1 === top2) {
            invalidTypes.add(top1);
          }
        }
        // Check two cells to the left
        if (c >= 2) {
          const left1 = newBoard[r][c - 1]?.type;
          const left2 = newBoard[r][c - 2]?.type;
          if (left1 && left1 === left2) {
            invalidTypes.add(left1);
          }
        }

        const validTypes = GEM_IDS.filter(type => !invalidTypes.has(type));
        const chosenType = validTypes[Math.floor(Math.random() * validTypes.length)];
        newBoard[r][c] = {
          id: `gem-${idCounter++}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: chosenType
        };
      }
    }
    return newBoard as Gem[][];
  };

  // Check if a simulated board has any valid match-3 moves
  const hasValidMoves = (currentBoard: Gem[][]): boolean => {
    const typeBoard = currentBoard.map(row => row.map(g => g.type));

    const checkMatches = (b: string[][]): boolean => {
      // Horizontal
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 2; c++) {
          if (b[r][c] && b[r][c] === b[r][c + 1] && b[r][c] === b[r][c + 2]) {
            return true;
          }
        }
      }
      // Vertical
      for (let r = 0; r < ROWS - 2; r++) {
        for (let c = 0; c < COLS; c++) {
          if (b[r][c] && b[r][c] === b[r + 1][c] && b[r][c] === b[r + 2][c]) {
            return true;
          }
        }
      }
      return false;
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Swap Right
        if (c < COLS - 1) {
          const temp = typeBoard[r][c];
          typeBoard[r][c] = typeBoard[r][c + 1];
          typeBoard[r][c + 1] = temp;
          const matched = checkMatches(typeBoard);
          typeBoard[r][c + 1] = typeBoard[r][c];
          typeBoard[r][c] = temp;
          if (matched) return true;
        }
        // Swap Down
        if (r < ROWS - 1) {
          const temp = typeBoard[r][c];
          typeBoard[r][c] = typeBoard[r + 1][c];
          typeBoard[r + 1][c] = temp;
          const matched = checkMatches(typeBoard);
          typeBoard[r + 1][c] = typeBoard[r][c];
          typeBoard[r][c] = temp;
          if (matched) return true;
        }
      }
    }
    return false;
  };

  // Generate a board that is guaranteed to have at least one valid move
  const generateValidBoard = (): Gem[][] => {
    let boardAttempt = generateNewBoard();
    let attempts = 0;
    while (!hasValidMoves(boardAttempt) && attempts < 100) {
      boardAttempt = generateNewBoard();
      attempts++;
    }
    return boardAttempt;
  };

  // Find all horizontal and vertical matches
  const findMatches = (currentBoard: (Gem | null)[][]) => {
    const matchedCoords = new Set<string>();
    const matchedTypes = new Set<string>();

    // Horizontal check
    for (let r = 0; r < ROWS; r++) {
      let matchLength = 1;
      let matchType: string | null = null;
      let startCol = 0;
      for (let c = 0; c < COLS; c++) {
        const type = currentBoard[r][c]?.type || null;
        if (type && type === matchType) {
          matchLength++;
        } else {
          if (matchLength >= 3 && matchType) {
            for (let col = startCol; col < startCol + matchLength; col++) {
              matchedCoords.add(`${r},${col}`);
              matchedTypes.add(matchType);
            }
          }
          matchType = type;
          matchLength = 1;
          startCol = c;
        }
      }
      if (matchLength >= 3 && matchType) {
        for (let col = startCol; col < startCol + matchLength; col++) {
          matchedCoords.add(`${r},${col}`);
          matchedTypes.add(matchType);
        }
      }
    }

    // Vertical check
    for (let c = 0; c < COLS; c++) {
      let matchLength = 1;
      let matchType: string | null = null;
      let startRow = 0;
      for (let r = 0; r < ROWS; r++) {
        const type = currentBoard[r][c]?.type || null;
        if (type && type === matchType) {
          matchLength++;
        } else {
          if (matchLength >= 3 && matchType) {
            for (let row = startRow; row < startRow + matchLength; row++) {
              matchedCoords.add(`${row},${c}`);
              matchedTypes.add(matchType);
            }
          }
          matchType = type;
          matchLength = 1;
          startRow = r;
        }
      }
      if (matchLength >= 3 && matchType) {
        for (let row = startRow; row < startRow + matchLength; row++) {
          matchedCoords.add(`${row},${c}`);
          matchedTypes.add(matchType);
        }
      }
    }

    return {
      coords: Array.from(matchedCoords).map(s => {
        const [r, c] = s.split(',').map(Number);
        return { r, c };
      }),
      types: Array.from(matchedTypes)
    };
  };

  // Apply gravity: drop gems down and refill empty top spots
  const applyGravity = (currentBoard: (Gem | null)[][]): { newBoard: Gem[][]; fell: boolean } => {
    const nextBoard: (Gem | null)[][] = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
    let fell = false;
    let idCounter = 1000;

    for (let c = 0; c < COLS; c++) {
      const columnGems: Gem[] = [];
      for (let r = ROWS - 1; r >= 0; r--) {
        if (currentBoard[r][c] !== null) {
          columnGems.push(currentBoard[r][c]!);
        }
      }

      let newRow = ROWS - 1;
      for (const gem of columnGems) {
        nextBoard[newRow][c] = gem;
        newRow--;
      }

      while (newRow >= 0) {
        nextBoard[newRow][c] = {
          id: `gem-fall-${idCounter++}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: GEM_IDS[Math.floor(Math.random() * GEM_IDS.length)]
        };
        fell = true;
        newRow--;
      }
    }
    return { newBoard: nextBoard as Gem[][], fell };
  };

  // Main cascade runner
  const resolveCascade = async (currentBoard: Gem[][], currentCombo: number) => {
    const { coords: matches, types: matchedTypes } = findMatches(currentBoard);

    if (matches.length === 0) {
      // Cascade complete
      setBoard(currentBoard);
      setBusy(false);
      setCombo(1);
      return;
    }

    // 1. Highlight matched gems
    const matchedCoordsStr = matches.map(m => `${m.r},${m.c}`);
    setMatchedSet(matchedCoordsStr);

    // Update the AI facts banner with a random matched gem fact
    if (matchedTypes.length > 0) {
      const randomType = matchedTypes[Math.floor(Math.random() * matchedTypes.length)];
      setCurrentFact(GEM_TYPES[randomType].fact);
    }

    // 2. Play pop animation duration
    await new Promise(r => setTimeout(r, 250));

    // 3. Clear gems
    const clearedBoard = currentBoard.map((row, r) => 
      row.map((gem, c) => matchedCoordsStr.includes(`${r},${c}`) ? null : gem)
    );

    // Calculate score
    const pointsEarned = matches.length * 10 * currentCombo;
    setScore(prev => prev + pointsEarned);

    // 4. Gravity & refill
    const { newBoard } = applyGravity(clearedBoard);
    setBoard(newBoard);
    setMatchedSet([]);

    // 5. Let falling animation play
    await new Promise(r => setTimeout(r, 300));

    // 6. Recursively find next matches
    setCombo(currentCombo + 1);
    await resolveCascade(newBoard, currentCombo + 1);
  };

  // Handle cell click / swap action
  const handleCellClick = async (r: number, c: number) => {
    if (busy || gameOver || reshuffling) return;

    if (selectedCell === null) {
      setSelectedCell({ r, c });
      return;
    }

    const r1 = selectedCell.r;
    const c1 = selectedCell.c;
    const r2 = r;
    const c2 = c;

    const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;

    if (!isAdjacent) {
      // Select new cell instead if not adjacent
      setSelectedCell({ r, c });
      return;
    }

    // Swapping
    setSelectedCell(null);
    setBusy(true);

    const tempBoard = board.map(row => [...row]);
    const tempGem = tempBoard[r1][c1];
    tempBoard[r1][c1] = tempBoard[r2][c2];
    tempBoard[r2][c2] = tempGem;

    const { coords: matches } = findMatches(tempBoard);

    if (matches.length === 0) {
      // Invalid swap: Swap and instantly swap back
      setBoard(tempBoard);
      await new Promise(resolve => setTimeout(resolve, 200));
      // Revert swap
      const revertedBoard = board.map(row => [...row]);
      setBoard(revertedBoard);
      setBusy(false);
    } else {
      // Valid swap!
      setBoard(tempBoard);
      setMovesLeft(prev => Math.max(0, prev - 1));
      await resolveCascade(tempBoard, 1);
    }
  };

  // Evaluate board for win/loss and auto-reshuffle
  useEffect(() => {
    if (busy || board.length === 0) return;

    // Check Win
    if (score >= targetScore) {
      setWon(true);
      setGameOver(true);
      return;
    }

    // Check Lose
    if (movesLeft <= 0) {
      setWon(false);
      setGameOver(true);
      return;
    }

    // Check if valid moves remain
    if (!hasValidMoves(board)) {
      triggerReshuffle();
    }
  }, [busy, score, movesLeft, board]);

  // Reshuffle board animation trigger
  const triggerReshuffle = () => {
    setReshuffling(true);
    setBusy(true);
    setCurrentFact("No moves left! Reshuffling the AI nodes...");
    setTimeout(() => {
      const reshuffledBoard = generateValidBoard();
      setBoard(reshuffledBoard);
      setReshuffling(false);
      setBusy(false);
    }, 1200);
  };

  // Start / reset game helper
  const startNewGame = () => {
    const newBoard = generateValidBoard();
    setBoard(newBoard);
    setSelectedCell(null);
    setScore(0);
    setMovesLeft(20);
    setCombo(1);
    setMatchedSet([]);
    setCurrentFact("Match 3 identical gems to clear them and unlock AI insights!");
    setGameOver(false);
    setWon(false);
    setSubmitted(false);
    setNickname('');
  };

  // Go to next level on win
  const nextLevel = () => {
    setLevel(prev => prev + 1);
    const newBoard = generateValidBoard();
    setBoard(newBoard);
    setSelectedCell(null);
    // Keep total score, but reset moves
    setMovesLeft(20);
    setCombo(1);
    setMatchedSet([]);
    setCurrentFact(`Welcome to Level ${level + 1}! Reach ${TARGET_SCORE_BASE * (level + 1)} points.`);
    setGameOver(false);
    setWon(false);
    setSubmitted(false);
  };

  // Restart entire game (back to level 1)
  const resetToLevel1 = () => {
    setLevel(1);
    startNewGame();
  };

  // Supabase Database: Get Top 10 Highscores
  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('game_scores')
        .select('player_name, score, level')
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeaderboard(data || []);
      setDbError(false);
    } catch (err) {
      console.warn("Supabase fetch failed. Falling back to local storage.", err);
      setDbError(true);
      // Fallback: local storage
      const local = localStorage.getItem('game_scores');
      if (local) {
        setLeaderboard(JSON.parse(local).slice(0, 10));
      }
    }
  };

  // Supabase Database: Submit Score
  const handleScoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    const newScoreEntry = {
      player_name: nickname.trim(),
      score: score,
      level: level
    };

    try {
      const { error } = await supabase
        .from('game_scores')
        .insert([newScoreEntry]);

      if (error) throw error;
      setSubmitted(true);
      fetchLeaderboard();
    } catch (err) {
      console.warn("Supabase submit failed. Saving to local storage.", err);
      // Fallback: local storage
      const local = localStorage.getItem('game_scores');
      const scores = local ? JSON.parse(local) : [];
      scores.push(newScoreEntry);
      scores.sort((a: any, b: any) => b.score - a.score);
      localStorage.setItem('game_scores', JSON.stringify(scores));
      
      setSubmitted(true);
      setLeaderboard(scores.slice(0, 10));
    }
  };

  // Score target percentage calculation
  const progressPercentage = Math.min(100, Math.floor((score / targetScore) * 100));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 overflow-x-hidden select-none font-sans bg-radial-gradient">
      {/* Glow Effects Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-violet-600/20 p-2.5 rounded-xl border border-violet-500/30 shadow-lg shadow-violet-500/15 animate-bounce-gentle">
            <Sparkle className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              AI Cascade
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Match nodes, clear bias, and learn core AI concepts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800/80 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-inner">
            <span className="text-slate-400">Level</span>
            <span className="text-emerald-400 text-lg">{level}</span>
          </div>
          <button 
            onClick={resetToLevel1} 
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 transition shadow-md cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start z-10">
        
        {/* Game Stats & Play Board (Left Col - 7 cols wide) */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          {/* Stats Bar */}
          <div className="glass rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-4 shadow-xl">
            <div className="flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-50">{score}</span>
                <span className="text-xs text-slate-500 font-semibold">/ {targetScore}</span>
              </div>
            </div>
            
            <div className="flex flex-col justify-between border-x border-slate-800 px-4">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Moves Left</span>
              <span className={`text-2xl sm:text-3xl font-black mt-1 ${movesLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                {movesLeft}
              </span>
            </div>

            <div className="flex flex-col justify-between items-end">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase self-start">Combo</span>
              <div className="flex items-center gap-1.5 mt-1 self-start">
                <Flame className={`w-5 h-5 ${combo > 1 ? 'text-orange-400 animate-bounce' : 'text-slate-600'}`} />
                <span className={`text-xl sm:text-2xl font-black ${combo > 1 ? 'text-orange-400' : 'text-slate-400'}`}>
                  {combo}x
                </span>
              </div>
            </div>
          </div>

          {/* Goal Progress Bar */}
          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-inner">
            <div className="flex justify-between items-center text-xs font-bold mb-1 text-slate-400">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                Target Progress
              </span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-violet-500 to-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Match-3 Board */}
          <div className="relative aspect-[6/7] w-full bg-slate-900/50 border border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center justify-center overflow-hidden">
            {reshuffling && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3 animate-fade-in">
                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-bold text-violet-400 animate-pulse">Reshuffling Node Grid...</p>
              </div>
            )}

            <div className="grid grid-cols-6 grid-rows-7 gap-1.5 sm:gap-2.5 w-full h-full">
              {board.map((row, r) =>
                row.map((gem, c) => {
                  const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                  const isMatched = matchedSet.includes(`${r},${c}`);
                  const gemType = gem ? GEM_TYPES[gem.type] : null;
                  const GemIcon = gemType ? gemType.icon : null;

                  return (
                    <div
                      key={gem ? gem.id : `empty-${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`
                        relative flex items-center justify-center rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 border-2 select-none aspect-square
                        ${gemType ? gemType.bgClass : 'bg-slate-950 border-slate-900'}
                        ${isSelected ? 'scale-90 border-slate-100 ring-4 ring-slate-100/20 z-10 shadow-lg' : 'border-transparent'}
                        ${isMatched ? 'animate-pop' : ''}
                        ${!isMatched && !isSelected ? 'hover:scale-[1.03] active:scale-95' : ''}
                      `}
                      style={{
                        animation: isMatched ? 'pop 250ms ease-out forwards' : undefined
                      }}
                    >
                      {gemType && GemIcon && (
                        <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1 text-center w-full h-full p-1 animate-fall">
                          <GemIcon className={`w-6 h-6 sm:w-8 sm:h-8 ${gemType.colorClass} drop-shadow-md`} />
                          <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase opacity-85 hidden sm:block">
                            {gemType.label}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Fact Banner, Leaderboard & Glossary (Right Col - 5 cols wide) */}
        <section className="lg:col-span-5 flex flex-col gap-6 w-full">
          {/* Fact Banner */}
          <div className="relative glass border border-indigo-500/20 bg-indigo-950/20 rounded-2xl p-5 shadow-xl overflow-hidden flex flex-col justify-between min-h-[140px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Info className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Concept Stream</span>
            </div>
            <p className="text-slate-100 font-medium text-sm sm:text-base leading-relaxed leading-medium select-text">
              {currentFact}
            </p>
            <div className="mt-4 flex items-center justify-end text-[10px] text-slate-500 font-semibold italic">
              *Clear gems to cycle insight stream
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="glass rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md sm:text-lg font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Global Leaderboard
              </h2>
              {dbError && (
                <span className="text-[10px] text-amber-500 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3 h-3" />
                  Local Mode
                </span>
              )}
            </div>
            
            <div className="overflow-hidden border border-slate-800/80 rounded-xl bg-slate-900/40">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="px-4 py-2 text-center w-12">Rank</th>
                    <th className="px-4 py-2">Player</th>
                    <th className="px-4 py-2 text-center w-16">Lvl</th>
                    <th className="px-4 py-2 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                  {leaderboard.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                        No scores recorded yet. Be the first!
                      </td>
                    </tr>
                  ) : (
                    leaderboard.map((entry, idx) => (
                      <tr 
                        key={idx} 
                        className={`hover:bg-slate-800/30 transition-colors ${idx === 0 ? 'text-amber-300 bg-amber-500/5' : ''}`}
                      >
                        <td className="px-4 py-2.5 text-center font-bold text-slate-500">
                          {idx + 1 === 1 ? '🥇' : idx + 1 === 2 ? '🥈' : idx + 1 === 3 ? '🥉' : idx + 1}
                        </td>
                        <td className="px-4 py-2.5 truncate max-w-[120px] font-bold">{entry.player_name}</td>
                        <td className="px-4 py-2.5 text-center text-slate-400">{entry.level || 1}</td>
                        <td className="px-4 py-2.5 text-right font-extrabold">{entry.score}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Glossary Legend */}
          <div className="glass rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3.5">
              Node Glossary
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.values(GEM_TYPES).map(type => {
                const Icon = type.icon;
                return (
                  <div 
                    key={type.id} 
                    className="p-2.5 border border-slate-800/80 bg-slate-900/20 rounded-xl flex items-center gap-2.5"
                  >
                    <div className={`p-1.5 rounded-lg ${type.bgClass} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate text-slate-200">{type.label}</p>
                      <p className="text-[9px] text-slate-500 truncate">{type.fact.slice(0, 30)}...</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-[10px] text-slate-600 font-semibold tracking-wide">
        AI Cascade Match-3 Puzzle Game • Designed with Modern React & Tailwind
      </footer>

      {/* Game Over / Win Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass border-slate-700 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
            
            {/* Celebration Particle Effect */}
            <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-radial-gradient-modal opacity-20 pointer-events-none" />

            <div className={`p-4 rounded-full border mb-4 shadow-xl ${won ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 animate-bounce' : 'bg-red-500/20 border-red-400 text-red-400'}`}>
              {won ? <CheckCircle2 className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
            </div>

            <h2 className="text-3xl font-black tracking-tight mb-2">
              {won ? 'Level Complete!' : 'Game Over!'}
            </h2>
            
            <p className="text-slate-400 text-sm max-w-sm mb-6 font-medium">
              {won 
                ? `Incredible! You reached the goal of ${targetScore} points with ${movesLeft} moves left!` 
                : `You ran out of moves! You scored ${score} points this round.`}
            </p>

            {/* Score Showcase */}
            <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex justify-around gap-4 mb-6 shadow-inner">
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Score</span>
                <p className="text-2xl font-black text-slate-100">{score}</p>
              </div>
              <div className="w-px bg-slate-800" />
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Level Reached</span>
                <p className="text-2xl font-black text-slate-100">{level}</p>
              </div>
            </div>

            {/* Nickname Submission */}
            {!submitted ? (
              <form onSubmit={handleScoreSubmit} className="w-full flex flex-col gap-3">
                <div className="relative w-full">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    maxLength={15}
                    placeholder="Enter player nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!nickname.trim()}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed font-extrabold text-sm rounded-xl text-slate-50 shadow-lg shadow-violet-500/20 active:scale-[0.98] transition cursor-pointer"
                >
                  Submit Score to Leaderboard
                </button>
              </form>
            ) : (
              <div className="w-full py-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm mb-4">
                <CheckCircle2 className="w-4 h-4" />
                Score successfully submitted!
              </div>
            )}

            {/* Next Actions */}
            <div className="w-full flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-800/80">
              {won && (
                <button
                  onClick={nextLevel}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition cursor-pointer"
                >
                  Next Level
                </button>
              )}
              <button
                onClick={startNewGame}
                className="flex-1 py-3 bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-sm rounded-xl active:scale-[0.98] transition cursor-pointer"
              >
                Play Again
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
