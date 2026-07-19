import { useState, useEffect } from 'react';
import { Play, MoreHorizontal, Clock, Square, Volume2 } from 'lucide-react';
import { podcasts } from '../data/mockData';
import type { Podcast } from '../data/mockData';

export default function PodcastsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentLine, setCurrentLine] = useState<string>('');

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = (podcast: Podcast) => {
    window.speechSynthesis.cancel();
    
    if (playingId === podcast.id) {
      setPlayingId(null);
      return;
    }

    setPlayingId(podcast.id);
    
    if (!podcast.script || podcast.script.length === 0) {
      return;
    }

    let i = 0;
    const playNext = () => {
      if (i >= podcast.script.length) {
        setPlayingId(null);
        setCurrentLine('');
        return;
      }
      const line = podcast.script[i] as any;
      // Handle both string lines and object lines { text: string }
      const textToSpeak = typeof line === 'string' ? line : (line?.text || line?.content || '');
      
      setCurrentLine(textToSpeak);
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      utterance.onend = () => {
        i++;
        playNext();
      };
      utterance.onerror = () => {
        setPlayingId(null);
        setCurrentLine('');
      };
      
      window.speechSynthesis.speak(utterance);
    };
    
    playNext();
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlayingId(null);
    setCurrentLine('');
  };

  const playingPodcast = playingId ? podcasts.find(p => p.id === playingId) : null;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-emerald-400">
        Explore AI-Lingo Podcasts
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="glass rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center relative transition-all hover:bg-white/5">
              {/* TOP-RIGHT Menu */}
              <button className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>

              {/* LEFT: Icon Circle */}
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-inner">
                {podcast.emoji}
              </div>

              {/* CENTER: Info */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-base font-bold text-slate-100">{podcast.title}</h3>
                <p className="text-[13px] text-slate-400 font-medium mb-1">{podcast.host}</p>
                <p className="text-[13px] text-slate-400 line-clamp-2 mb-3">{podcast.blurb}</p>
                
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Clock size={14} />
                  <span>{podcast.durationMinutes} min</span>
                  <span className="text-slate-600">|</span>
                  <span>Listen Count (1.2k)</span>
                </div>
              </div>

              {/* RIGHT: Play Button */}
              <button 
                onClick={() => handlePlay(podcast)}
                className="mt-4 md:mt-0 shrink-0 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                {playingId === podcast.id ? (
                  <>
                    <Square size={16} fill="currentColor" />
                    <span>STOP</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>PLAY</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex w-80 flex-col gap-8">
          {/* Suggested Podcasts */}
          <div>
            <h2 className="text-lg font-bold text-slate-200 mb-4 px-2">Suggested Podcasts</h2>
            <div className="flex flex-col gap-3">
              {podcasts.slice(0, 3).map(podcast => (
                <div 
                  key={`suggested-${podcast.id}`} 
                  onClick={() => handlePlay(podcast)}
                  className="glass rounded-xl p-3 flex gap-3 items-center cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                    {podcast.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-200 truncate">{podcast.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{podcast.host}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Listening */}
          <div>
            <h2 className="text-lg font-bold text-slate-200 mb-4 px-2">Continue Listening</h2>
            <div className="flex flex-col gap-3">
              {podcasts.slice(1, 3).map(podcast => (
                <div 
                  key={`continue-${podcast.id}`} 
                  onClick={() => handlePlay(podcast)}
                  className="glass rounded-xl p-3 flex gap-3 items-center cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xl relative overflow-hidden">
                    {podcast.emoji}
                    <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 w-2/3"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-200 truncate">{podcast.title}</h4>
                    <p className="text-xs text-slate-500 truncate">12 min left</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 hover:bg-slate-700">
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Player */}
      {playingPodcast && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-in slide-in-from-bottom">
          <div className="max-w-4xl mx-auto glass rounded-2xl p-4 flex items-center gap-4 border border-cyan-500/30 shadow-2xl shadow-cyan-900/20 bg-slate-900/90 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700">
              {playingPodcast.emoji}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-200 truncate">{playingPodcast.title}</h4>
              <p className="text-sm text-cyan-400 truncate italic mt-0.5 flex items-center gap-2">
                <Volume2 size={14} className="animate-pulse" />
                {currentLine}
              </p>
            </div>

            <button 
              onClick={handleStop}
              className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
            >
              <Square size={16} fill="currentColor" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
