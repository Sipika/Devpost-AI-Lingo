import React, { useState, useEffect } from 'react';
import { moments } from '../data/mockData';
import type { Moment } from '../data/mockData';
import { Check, Eye, X, Sparkle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DailyLifePage: React.FC = () => {
  const [currentFactIdx, setCurrentFactIdx] = useState<number>(0);
  const [exploredIds, setExploredIds] = useState<string[]>([]);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Load explored analogies on mount
  useEffect(() => {
    fetchExploredAnalogies();
  }, []);

  const fetchExploredAnalogies = async () => {
    try {
      const { data, error } = await supabase
        .from('life_explored')
        .select('analogy_id');
      
      if (error) throw error;
      setExploredIds((data || []).map((row: any) => row.analogy_id));
    } catch (err) {
      console.warn("Supabase fetch failed. Falling back to local storage.", err);
      const local = localStorage.getItem('life_explored');
      if (local) {
        setExploredIds(JSON.parse(local));
      }
    }
  };

  const handleMarkExplored = async (id: string) => {
    if (exploredIds.includes(id)) return;
    setSubmitting(true);

    const updated = [...exploredIds, id];
    setExploredIds(updated);

    try {
      const { error } = await supabase
        .from('life_explored')
        .insert([{ analogy_id: id }]);

      if (error) throw error;
    } catch (err) {
      console.warn("Supabase insert failed. Saving to local storage.", err);
      localStorage.setItem('life_explored', JSON.stringify(updated));
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextFact = () => {
    setCurrentFactIdx((prev) => (prev + 1) % moments.length);
  };

  const currentFactMoment = moments[currentFactIdx];
  const exploredPercentage = Math.round((exploredIds.length / moments.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Fact of the Day Banner */}
      <div className="relative border border-white/10 bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[120px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkle className="w-4 h-4 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-wider">AI Analogy of the Day</span>
          </div>
          <p className="text-slate-100 font-bold text-sm sm:text-base leading-relaxed leading-medium select-text">
            {currentFactMoment.tagline}
          </p>
          <p className="text-xs text-slate-400 font-medium">
            — inspired by <span className="text-slate-300 font-semibold">{currentFactMoment.activity}</span>
          </p>
        </div>
        <button
          onClick={handleNextFact}
          className="button px-5 py-2.5 flex-shrink-0 w-full sm:w-auto text-center text-xs font-black uppercase tracking-wider"
        >
          Next Analogy
        </button>
      </div>

      {/* Progress tracker info card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-white/5 bg-slate-900/20 rounded-2xl">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-200">Daily Life Explored Progress</h4>
          <p className="text-xs text-slate-400 font-semibold">Tapped moment cards to learn about AI technology and mark them as explored.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-right">
            <span className="text-sm font-bold text-slate-200">{exploredIds.length} / {moments.length}</span>
            <span className="text-xs text-slate-500 font-semibold block">Explored</span>
          </div>
          <div className="flex-1 sm:w-32 bg-slate-950/80 rounded-full h-3 border border-white/5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              style={{ width: `${exploredPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Moments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {moments.map((m) => {
          const isExplored = exploredIds.includes(m.id);
          const MomentIcon = m.icon;

          return (
            <button
              key={m.id}
              onClick={() => setSelectedMoment(m)}
              className={`group text-left p-5 border border-white/5 bg-slate-900/30 hover:bg-slate-900/60 rounded-2xl flex flex-col gap-3 shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none relative overflow-hidden ${
                isExplored ? 'ring-1 ring-emerald-500/30 bg-emerald-950/5' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-4xl p-2 rounded-xl bg-gradient-to-tr ${m.accent} text-white shadow-lg`}>
                  <MomentIcon className="w-5 h-5" />
                </span>
                {isExplored ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-800/80 border border-white/5 text-slate-500 flex items-center justify-center text-[10px]">
                    <Eye className="w-3.5 h-3.5 opacity-40" />
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-300 transition-colors leading-tight">
                  {m.activity}
                </h3>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider text-[9px]">
                  {m.aiTech}
                </p>
              </div>

              <p className="text-slate-400 text-xs font-normal mt-1 line-clamp-2 leading-relaxed">
                {m.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Moment Detail Modal */}
      {selectedMoment && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="border border-white/10 bg-slate-900/80 backdrop-blur-lg max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
            
            <button
              onClick={() => setSelectedMoment(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 border border-white/5 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <span className={`text-5xl p-3 rounded-2xl bg-gradient-to-tr ${selectedMoment.accent} text-white shadow-lg`}>
                {selectedMoment.emoji}
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-200">{selectedMoment.activity}</h3>
                <span className="px-2.5 py-0.5 text-[9px] font-bold rounded-full bg-slate-950 border border-white/5 text-slate-400">
                  {selectedMoment.aiTech}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-slate-950/60 space-y-1">
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">Metaphor</span>
              <p className="text-slate-100 font-bold text-sm leading-relaxed">{selectedMoment.tagline}</p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">How it works</span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{selectedMoment.story}</p>
              </div>
              <div className="pt-3 border-t border-white/5">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Takeaway</span>
                <p className="text-xs text-emerald-300 leading-relaxed font-semibold">{selectedMoment.takeaway}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => {
                  handleMarkExplored(selectedMoment.id);
                  setSelectedMoment(null);
                }}
                disabled={exploredIds.includes(selectedMoment.id) || submitting}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 font-black text-sm rounded-xl active:scale-98 transition shadow-lg shadow-emerald-500/10 cursor-pointer disabled:cursor-not-allowed"
              >
                {exploredIds.includes(selectedMoment.id) ? 'Explored ✓' : 'Mark as explored'}
              </button>
              <button
                onClick={() => setSelectedMoment(null)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-white/5 text-slate-200 font-bold text-sm rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DailyLifePage;
