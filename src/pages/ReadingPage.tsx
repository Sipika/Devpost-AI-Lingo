import React, { useState } from 'react';
import { Card } from '../components/Card';
import { articles } from '../data/mockData';
import type { Article } from '../data/mockData';
import { ArrowLeft, Clock } from 'lucide-react';

const ReadingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ['All', 'The Basics', 'Under the Hood', 'Frontier', 'Staying Safe', 'Practical'];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  if (selectedArticle) {
    return (
      <Card className="p-6 max-w-3xl mx-auto space-y-6 glass border-white/10 relative overflow-hidden">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 hover:bg-slate-800 transition text-sm font-semibold text-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </button>

        <article className="space-y-6 animate-fall">
          <div className="flex items-center gap-4">
            <span className="text-5xl p-2 bg-white/5 border border-white/5 rounded-2xl select-none">
              {selectedArticle.emoji}
            </span>
            <div>
              <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border border-white/5 bg-violet-500/10 text-violet-300`}>
                {selectedArticle.difficulty}
              </span>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {selectedArticle.category} · {selectedArticle.readMinutes} min read
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="p-4 rounded-xl border border-white/10 bg-slate-900/60 text-indigo-200 font-medium text-sm leading-relaxed">
            {selectedArticle.summary}
          </p>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-normal">
            {selectedArticle.body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6 glass border-white/10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200">
            Learn at your own pace
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            Short, friendly articles — no jargon, no homework. Pick one and enjoy.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((a) => {
          return (
            <button
              key={a.id}
              onClick={() => setSelectedArticle(a)}
              className="group text-left p-5 border border-white/5 bg-slate-900/30 hover:bg-slate-900/60 rounded-2xl flex flex-col gap-3 shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none"
            >
              <div className="w-full flex items-start justify-between">
                <span className="text-3xl p-1 bg-white/5 border border-white/5 rounded-xl">{a.emoji}</span>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 border border-white/5 text-slate-400">
                  {a.difficulty}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200 group-hover:text-violet-300 transition-colors leading-tight">
                  {a.title}
                </h3>
                <p className="text-slate-400 text-xs font-normal mt-1 line-clamp-2 leading-relaxed">
                  {a.summary}
                </p>
              </div>
              <div className="w-full flex items-center justify-between mt-auto pt-2 border-t border-white/5 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {a.readMinutes} min read
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-white/5 text-slate-400 uppercase tracking-widest text-[8px]">
                  {a.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default ReadingPage;
