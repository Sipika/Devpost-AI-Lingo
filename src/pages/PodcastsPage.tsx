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
      <div className="p-2 space-y-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 border-b border-white/5 pb-4">
          AI Podcasts
        </h2>
        <ul className="space-y-4">
          {podcasts.map((p, idx) => (
            <Card key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-4 glass">
              <div className="flex items-start gap-4">
                <span className="text-4xl p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex-shrink-0" role="img" aria-label="icon">
                  {p.icon}
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-violet-200">{p.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleButtonClick(p)}
                className="button px-5 py-2.5 flex-shrink-0 w-full sm:w-auto"
              >
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


