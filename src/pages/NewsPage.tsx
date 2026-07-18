import React from 'react';
import { Card } from '../components/Card';

const NewsPage: React.FC = () => {
  const latestNews = [
    { title: 'The Verge AI', url: 'https://www.theverge.com/ai', icon: '📰' },
    { title: 'MIT Technology Review AI', url: 'https://www.technologyreview.com/ai', icon: '🔬' },
    { title: 'AI Weekly', url: 'https://aiweekly.co', icon: '📅' },
    { title: 'TechCrunch AI', url: 'https://techcrunch.com/tag/ai/', icon: '💡' },
    { title: 'Wired AI', url: 'https://www.wired.com/category/ai/', icon: '⚡' },
    { title: 'Ars Technica AI', url: 'https://arstechnica.com/tag/ai/', icon: '🧠' },
    { title: 'Bloomberg AI', url: 'https://www.bloomberg.com/technology/ai', icon: '💼' },
    { title: 'Forbes AI', url: 'https://www.forbes.com/ai/', icon: '🏢' },
    { title: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/', icon: '🚀' },
  ];
  return (
    <Card className="p-6 space-y-6">
      <div className="p-2 space-y-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 border-b border-white/5 pb-4">
          AI News
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card glass p-5 flex flex-col justify-between items-start gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-left"
              style={{ textDecoration: 'none' }}
            >
              <div className="space-y-3 w-full">
                <span className="text-4xl p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl inline-block" role="img" aria-label="icon">
                  {item.icon}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-indigo-300 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Read the latest publications, updates, and releases.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-violet-400 flex items-center gap-1">
                Read Article →
              </span>
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default NewsPage;
