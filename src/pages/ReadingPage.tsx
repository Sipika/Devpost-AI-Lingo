import React, { useState } from 'react';
import { Globe, Volume2, Bookmark, ArrowLeft } from 'lucide-react';
import { articles } from '../data/mockData';
import type { Article } from '../data/mockData';

export const ReadingPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'badge-beginner';
      case 'Curious':
        return 'badge-intermediate';
      case 'Deep Dive':
        return 'badge-advanced';
      default:
        return 'badge-beginner';
    }
  };

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto pb-24">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Articles
        </button>
        
        <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className={`badge ${getDifficultyBadge(selectedArticle.difficulty)}`}>
                {selectedArticle.difficulty}
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                {selectedArticle.readMinutes} min read
              </span>
            </div>
            
            <div className="text-6xl mb-6">{selectedArticle.emoji}</div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {selectedArticle.title}
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 border-l-4 border-primary/50 pl-4 py-1">
              {selectedArticle.summary}
            </p>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              {selectedArticle.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text mr-2">Reading:</span>
          <span className="text-white">Learn through Articles &amp; Stories</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Immerse yourself in authentic texts adapted for your level.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="glass card rounded-2xl p-6 card-hover flex flex-col h-full cursor-pointer relative group"
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-start mb-6">
              <span className={`badge ${getDifficultyBadge(article.difficulty)}`}>
                {article.difficulty}
              </span>
              <span className="text-2xl" title="Spanish">🇪🇸</span>
            </div>

            {/* CENTER */}
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {article.emoji}
              </div>
            </div>

            {/* Content area */}
            <div className="mt-auto">
              <h3 className="font-bold text-[15px] text-white mb-2 leading-tight">
                {article.title}
              </h3>
              <p className="text-[13px] text-gray-400 line-clamp-2 mb-6">
                {article.summary}
              </p>

              {/* BOTTOM ROW */}
              <div className="flex items-center justify-between text-gray-400 pt-4 border-t border-white/5">
                <div className="flex items-center text-xs">
                  <Globe className="w-3.5 h-3.5 mr-1.5" />
                  <span>{article.readMinutes} min</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Volume2 className="w-4 h-4 hover:text-white transition-colors" />
                  <Bookmark className="w-4 h-4 hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingPage;
