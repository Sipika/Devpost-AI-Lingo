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
    <Card className="p-6 space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-center bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 text-transparent mb-6">
        AI in Daily Life
      </h2>

      {/* Fact of the Day */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{facts[factIdx].icon}</span>
          <p className="text-slate-100">{facts[factIdx].text}</p>
        </div>
        <button
          onClick={nextFact}
          className="px-3 py-1 bg-gradient-to-r from-violet-400 to-emerald-400 text-slate-900 rounded hover:opacity-90 transition"
        >
          Next
        </button>
      </div>

      {/* Examples Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {examples.map((ex, idx) => (
          <Card key={idx} className="flex items-start p-4 rounded-lg hover:bg-slate-700 transition-colors shadow-lg glass">
            <span className="text-3xl mr-3">{ex.icon}</span>
            <div>
              <h3 className="text-xl font-medium text-violet-300">{ex.title}</h3>
              <p className="text-slate-300 mt-1">{ex.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default DailyLifePage;
