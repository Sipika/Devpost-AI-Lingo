import React, { useRef } from 'react';

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

const PodcastsPage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Function to play podcast audio using fetch and Blob
  const handlePlay = async (url: string) => {
    if (!audioRef.current) {
      console.error('Audio ref not available');
      return;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Failed to fetch audio', response.status);
        return;
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      audioRef.current.src = objectUrl;
      audioRef.current.play().catch(e => console.error('Audio play error:', e));
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  };

  // New helper: give user feedback and open the external podcast page
  const handleButtonClick = (podcast: typeof podcasts[0]) => {
    console.log('Play button clicked for', podcast.title);
    // Simple user feedback – can be replaced with a toast later
    alert(`Opening podcast: ${podcast.title}`);
    // Open the podcast URL in a new tab/window
    window.open(podcast.url, '_blank');
  };

  return (
    <>
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 mb-4">
        AI Podcasts
      </h2>
        <ul className="space-y-4">
              {podcasts.map((p, idx) => (
                <li key={idx} className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors shadow-lg">
                  <div className="text-xl font-medium text-violet-300 flex items-center">
                    <span className="mr-2" role="img" aria-label="mic">{p.icon}</span>
                    {p.title}
                  </div>
                  <p className="text-slate-300 mt-1">{p.description}</p>
                  <button
                    type="button"
                    onClick={() => handleButtonClick(p)}
                    className="mt-2 px-3 py-1 bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 text-slate-900 rounded hover:opacity-90"
                  >
                    ▶ Play AI Voice
                  </button>
                  <audio ref={audioRef} style={{ display: 'none' }} />
                </li>
              ))}
        </ul>
    </div>
    </>
  );
};

export default PodcastsPage;
