import React, { useState } from 'react';
import { Card } from '../components/Card';

const examples = [
  {
    title: 'Smartphone Voice Assistants',
    description: 'Using AI to interpret speech and perform tasks like setting reminders, sending messages, and searching the web.',
    icon: '📱',
  },
  {
    title: 'Recommendation Systems',
    description: 'AI suggests movies, music, or products based on your previous behavior, e.g., Netflix or Amazon recommendations.',
    icon: '🎯',
  },
  {
    title: 'Spam Email Filtering',
    description: 'Machine learning models automatically detect and move unwanted emails to the spam folder.',
    icon: '🛡️',
  },
  {
    title: 'Navigation and Traffic Prediction',
    description: 'AI powers GPS apps to suggest optimal routes and predict traffic conditions in real time.',
    icon: '🗺️',
  },
];

const facts = [
  { icon: '🤖', text: 'Did you know? Your phone camera uses AI to enhance low‑light photos.' },
  { icon: '💡', text: 'AI powers smart home lights to adjust brightness based on your habits.' },
  { icon: '🛒', text: 'E‑commerce sites use AI to predict what you’ll buy next.' },
  { icon: '🏃‍♂️', text: 'Fitness apps analyse movement patterns with AI to suggest workouts.' },
];

const DailyLifePage: React.FC = () => {
  const [factIdx, setFactIdx] = useState(0);
  const nextFact = () => setFactIdx((i) => (i + 1) % facts.length);

  return (
    <Card className="p-6 space-y-6">
      <div className="p-2 space-y-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 border-b border-white/5 pb-4">
          AI in Daily Life
        </h2>

        {/* Fact of the Day */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-violet-600/5 border border-violet-500/10 shadow-lg backdrop-blur-md gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-3xl p-2.5 bg-violet-500/10 rounded-xl" role="img" aria-label="fact-icon">
              {facts[factIdx].icon}
            </span>
            <div>
              <span className="text-xs uppercase tracking-widest text-violet-400 font-bold">Fact of the Day</span>
              <p className="text-slate-100 text-sm mt-0.5 leading-relaxed">{facts[factIdx].text}</p>
            </div>
          </div>
          <button
            onClick={nextFact}
            className="button px-5 py-2.5 w-full sm:w-auto text-sm"
          >
            Next Fact
          </button>
        </div>

        {/* Examples Grid */}
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          {examples.map((ex, idx) => (
            <Card key={idx} className="flex items-start p-5 gap-4 glass">
              <span className="text-4xl p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex-shrink-0" role="img" aria-label="icon">
                {ex.icon}
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-emerald-300">{ex.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{ex.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DailyLifePage;
