import React from 'react';
import { Button } from '../components/Button';
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
    <Card className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 mb-6">
        AI News
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {latestNews.map((item, idx) => (
          <Button key={idx} href={item.url} className="card">
            <div className="flex items-center">
              <span role="img" aria-label="icon" className="mr-2 text-4xl">{item.icon}</span>
              <h3 className="text-xl font-medium text-violet-300">{item.title}</h3>
            </div>
            <p className="mt-2 text-slate-300">Read the latest AI news article.</p>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default NewsPage;
