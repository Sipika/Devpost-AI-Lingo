import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Coffee, ShoppingCart, Bus, Utensils, MapPin, Users, X, Sparkles } from 'lucide-react';

const scenarios = [
  {
    id: 'cafe',
    title: 'AT THE CAFÉ',
    emoji: '☕',
    icon: Coffee,
    bgColor: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    description: 'Ordering coffee, pastries, & small talk',
    aiExplanation: 'How AI Powers Cafés: Recommender engines predict what pastries you will like based on your coffee history, and predictive inventory models forecast milk supply demands.',
    details: {
      vocabulary: ['Latte', 'Espresso', 'Pastry', 'To go', 'For here'],
      phrases: ['Can I get a large latte?', 'Is this for here or to go?', 'Keep the change.'],
      dialog: 'A: Hi, what can I get for you?\nB: I\'ll have a medium cappuccino to go, please.',
      techStack: 'Collaborative Filtering & Time-Series forecasting (ARIMA / LSTM models)',
      deepDive: 'Point-of-Sale (POS) systems leverage Collaborative Filtering algorithms to cross-reference your purchase history with thousands of other customers. If 85% of people ordering flat whites also buy almond croissants between 8:00 AM and 9:00 AM, the app automatically surfaces localized cross-sell recommendations. Concurrently, Recurrent Neural Networks (LSTM) process local weather data, traffic data, and day-of-week trends to optimize supply chains and predict raw dairy/bean depletion rates.'
    }
  },
  {
    id: 'shopping',
    title: 'SHOPPING',
    emoji: '🛒',
    icon: ShoppingCart,
    bgColor: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    description: 'Navigating stores, asking for help, checkout',
    aiExplanation: 'How AI Powers Retail: Dynamic pricing algorithms adjust prices instantly based on competitors, and computer vision cameras track shelf inventory in real-time.',
    details: {
      vocabulary: ['Aisle', 'Cashier', 'Receipt', 'Discount', 'Fitting room'],
      phrases: ['Where can I find the dairy section?', 'Do you have this in a medium?', 'I would like to return this.'],
      dialog: 'A: Did you find everything okay?\nB: Yes, thanks. Just these two items.',
      techStack: 'Convolutional Neural Networks (CNN) & Reinforcement Learning (Q-learning)',
      deepDive: 'Smart retail outlets employ YOLO (You Only Look Once) or Mask R-CNN vision pipelines overhead. These architectures identify objects passing into shopping baskets in milliseconds, executing object detection and instance segmentation. Simultaneously, reinforcement learning-driven dynamic pricing models adjust price labels dynamically on digital screens, optimizing profit margins based on competitor price scrapers, weather patterns, and real-time inventory velocity.'
    }
  },
  {
    id: 'transport',
    title: 'PUBLIC TRANSPORT',
    emoji: '🚌',
    icon: Bus,
    bgColor: 'bg-green-500/20',
    iconColor: 'text-green-400',
    description: 'Buying tickets, reading schedules, asking directions',
    aiExplanation: 'How AI Powers Transit: AI algorithms route buses dynamically based on real-time traffic flow data, while predictive models forecast arrival schedules.',
    details: {
      vocabulary: ['Fare', 'Schedule', 'Platform', 'Transfer', 'Commute'],
      phrases: ['Does this bus go to downtown?', 'How much is a single ticket?', 'Where do I change trains?'],
      dialog: 'A: Excuse me, is this the right platform for the express train?\nB: Yes, it should arrive in about 5 minutes.',
      techStack: 'Spatial-Temporal Graph Neural Networks (ST-GNN) & GPS-Telemetry heuristics',
      deepDive: 'Transit schedules utilize Spatial-Temporal Graph Neural Networks to model urban road layouts as a mathematical graph where intersections are vertices and roads are edges. Telemetry feeds from bus GPS trackers are filtered through Kalman filters to smooth sensor noise. The GNN then predicts traffic congestion propagation across neighboring nodes, allowing transit systems to dynamically re-route vehicles and output highly accurate Estimated Time of Arrival (ETA) values.'
    }
  },
  {
    id: 'restaurant',
    title: 'RESTAURANT',
    emoji: '🍴',
    icon: Utensils,
    bgColor: 'bg-red-500/20',
    iconColor: 'text-red-400',
    description: 'Making reservations, ordering meals, paying the bill',
    aiExplanation: 'How AI Powers Dining: Virtual table management engines optimize seating allocations, and smart kitchens queue orders to minimize cooking bottlenecks.',
    details: {
      vocabulary: ['Appetizer', 'Entree', 'Dessert', 'Reservation', 'Tip'],
      phrases: ['I have a reservation for two under John.', 'Could we see the dessert menu?', 'Check, please.'],
      dialog: 'A: Are you ready to order?\nB: Yes, I\'ll have the grilled salmon, please.',
      techStack: 'Integer Linear Programming (ILP) & Queue Theory optimization systems',
      deepDive: 'Online reservation platforms solve complex allocation challenges using Integer Linear Programming (ILP). The software structures table assignments as constraint-satisfaction problems, maximizing seating density and minimizing table idle times. In the kitchen, priority queue scheduling algorithms analyze ticket recipes, estimating prepare/cook durations for each dish component to align finishing times, preventing food from cooling under heat lamps.'
    }
  },
  {
    id: 'directions',
    title: 'ASKING DIRECTIONS',
    emoji: '🗺️',
    icon: MapPin,
    bgColor: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    description: 'Finding locations, understanding routes',
    aiExplanation: 'How AI Powers Directions: GPS map applications use pathfinding machine learning models to instantly calculate the fastest routes and traffic delays.',
    details: {
      vocabulary: ['Intersection', 'Landmark', 'Block', 'Straight', 'Crosswalk'],
      phrases: ['Excuse me, where is the nearest subway station?', 'Go straight for two blocks.', 'It\'s on your left.'],
      dialog: 'A: Could you tell me how to get to the museum?\nB: Sure, go down this street and turn right at the next corner.',
      techStack: 'A* Pathfinding Search, Dijkstra optimization & Deep Q-Networks (DQN)',
      deepDive: 'When asking a routing app for directions, the system executes an optimized A* search algorithm or contraction hierarchies on massive road network databases. Real-time speed adjustments are predicted using Deep Q-Networks that simulate route trajectories. By analyzing historical driving velocities and current user densities, the algorithm calculates alternative routes to bypass gridlock patterns before you even reach them.'
    }
  },
  {
    id: 'meeting',
    title: 'IN A MEETING',
    emoji: '👥',
    icon: Users,
    bgColor: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
    description: 'Introducing yourself, scheduling, collaboration',
    aiExplanation: 'How AI Powers Meetings: Speech-to-text models generate instant transcripts, while Large Language Models synthesize agendas and action items.',
    details: {
      vocabulary: ['Agenda', 'Brainstorm', 'Deadline', 'Feedback', 'Minutes'],
      phrases: ['Let\'s kick off this meeting.', 'Can we schedule a follow-up?', 'I\'d like to hear everyone\'s thoughts.'],
      dialog: 'A: Thanks for joining. Let\'s review the agenda.\nB: Sounds good, I\'ll take the minutes.',
      techStack: 'Whisper Automatic Speech Recognition (ASR) & Transformer LLM summary pipelines',
      deepDive: 'Modern video conference platforms leverage end-to-end Whisper-style sequence-to-sequence transformer models to map audio spectrogram waveforms to text tokens in real time. Following transcription, diarization algorithms identify speakers by clustering vocal pitch and resonance embedding vectors. Finally, Large Language Models run contextual attention passes on the transcript to extract action items, generate summaries, and email agendas.'
    }
  }
];

const dailyFacts = [
  { fact: "Smart home smart plugs use basic learning algorithms to map out when you turn your lights off.", category: "Smart Homes" },
  { fact: "Email auto-filters employ Naive Bayes classifiers to separate promotions from regular chat threads.", category: "Communication" },
  { fact: "Streaming queues analyze audio spectrum tags to suggest next songs with similar tempo values.", category: "Music & Entertainment" },
  { fact: "Autocorrect features utilize probabilistic models to swap misspelled letters with likely target words.", category: "Writing Helpers" }
];

export default function DailyLifePage() {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0] | null>(null);
  const [factIndex, setFactIndex] = useState(0);

  const handleExplore = async (scenario: typeof scenarios[0]) => {
    setSelectedScenario(scenario);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('user_scenarios').insert([
          { user_id: user.id, scenario_id: scenario.id }
        ]);
      }
    } catch (error) {
      console.error('Error tracking scenario:', error);
    }
  };

  const handleNextFact = () => {
    setFactIndex((prev) => (prev + 1) % dailyFacts.length);
  };

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-12">
      {/* Hero section */}
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-5xl md:text-7xl font-bold gradient-text-warm tracking-tighter">
          DAILY LIFE
        </h1>
        <p className="uppercase tracking-wide text-slate-400 font-medium">
          MASTER REAL-WORLD CONVERSATION & DISCOVER AI IN YOUR EVERYDAY ROUTINE.
        </p>
      </div>

      {/* Fact of the Day */}
      <div className="glass card max-w-2xl mx-auto rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 z-10 w-full md:w-auto">
          <div className="icon-circle-sm bg-blue-500/20 text-blue-400 shrink-0 flex items-center justify-center w-12 h-12 rounded-full">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="font-bold text-lg text-white">DAILY LIFE AI FACT</h2>
              <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">{dailyFacts[factIndex].category}</span>
            </div>
            <p className="font-bold text-white mt-1 leading-relaxed text-sm">
              "{dailyFacts[factIndex].fact}"
            </p>
          </div>
        </div>
        <div className="flex z-10 shrink-0">
          <button 
            onClick={handleNextFact}
            className="button-green px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2"
          >
            Next Fact <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3-column grid of scenario cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="glass card rounded-2xl p-5 flex flex-col items-start justify-between gap-4 transition-transform hover:-translate-y-1">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${scenario.bgColor}`}>
                  {scenario.emoji}
                </div>
                <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded-full">
                  AI Integration
                </span>
              </div>
              <h3 className="uppercase font-bold tracking-wide text-sm text-white mb-1">
                {scenario.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {scenario.description}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950/40 border border-white/5 text-[11px] text-indigo-300 leading-relaxed">
                {scenario.aiExplanation}
              </div>
            </div>
            <button 
              onClick={() => handleExplore(scenario)}
              className="button-outline rounded-full px-5 py-2 text-sm font-semibold w-full mt-2"
            >
              Explore Conversation
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedScenario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass card w-full max-w-lg rounded-3xl p-8 relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <button 
              onClick={() => setSelectedScenario(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 mb-8">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${selectedScenario.bgColor}`}>
                {selectedScenario.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                  {selectedScenario.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {selectedScenario.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-950/30 p-5 rounded-xl border border-indigo-500/25 space-y-3">
                <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Technical AI Integration
                </h4>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Tech Stack & Algorithms</span>
                  <p className="text-cyan-300 text-xs font-semibold mt-0.5">{selectedScenario.details.techStack}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Deep Dive Analytics</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-1 font-medium">{selectedScenario.details.deepDive}</p>
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 font-semibold mb-3 text-xs uppercase tracking-wider">Vocabulary</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedScenario.details.vocabulary.map(word => (
                    <span key={word} className="bg-slate-800/50 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700/50">
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-cyan-400 font-semibold mb-3 text-xs uppercase tracking-wider">Useful Phrases</h4>
                <ul className="space-y-2">
                  {selectedScenario.details.phrases.map((phrase, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2 bg-slate-900/30 p-2.5 rounded-lg border border-slate-800/50">
                      <span className="text-cyan-500/50 mt-0.5 shrink-0">•</span> {phrase}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/80">
                <h4 className="text-cyan-400 font-semibold mb-3 text-xs uppercase tracking-wider">Dialog Example</h4>
                <div className="space-y-1.5 text-sm text-slate-300 whitespace-pre-line leading-relaxed font-medium">
                  {selectedScenario.details.dialog}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/50">
               <button 
                onClick={() => setSelectedScenario(null)}
                className="button-green w-full py-3.5 rounded-xl font-bold shadow-lg shadow-green-500/20 text-sm tracking-wide"
              >
                Close & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
