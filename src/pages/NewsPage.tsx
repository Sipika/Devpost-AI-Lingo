import React from 'react';

const NewsPage: React.FC = () => {
  const latestNews = [
    { title: 'The Verge AI', url: 'https://www.theverge.com/ai' },
    { title: 'MIT Technology Review AI', url: 'https://www.technologyreview.com/ai' },
    { title: 'AI Weekly', url: 'https://aiweekly.co' },
    { title: 'TechCrunch AI', url: 'https://techcrunch.com/tag/ai/' },
    { title: 'Wired AI', url: 'https://www.wired.com/category/ai/' },
    { title: 'Ars Technica AI', url: 'https://arstechnica.com/tag/ai/' },
    { title: 'Bloomberg AI', url: 'https://www.bloomberg.com/technology/ai' },
    { title: 'Forbes AI', url: 'https://www.forbes.com/ai/' },
    { title: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/' }
  ]; // added multiple news sources
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 mb-6">
        AI News
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {latestNews.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block glass p-4 rounded-lg hover:scale-105 transform transition"
          >
            <h3 className="text-xl font-medium text-violet-300">{item.title}</h3>
            <p className="mt-2 text-slate-300">Read the latest AI news article.</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
