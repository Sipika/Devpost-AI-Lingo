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
      techStack: 'Smart Bakery Matcher (Recommendation Engine)',
      simpleExplanation: 'Imagine you always order chocolate cookies with your hot cocoa. The café’s computer remembers this! When another kid orders hot cocoa, the computer says, "Hey, would you like a chocolate cookie too?" Just like a helpful friend sharing snacks.'
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
      techStack: 'Self-Scanning Eyes (Computer Vision)',
      simpleExplanation: 'The store has smart cameras on the ceiling that act like robotic eyes. When you take a toy or candy box off the shelf, the cameras spot it instantly and update the store’s list so they never run out of your favorite items.'
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
      techStack: 'Traffic Path Finder (Smart Routing)',
      simpleExplanation: 'Buses have GPS trackers sending signals. A smart central computer maps out all the roads like a puzzle. If there is a big traffic jam on one street, the computer guides the bus driver to turn early so you reach school on time.'
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
      techStack: 'Kitchen Order Organizers (Queue Schedulers)',
      simpleExplanation: 'When everyone orders food at the same time, the kitchen gets busy! The chef uses a smart screen that lists dishes by how long they take to cook. It ensures your hot soup and cold ice cream arrive at the table at the exact right moment.'
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
      techStack: 'Map Explorer (A* Pathfinding)',
      simpleExplanation: 'Your phone map acts like a maze solver. It checks every single street and counts how many cars are there. Then, it draws a bright blue line showing you the absolute fastest path to the playground.'
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
      techStack: 'Talking Robot Writer (Voice Transcription)',
      simpleExplanation: 'When people talk on a video call, a smart microphone listens to their voices. It converts spoken words into text instantly, acting like a super-fast typing robot that writes down notes so you don\'t have to.'
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
          DISCOVER HOW SMART COMPUTERS HELP US IN OUR EVERYDAY ROUTINE.
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
                {scenario.details.techStack}
              </div>
            </div>
            <button 
              onClick={() => handleExplore(scenario)}
              className="button-outline rounded-full px-5 py-2 text-sm font-semibold w-full mt-2"
            >
              Explore AI
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
              <div className="bg-indigo-950/30 p-6 rounded-xl border border-indigo-500/25 space-y-4">
                <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> How It Works
                </h4>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Tech Stack</span>
                  <p className="text-cyan-300 text-sm font-semibold mt-0.5">{selectedScenario.details.techStack}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Simple Explanation</span>
                  <p className="text-slate-200 text-xs leading-relaxed mt-1 font-medium">{selectedScenario.details.simpleExplanation}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/50">
               <button 
                onClick={() => setSelectedScenario(null)}
                className="button-green w-full py-3.5 rounded-xl font-bold shadow-lg shadow-green-500/20 text-sm tracking-wide"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
