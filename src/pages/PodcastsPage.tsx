import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '../components/Card';
import { podcasts } from '../data/mockData';
import type { Podcast } from '../data/mockData';
import { Play, Pause, Square, SkipForward, SkipBack, Calendar, Volume2 } from 'lucide-react';

const PodcastsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [playingPodcastId, setPlayingPodcastId] = useState<string | null>(null);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState<number>(0);
  const [playbackStatus, setPlaybackStatus] = useState<'idle' | 'playing' | 'paused'>('idle');

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const activePodcast = podcasts.find(p => p.id === playingPodcastId) || null;

  const categories = ['All', 'Start Here', 'Going Deeper', 'For the Brave'];

  const filteredPodcasts = activeCategory === 'All'
    ? podcasts
    : podcasts.filter(p => p.level === activeCategory);

  const speakSegment = useCallback((podcast: Podcast, idx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (idx < 0 || idx >= podcast.script.length) {
      setPlaybackStatus('idle');
      setPlayingPodcastId(null);
      setCurrentSegmentIdx(0);
      return;
    }

    setCurrentSegmentIdx(idx);
    setPlaybackStatus('playing');

    const text = podcast.script[idx];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Use a natural sounding default voice if possible
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en')) || null;
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => {
      // Trigger the next segment only if we are still playing this podcast and segment
      if (playbackStatus === 'playing') {
        speakSegment(podcast, idx + 1);
      }
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setPlaybackStatus('idle');
      setPlayingPodcastId(null);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [playbackStatus]);

  const handlePlay = (podcast: Podcast) => {
    if (playingPodcastId === podcast.id) {
      if (playbackStatus === 'paused') {
        setPlaybackStatus('playing');
        if (speechUtteranceRef.current) {
          window.speechSynthesis.speak(speechUtteranceRef.current);
        } else {
          speakSegment(podcast, currentSegmentIdx);
        }
      } else {
        // Play from start or continue
        speakSegment(podcast, currentSegmentIdx);
      }
    } else {
      setPlayingPodcastId(podcast.id);
      setCurrentSegmentIdx(0);
      speakSegment(podcast, 0);
    }
  };

  const handlePause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlaybackStatus('paused');
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlaybackStatus('idle');
      setPlayingPodcastId(null);
      setCurrentSegmentIdx(0);
    }
  };

  const handleNext = () => {
    if (activePodcast && currentSegmentIdx < activePodcast.script.length - 1) {
      speakSegment(activePodcast, currentSegmentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activePodcast && currentSegmentIdx > 0) {
      speakSegment(activePodcast, currentSegmentIdx - 1);
    }
  };

  // Clean up Speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card className="p-6 space-y-6 glass border-white/10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200">
            Real audio narration
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            Press play and listen. No downloads, no files. Powered by Web Speech.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setActiveCategory(c);
              handleStop();
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition whitespace-nowrap cursor-pointer ${
              activeCategory === c
                ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white border-transparent shadow-lg shadow-violet-500/20'
                : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Podcasts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPodcasts.map((p) => {
          const isCurrent = playingPodcastId === p.id;
          const isPlaying = isCurrent && playbackStatus === 'playing';

          return (
            <div
              key={p.id}
              className={`p-5 border border-white/5 bg-slate-900/30 rounded-2xl flex flex-col gap-4 shadow-xl transition-all duration-300 ${
                isCurrent ? 'ring-2 ring-violet-500/50 bg-slate-900/60' : ''
              }`}
            >
              <div className={`flex items-center gap-4 bg-gradient-to-r ${p.accent} p-4 rounded-xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 -z-10" />
                <span className="text-4xl w-14 h-14 bg-white/20 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm select-none">
                  {p.emoji}
                </span>
                <div className="min-w-0 flex-1 text-white">
                  <h3 className="text-base font-black truncate leading-tight drop-shadow-sm">{p.title}</h3>
                  <p className="text-xs text-white/80 font-medium truncate mt-0.5">with {p.host}</p>
                </div>
                <button
                  onClick={() => isPlaying ? handlePause() : handlePlay(p)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full bg-slate-800 border border-white/5 text-slate-300`}>
                    {p.level}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {p.durationMinutes} min · {p.script.length} segments
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed font-normal">{p.blurb}</p>

                <div className="flex flex-wrap gap-1">
                  {p.topics.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-950/60 border border-white/5 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Player Segment View */}
              {isCurrent && playbackStatus !== 'idle' && (
                <div className="mt-2 p-3 bg-slate-950/50 border border-white/5 rounded-xl space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-violet-400">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      {isPlaying ? 'Now Narrating' : 'Paused'}
                    </span>
                    <span>Segment {currentSegmentIdx + 1} / {p.script.length}</span>
                  </div>

                  <p className="text-xs italic text-slate-200 leading-relaxed font-medium bg-slate-950/50 p-2.5 rounded-lg border border-white/5">
                    "{p.script[currentSegmentIdx]}"
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      disabled={currentSegmentIdx === 0}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-slate-200 disabled:opacity-40"
                    >
                      <SkipBack className="w-4 h-4 fill-slate-400" />
                    </button>
                    <button
                      onClick={() => isPlaying ? handlePause() : handlePlay(p)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md hover:scale-105 active:scale-95 transition"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentSegmentIdx === p.script.length - 1}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-white/5 text-slate-400 hover:text-slate-200 disabled:opacity-40"
                    >
                      <SkipForward className="w-4 h-4 fill-slate-400" />
                    </button>
                    <button
                      onClick={handleStop}
                      className="w-9 h-9 ml-auto flex items-center justify-center rounded-full bg-red-950/30 border border-red-900/50 text-red-400 hover:text-red-300"
                    >
                      <Square className="w-4 h-4 fill-red-400" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-300"
                      style={{ width: `${((currentSegmentIdx + 1) / p.script.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PodcastsPage;
