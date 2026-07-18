import React, { useState, useEffect } from 'react';
import Tile from './Tile';

import { concepts } from '../../data/concepts';
// Removed problematic type import; type inferred from concepts array

const BOARD_SIZE = 5; // 5x5 grid

type Board = (number | null)[]; // store concept index, null indicates empty slot

// Get a random concept index
const getRandomConceptId = (): number => Math.floor(Math.random() * concepts.length);

// Initialize board with random concepts
const createBoard = (): Board => {
  const board: Board = [];
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    board.push(getRandomConceptId());
  }
  // Ensure the initial board has no pre‑existing matches
  const sanitized = ensureNoInitialMatches(board);
  return sanitized;
};

const isAdjacent = (idx1: number, idx2: number) => {
  const r1 = Math.floor(idx1 / BOARD_SIZE);
  const c1 = idx1 % BOARD_SIZE;
  const r2 = Math.floor(idx2 / BOARD_SIZE);
  const c2 = idx2 % BOARD_SIZE;
  return (r1 === r2 && Math.abs(c1 - c2) === 1) || (c1 === c2 && Math.abs(r1 - r2) === 1);
};

// Find all contiguous matches of three or more identical concepts
const findMatches = (board: Board): Set<number> => {
  const matches = new Set<number>();
  // Horizontal matches
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE - 2; c++) {
      const idx = r * BOARD_SIZE + c;
      const id = board[idx];
      if (id !== null && id === board[idx + 1] && id === board[idx + 2]) {
        matches.add(idx);
        matches.add(idx + 1);
        matches.add(idx + 2);
        let k = c + 3;
        while (k < BOARD_SIZE && board[r * BOARD_SIZE + k] === id) {
          matches.add(r * BOARD_SIZE + k);
          k++;
        }
      }
    }
  }
  // Vertical matches
  for (let c = 0; c < BOARD_SIZE; c++) {
    for (let r = 0; r < BOARD_SIZE - 2; r++) {
      const idx = r * BOARD_SIZE + c;
      const id = board[idx];
      if (id !== null && id === board[idx + BOARD_SIZE] && id === board[idx + 2 * BOARD_SIZE]) {
        matches.add(idx);
        matches.add(idx + BOARD_SIZE);
        matches.add(idx + 2 * BOARD_SIZE);
        let k = r + 3;
        while (k < BOARD_SIZE && board[k * BOARD_SIZE + c] === id) {
          matches.add(k * BOARD_SIZE + c);
          k++;
        }
      }
    }
  }
  return matches;
};

// Remove any initial matches by re‑assigning random concepts until none remain
const ensureNoInitialMatches = (board: Board): Board => {
  let newBoard = [...board];
  // Loop until there are no matches
  while (true) {
    const matches = findMatches(newBoard);
    if (matches.size === 0) break;
    matches.forEach((idx) => {
      newBoard[idx] = getRandomConceptId();
    });
  }
  return newBoard;
};

// Collapse board after removals, dropping tiles down and filling empty slots
const collapseBoard = (board: Board): Board => {
  const newBoard = [...board];
  for (let c = 0; c < BOARD_SIZE; c++) {
    const columnVals: number[] = [];
    for (let r = BOARD_SIZE - 1; r >= 0; r--) {
      const val = newBoard[r * BOARD_SIZE + c];
      if (val !== null) columnVals.push(val);
    }
    for (let r = BOARD_SIZE - 1, i = 0; r >= 0; r--, i++) {
      newBoard[r * BOARD_SIZE + c] = columnVals[i] ?? getRandomConceptId();
    }
  }
  return newBoard;
};

const Match3Board: React.FC = () => {
  const [board, setBoard] = useState<Board>(createBoard);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [centralTip, setCentralTip] = useState<string | null>(null);
  const [shownTips, setShownTips] = useState<Set<number>>(new Set());

  const handleTileClick = (idx: number) => {
    if (animating) return;
    if (selected === null) {
      setSelected(idx);
      return;
    }
    if (selected === idx) {
      setSelected(null);
      return;
    }
    if (!isAdjacent(selected, idx)) {
      setSelected(idx);
      return;
    }
    const newBoard = [...board];
    [newBoard[selected], newBoard[idx]] = [newBoard[idx], newBoard[selected]];
    setBoard(newBoard);
    setSelected(null);
    setAnimating(true);
  };

  // Auto‑clear central tip after 5 seconds for readability
  useEffect(() => {
    if (centralTip) {
      const timer = setTimeout(() => setCentralTip(null), 20000);
      return () => clearTimeout(timer);
    }
  }, [centralTip]);

  // Process matches after a swap
  useEffect(() => {
    if (!animating) return;
    const timeout = setTimeout(() => {
      const matches = findMatches(board);
        if (matches.size === 0) {
          setAnimating(false);
          return;
        }

        // Set a single central AI tip for the first matched concept
        let chosenTip: string | undefined;
        if (matches.size > 0) {
          const firstIdx = matches.values().next().value as number;
          const conceptId = board[firstIdx] as number;
          chosenTip = concepts[conceptId]?.tip;
        }
        if (chosenTip) setCentralTip(chosenTip);

        // Show a learning toast for a concept not yet shown, if possible
        const matchedConceptIds = Array.from(matches).map((i) => board[i] as number);
        const unseenConceptIds = matchedConceptIds.filter((id) => !shownTips.has(id));
        let chosenConceptId: number | undefined;
        if (unseenConceptIds.length > 0) {
          chosenConceptId = unseenConceptIds[0];
        } else {
          setShownTips(new Set());
          chosenConceptId = matchedConceptIds[0];
        }
        if (chosenConceptId !== undefined) {
          // Update shown tips without showing a toast to avoid duplicate AI info
          setShownTips((prev) => new Set(prev).add(chosenConceptId!));
        }

        const newBoard = board.map((c, i) => (matches.has(i) ? null : c));
        setScore((s) => s + matches.size * 10);
        // Collapse after short delay for visual effect
          setTimeout(() => {
            const collapsed = collapseBoard(newBoard);
            const sanitized = ensureNoInitialMatches(collapsed);
            setBoard(sanitized);
            // Do not clear centralTip here; timer will auto‑clear after 20 s
            setTimeout(() => setAnimating(true), 200);
          }, 200);
    }, 300);
    return () => clearTimeout(timeout);
  }, [animating, board]);

  const restart = () => {
    setBoard(createBoard);
    setScore(0);
    setSelected(null);
    setAnimating(false);

  };

  return (
    <div className="flex flex-col items-center space-y-4">
                {/* Toast removed to avoid duplicate AI info */}
      <div className="text-xl font-medium mb-2 text-slate-100">Score: {score}</div>
      <div className="grid grid-cols-5 gap-2">
        {board.map((conceptId, i) => {
          const concept = concepts[conceptId as number];
          return (
            <div key={i} className="relative">
              <Tile
                concept={concept?.name ?? ''}
                icon={concept?.icon ?? ''}
                onClick={() => handleTileClick(i)}
              />
              {/* overlay removed, central tip displayed instead */}
            </div>
          );
        })}
      </div>
      <button
        className="button mt-4"
        onClick={restart}
      >
        Restart
      </button>
      {/* Central AI tip */}
      {centralTip && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-950/85 border border-white/15 backdrop-blur-lg text-slate-100 px-6 py-3.5 rounded-2xl shadow-2xl z-50 text-sm max-w-md text-center flex items-center gap-3">
          <span className="text-xl">💡</span>
          <span className="leading-relaxed font-medium">{centralTip}</span>
        </div>
      )}
    </div>
  );
};

export default Match3Board;
