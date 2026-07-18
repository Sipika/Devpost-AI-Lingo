import React from 'react';

const podcasts = [
  {
    title: 'Artificial Intelligence – Lex Fridman Podcast',
    description: 'In‑depth conversations with AI researchers and technologists.',
    url: 'https://lexfridman.com/ai/',
    icon: '🎙️',
    sampleUrl: '/podcasts/SoundHelix-Song-1.mp3',
  },
  {
    title: 'The AI Alignment Podcast',
    description: 'Explores safety and alignment challenges for advanced AI.',
    url: 'https://futureoflife.org/ai-alignment-podcast/',
    icon: '🎙️',
    sampleUrl: '/podcasts/lex_fridman_498.mp3',
  },
  {
    title: 'Eye On AI',
    description: 'Weekly AI news and interviews.',
    url: 'https://eye-on.ai/',
    icon: '🎙️',
    sampleUrl: '/podcasts/SoundHelix-Song-1.mp3',
  },
];

import { Card } from '../components/Card';

const PodcastsPage: React.FC = () => {
  const handleButtonClick = (podcast: typeof podcasts[0]) => {
    console.log('Play button clicked for', podcast.title);
    alert(`Opening podcast: ${podcast.title}`);
    window.open(podcast.url, '_blank');
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 mb-4">
          AI Podcasts
        </h2>
        <ul className="space-y-4">
          {podcasts.map((p, idx) => (
            <Card key={idx} className="flex items-start p-4 rounded-lg hover:bg-slate-700 transition-colors shadow-lg glass">
              <div className="flex items-center">
                <span className="mr-2 text-3xl" role="img" aria-label="icon">{p.icon}</span>
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium text-violet-300">{p.title}</h3>
                  <p className="text-slate-300 mt-1">{p.description}</p>
                </div>
              </div>
              <button type="button" onClick={() => handleButtonClick(p)} className="mt-2 px-3 py-1 bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 text-slate-900 rounded hover:opacity-90">
                ▶ Play AI Voice
              </button>
            </Card>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default PodcastsPage;


