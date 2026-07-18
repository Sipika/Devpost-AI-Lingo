import { 
  Brain,
  Cpu,
  Database,
  Sparkles,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Globe,
  ShieldAlert,
  Wand2,
  Search,
  Music,
  MapPin,
  Mail,
  Camera,
  Tv,
  Keyboard,
  ShoppingCart,
  Sun,
  ChefHat,
  Car,
  Utensils,
  Activity
} from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  emoji: string;
  category: string;
  readMinutes: number;
  difficulty: string;
  summary: string;
  body: string[];
  icon: React.ComponentType<any>;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  emoji: string;
  durationMinutes: number;
  level: string;
  blurb: string;
  topics: string[];
  accent: string;
  script: string[];
}

export interface Moment {
  id: string;
  emoji: string;
  icon: React.ComponentType<any>;
  activity: string;
  aiTech: string;
  tagline: string;
  story: string;
  takeaway: string;
  accent: string;
}

export const articles: Article[] = [
  {
    id: "what-is-ai",
    title: "What even IS Artificial Intelligence?",
    emoji: "🧠",
    category: "The Basics",
    readMinutes: 4,
    difficulty: "Beginner",
    summary: "AI is just a computer program that learns from examples instead of being told every rule. Think of it like teaching a dog a trick — with practice, it gets the idea.",
    body: [
      'Imagine you want to teach a friend to recognize cats. You could write down a list of rules: "has pointy ears, has whiskers, has a tail." But what about a cat with folded ears? Or a tail-less Manx cat? The rules break down fast.',
      'Artificial Intelligence flips that approach. Instead of rules, you show the computer thousands of photos and say "these are cats, these are not." Over time, the program notices the patterns itself — just like a child learns to recognize cats after seeing a bunch of them.',
      'That learning-from-examples approach is called "machine learning," and it is the engine behind almost every AI you hear about today — from voice assistants to movie recommendations to self-driving cars.',
      'So the next time someone says "AI," you can translate it in your head to: "a computer program that learned by looking at lots of examples." That is honestly most of it.'
    ],
    icon: Brain
  },
  {
    id: "neural-networks",
    title: "Neural Networks, explained without the math",
    emoji: "🕸️",
    category: "Under the Hood",
    readMinutes: 5,
    difficulty: "Curious",
    summary: "A neural network is a stack of tiny decision-makers that pass notes to each other. Each one only answers a tiny question — together they answer big ones.",
    body: [
      'Picture a giant game of telephone, but every person in the line is asking a tiny yes/no question about what they heard. "Is it round?" "Is it red?" "Does it smell sweet?" Each person passes their answer forward.',
      'A neural network works the same way. It is made of layers of tiny units called "neurons." The first layer looks at the raw input (like pixels of an image). Each neuron answers a tiny question and passes its answer to the next layer.',
      'By the time the answer reaches the final layer, the network has combined thousands of tiny clues into one big conclusion: "this is a strawberry."',
      "No single neuron knows what a strawberry is. The magic is in the teamwork — just like a crowd of people each holding one piece of a puzzle."
    ],
    icon: Cpu
  },
  {
    id: "training-data",
    title: "Why AI needs so much data (and what happens when it is bad)",
    emoji: "📚",
    category: "Under the Hood",
    readMinutes: 4,
    difficulty: "Beginner",
    summary: "AI is only as good as the examples it learned from. Feed it a lopsided textbook and it will give you lopsided answers.",
    body: [
      "Remember learning to recognize cats by seeing lots of cats? If you only ever saw black cats, you might think all cats are black. AI has the exact same blind spot.",
      'The collection of examples an AI learns from is called its "training data." If that data is small, biased, or full of errors, the AI inherits those flaws. A famous chatbot once became rude because it learned from toxic internet comments.',
      "This is why companies spend enormous effort curating training data — and why you should be skeptical of AI answers on topics where good data is scarce.",
      'Rule of thumb: ask "what did this AI learn from?" before trusting what it says.'
    ],
    icon: Database
  },
  {
    id: "generative-ai",
    title: "Generative AI: how machines now create things",
    emoji: "✨",
    category: "Frontier",
    readMinutes: 6,
    difficulty: "Deep Dive",
    summary: "Generative AI does not copy-paste from the internet. It learned the style of millions of examples and now invents new ones in that style.",
    body: [
      'For decades, AI was mostly about classifying things — "is this a cat or a dog?" Generative AI flipped that: instead of labeling, it creates.',
      'How? By studying millions of texts, images, or songs until it understands the patterns that make them feel "right." Then, when you ask for something new, it builds it one piece at a time, choosing each next piece based on what usually comes next.',
      "It is like a musician who has listened to every jazz album ever made. They are not replaying a recording — they are improvising in a style they absorbed.",
      "That is why generative AI can feel magical and also make mistakes: it is inventing, not retrieving. Treat its answers as a creative draft, not a fact lookup."
    ],
    icon: Sparkles
  },
  {
    id: "hallucinations",
    title: "Why AI sometimes confidently lies to you",
    emoji: "🤥",
    category: "Staying Safe",
    readMinutes: 3,
    difficulty: "Curious",
    summary: 'AI does not "know" facts the way a search engine does. It predicts what sounds plausible — and sometimes that means making things up.',
    body: [
      'When a chatbot tells you a fake fact with total confidence, that is called a "hallucination." It is not lying on purpose — it has no concept of truth, only of what words tend to follow other words.',
      "Think of it like a very well-read parrot. It can string together impressive sentences, but it has no way to check if they are actually correct.",
      "The practical lesson: always verify important AI answers against a trusted source. AI is a brainstorming partner, not an oracle."
    ],
    icon: AlertTriangle
  },
  {
    id: "ai-vs-traditional",
    title: "AI vs. regular software: what is actually different?",
    emoji: "⚖️",
    category: "The Basics",
    readMinutes: 4,
    difficulty: "Beginner",
    summary: "Regular software follows a recipe. AI learns the recipe by watching. That difference changes everything about how we build and trust them.",
    body: [
      'Traditional software is a detailed recipe: "step 1, step 2, step 3." The programmer writes every instruction. Predictable, but rigid — if something is not in the recipe, the program cannot do it.',
      'AI is different. The programmer sets up a learning system and feeds it examples. The AI figures out its own internal "recipe." That makes it flexible — it can handle messy, real-world inputs — but also harder to fully explain.',
      "This is why AI feels both magical and mysterious: it is doing useful work, but even its creators cannot always point to the exact line of logic that produced an answer."
    ],
    icon: BookOpen
  },
  {
    id: "llms",
    title: "Large Language Models: the engine behind ChatGPT",
    emoji: "💬",
    category: "Frontier",
    readMinutes: 5,
    difficulty: "Deep Dive",
    summary: "An LLM is a giant next-word-predictor trained on a huge slice of the internet. Its skill is guessing the most likely next word — billions of times in a row.",
    body: [
      'A Large Language Model (LLM) has one core trick: predict the next word. Given "the cat sat on the," it guesses "mat." Do that billions of times and you get essays, code, and conversation.',
      "To pull this off, the model is trained on a massive chunk of the internet — books, articles, forums. It learns grammar, facts, reasoning patterns, and style all at once, as side-effects of next-word prediction.",
      'The "large" in LLM refers to two things: the size of the training data and the number of parameters (the adjustable knobs inside the model). Modern LLMs have hundreds of billions of parameters.',
      'The surprising insight: predicting the next word well enough, on enough text, produces behavior that looks a lot like reasoning. Whether it truly "reasons" is still debated.'
    ],
    icon: MessageSquare
  },
  {
    id: "bias",
    title: "AI bias: when the machine inherits our blind spots",
    emoji: "⚖️",
    category: "Staying Safe",
    readMinutes: 4,
    difficulty: "Curious",
    summary: "AI bias does not invent bias from nowhere — it amplifies the bias already in its training data. Spotting it starts with asking who was left out.",
    body: [
      `A hiring AI was once found to downgrade resumes that mentioned "women's chess club." It had learned from past hiring data where women were underrepresented — and dutifully copied that pattern.`,
      "This is AI bias: not malice, but a mirror. The model reflects the inequalities in the data it was fed. If the past was unfair, the AI will predict an unfair future.",
      'Fixing it is hard — you cannot just delete bias like a typo. It requires diverse data, careful testing, and humans in the loop. As a user, your job is to ask: "who might this system disadvantage?"'
    ],
    icon: ShieldAlert
  },
  {
    id: "machine-learning",
    title: "Machine Learning vs. AI vs. Deep Learning: a quick map",
    emoji: "🗺️",
    category: "The Basics",
    readMinutes: 3,
    difficulty: "Beginner",
    summary: "AI is the big tent. Machine learning is the main act. Deep learning is the headline star inside it. Here is how they nest.",
    body: [
      'AI is the broadest term — any technique that makes computers do things we would call "intelligent."',
      "Machine learning is a subset of AI: programs that learn from data instead of being explicitly programmed.",
      "Deep learning is a subset of machine learning that uses many-layered neural networks. It powers modern breakthroughs like image recognition and LLMs.",
      "So: all deep learning is machine learning, and all machine learning is AI — but not all AI is deep learning. Russian nesting dolls, but for tech."
    ],
    icon: Globe
  },
  {
    id: "prompts",
    title: "Prompting: how to talk so the AI listens",
    emoji: "🎯",
    category: "Practical",
    readMinutes: 4,
    difficulty: "Curious",
    summary: "A prompt is the instruction you give an AI. Small wording changes can produce wildly different answers. Here is how to write good ones.",
    body: [
      'A "prompt" is just the text you type into a chatbot. But the way you phrase it shapes the answer you get back.',
      'Vague prompt: "write a poem." Result: a generic poem. Better prompt: "write a haiku about a rainy morning in Mumbai, in the voice of a tired commuter." Specificity unlocks quality.',
      'Good prompts usually include: a role ("act as a travel agent"), a task, context, and a format ("give me a bulleted list").',
      "Think of prompting like giving briefings to a brilliant but literal-minded intern. The clearer your brief, the better the work."
    ],
    icon: Wand2
  },
  {
    id: "agi",
    title: "AGI: the dream (and worry) of truly human-level AI",
    emoji: "🌍",
    category: "Frontier",
    readMinutes: 5,
    difficulty: "Deep Dive",
    summary: "AGI — Artificial General Intelligence — would be an AI as flexible as a human at any task. We are not there yet, and experts argue about when (or if) we will be.",
    body: [
      `Today's AI is "narrow": great at the specific task it was trained for, useless outside it. A chess AI cannot write a poem; a poem AI cannot play chess.`,
      "AGI would be different — a single system that can learn and do any intellectual task a human can. It is the holy grail (and for some, the fear) of the field.",
      "Are we close? Honestly, no one knows. Some experts say years, some say decades, some say never. The honest answer is: AGI is a research goal, not a shipping product.",
      "What is clear is that even narrow AI is already changing work, art, and society. AGI would amplify that by an enormous amount — which is why the conversation matters now."
    ],
    icon: Globe
  },
  {
    id: "ai-everywhere",
    title: "Where AI is already hiding in your day",
    emoji: "🔍",
    category: "Practical",
    readMinutes: 3,
    difficulty: "Beginner",
    summary: "You probably use AI dozens of times a day already — unlocking your phone, navigating traffic, getting spam filtered. Here is a quick tour.",
    body: [
      "Face ID uses a neural network to recognize your face. Google Maps uses AI to predict traffic and pick the fastest route.",
      'Your email spam filter? AI. The "people you may know" on social media? AI. The next song Spotify queues up? AI.',
      "Once you start noticing, AI is everywhere — quietly doing the boring-but-hard jobs that make modern life smooth.",
      "That is the big reveal: AI is not a future technology. It is a present one, and you are already a daily user."
    ],
    icon: Search
  }
];

export const podcasts: Podcast[] = [
  {
    id: "ai-in-5",
    title: "AI in 5 Minutes",
    host: "Sam Patel",
    emoji: "⏱️",
    durationMinutes: 5,
    level: "Start Here",
    blurb: "Bite-sized episodes that explain one AI idea before your tea gets cold. Perfect for total beginners — no jargon, no homework.",
    topics: ["What is AI", "Everyday examples", "Demystifying buzzwords"],
    accent: "from-violet-500 to-indigo-500",
    script: [
      "Welcome to AI in 5 Minutes. I'm Sam Patel, and today we answer the simplest question: what even is artificial intelligence?",
      "Here is the big idea. Instead of giving a computer a list of rules, we show it lots of examples and let it find the patterns itself.",
      "Think of how a child learns to recognize cats. Not from a rulebook, but from seeing lots of cats. AI works the same way.",
      "So next time you hear the word AI, just translate it in your head: a computer program that learned by looking at examples. That is honestly most of it.",
      "That is your five minutes. I'm Sam Patel — catch you next time."
    ]
  },
  {
    id: "kitchen-table-ai",
    title: "The Kitchen-Table AI Show",
    host: "Maya Rodriguez",
    emoji: "🍳",
    durationMinutes: 18,
    level: "Start Here",
    blurb: "Conversations about AI the way you would have them over breakfast with a smart friend. Real stories, real questions, zero slides.",
    topics: ["AI at home", "Family tech", "Everyday ethics"],
    accent: "from-amber-400 to-orange-300",
    script: [
      "Hey friends, welcome back to the Kitchen-Table AI Show. I'm Maya Rodriguez. Grab a coffee.",
      "Today let's talk about the AI already living in your home. Your spam filter, your maps app, the show Netflix just recommended.",
      "None of it is magic. It is all pattern matching, learned from millions of examples.",
      "The takeaway: you are already an AI user, every single day. You just did not know the labels.",
      "That is it for today. Tell a friend what you learned over breakfast tomorrow. I'm Maya — bye for now."
    ]
  },
  {
    id: "smart-dumb-machines",
    title: "Smart, Dumb Machines",
    host: "Leo Tan",
    emoji: "🤖",
    durationMinutes: 24,
    level: "Going Deeper",
    blurb: "A lighthearted dive into the hilarious, weird, and sometimes worrying things AI gets wrong — and what that tells us about how it thinks.",
    topics: ["AI fails", "Hallucinations", "How models think"],
    accent: "from-emerald-500 to-teal-500",
    script: [
      "Welcome to Smart, Dumb Machines. I'm Leo Tan, and today we laugh at AI's most confident mistakes.",
      "A chatbot once cited a made-up court case with total confidence. A lawyer actually submitted it to a judge. True story.",
      "Why does this happen? Because AI does not know facts. It predicts what words usually come next. Sometimes that means inventing things.",
      "We call these hallucinations. They are not lies — they are the AI doing exactly what it was built to do, just without a fact-checker.",
      "The lesson: treat AI answers as a creative draft, not a fact lookup. Always verify the important stuff. I'm Leo — stay curious."
    ]
  },
  {
    id: "the-prompt",
    title: "The Prompt",
    host: "Aisha Khan",
    emoji: "🎙️",
    durationMinutes: 32,
    level: "Going Deeper",
    blurb: "Interviews with the people actually building AI, translated into plain English. Hear how the sausage is made — without needing a PhD.",
    topics: ["Builder stories", "Behind the scenes", "Future of work"],
    accent: "from-blue-500 to-indigo-500",
    script: [
      "This is The Prompt. I'm Aisha Khan, and today we go behind the scenes with the people building AI.",
      "My guest this week builds recommendation systems. Her take: most of the magic is not the algorithm, it is the data you feed it.",
      "Garbage in, garbage out, she said. A model trained on biased data will make biased predictions. Full stop.",
      "So the real skill in AI engineering is not math. It is asking: who is this data missing? Who does it leave out?",
      "That is our show. I'm Aisha Khan. Keep asking good prompts."
    ]
  },
  {
    id: "models-and-morals",
    title: "Models & Morals",
    host: "Dr. Jordan Lee",
    emoji: "⚖️",
    durationMinutes: 38,
    level: "For the Brave",
    blurb: "The big ethical questions AI raises — bias, jobs, privacy, power — discussed calmly and clearly. No doom, no hype, just thinking.",
    topics: ["Ethics", "Bias", "Society", "Policy"],
    accent: "from-rose-400 to-pink-300",
    script: [
      "Welcome to Models and Morals. I'm Doctor Jordan Lee. Today, the hard question of bias.",
      "A hiring AI was caught downgrading resumes that mentioned women's chess club. It learned that from past hiring data where women were underrepresented.",
      "The AI did not invent the bias. It mirrored it. That is the uncomfortable truth about machine learning.",
      "Fixing it is not a software patch. It is a question of who curates the data, who tests the system, and who is held accountable when it fails.",
      "Thanks for thinking with me. I'm Doctor Jordan Lee."
    ]
  },
  {
    id: "deep-dive-lab",
    title: "Deep Dive Lab",
    host: "Priya Nair",
    emoji: "🔬",
    durationMinutes: 45,
    level: "For the Brave",
    blurb: "For when you want to actually understand how the magic works. One concept per episode, unpacked step by step with friendly metaphors.",
    topics: ["Neural networks", "Training", "Transformers"],
    accent: "from-emerald-400 to-teal-300",
    script: [
      "Welcome to Deep Dive Lab. I'm Priya Nair. Today: neural networks, no math required.",
      "Imagine a giant game of telephone. Each person asks a tiny yes or no question and passes the answer forward.",
      "A neural network works the same way. Layers of tiny neurons each answer a tiny question, then pass their answer to the next layer.",
      "By the final layer, thousands of tiny clues combine into one big conclusion: this is a strawberry.",
      "No single neuron knows what a strawberry is. The magic is the teamwork. I'm Priya — keep diving."
    ]
  }
];

export const moments: Moment[] = [
  {
    id: "spotify",
    emoji: "🎧",
    icon: Music,
    activity: "Spotify queuing up your next favorite song",
    aiTech: "Recommendation systems",
    tagline: "AI is the friend who knows your taste better than you do.",
    story: 'When Spotify picks your next song, it is not random. It has quietly studied what you play on Mondays vs. Fridays, what you skip, what you replay. It also compares you to millions of listeners with similar taste and asks: "what did they enjoy that you have not heard yet?"',
    takeaway: "Recommendation AI = pattern matching across millions of people, then a personalized guess for you.",
    accent: "from-emerald-400 to-teal-300"
  },
  {
    id: "maps",
    emoji: "🗺️",
    icon: MapPin,
    activity: "Google Maps rerouting you around traffic",
    aiTech: "Predictive routing",
    tagline: "AI is a co-pilot that has driven your route a billion times.",
    story: "Maps does not just know the roads — it knows how traffic flows on them at this exact hour, on this exact day. It learned from every phone that has ever moved along those streets. When it reroutes you, it is predicting the future of traffic, not just reading the present.",
    takeaway: "AI forecasting = learning from huge amounts of past behavior to guess what happens next.",
    accent: "from-violet-500 to-indigo-500"
  },
  {
    id: "email",
    emoji: "✉️",
    icon: Mail,
    activity: "Your inbox filtering spam automatically",
    aiTech: "Classification models",
    tagline: "AI is a bouncer for your inbox.",
    story: 'Every email is quietly scored: how spammy is the wording? Is the sender known? Are there sketchy links? The AI learned from millions of emails labeled "spam" or "not spam" and now makes that call in milliseconds for every message you receive.',
    takeaway: "AI classification = sorting things into buckets, learned from labeled examples.",
    accent: "from-purple-500 to-pink-500"
  },
  {
    id: "faceid",
    emoji: "😊",
    icon: Camera,
    activity: "Face ID unlocking your phone",
    aiTech: "Computer vision",
    tagline: "AI is a portrait artist who never forgets a face.",
    story: 'Face ID maps dozens of points on your face — the curve of your jaw, the distance between your eyes — and turns them into a mathematical fingerprint. It learned what "you" look like from different angles, with glasses, in different light. Every unlock is a tiny face-recognition contest.',
    takeaway: "Computer vision AI = turning pictures into numbers a machine can compare.",
    accent: "from-rose-400 to-pink-300"
  },
  {
    id: "netflix",
    emoji: "📺",
    icon: Tv,
    activity: "Netflix knowing you will binge that next show",
    aiTech: "Collaborative filtering",
    tagline: "AI is a librarian who remembers every page you ever turned.",
    story: 'Netflix does not just track what you watch — it tracks when you pause, when you skip the intro, when you abandon a show. It bundles you with viewers who behaved similarly and asks: "what kept them watching?" That is why the thumbnail art sometimes changes to match your taste.',
    takeaway: "AI personalization = learning your habits to serve you the right thing at the right moment.",
    accent: "from-violet-400 to-indigo-300"
  },
  {
    id: "autocorrect",
    emoji: "⌨️",
    icon: Keyboard,
    activity: 'Autocorrect fixing "definately" to "definitely"',
    aiTech: "Language models",
    tagline: "AI is a proofreader who has read the entire internet.",
    story: 'Your keyboard has seen the word "definitely" misspelled a million ways. It learned which corrections people actually accept. When you typo, it is not checking a dictionary — it is predicting the word you most likely meant, given the words around it.',
    takeaway: "Language AI = predicting the most likely correct version of what you typed.",
    accent: "from-amber-400 to-orange-300"
  },
  {
    id: "shopping",
    emoji: "🛒",
    icon: ShoppingCart,
    activity: 'Amazon suggesting "frequently bought together"',
    aiTech: "Association learning",
    tagline: "AI is a shopkeeper who watches every shopping cart.",
    story: 'When a store says "people who bought this also bought that," it learned the pattern from millions of real shopping carts. It spotted that chips and salsa show up together more often than chance would explain — and now nudges you toward the pairing.',
    takeaway: 'AI association = finding "things that go together" by watching what people actually do.',
    accent: "from-indigo-500 to-blue-500"
  },
  {
    id: "weather",
    emoji: "☀️",
    icon: Sun,
    activity: "The weather app predicting rain in 2 hours",
    aiTech: "Forecasting models",
    tagline: "AI is a meteorologist who has watched every storm in history.",
    story: "Modern forecasts are not guesses — they are AI models fed by satellites, sensors, and decades of weather records. The model learned how today's atmospheric patterns usually unfold, then runs a simulation to predict the next few hours.",
    takeaway: "AI forecasting = simulating the future from patterns learned in the past.",
    accent: "from-sky-400 to-blue-300"
  },
  {
    id: "fridge",
    emoji: "🧊",
    icon: ChefHat,
    activity: "A smart fridge suggesting recipes from leftovers",
    aiTech: "Multimodal AI",
    tagline: "AI is a chef who can see inside your fridge and read recipes.",
    story: 'A modern smart fridge has a camera that recognizes the food inside, then a language model suggests recipes that use those ingredients. It combines two AI skills — seeing and reading — which is why we call it "multimodal."',
    takeaway: "Multimodal AI = combining different senses (sight, text, sound) into one assistant.",
    accent: "from-teal-400 to-cyan-300"
  },
  {
    id: "car",
    emoji: "🚗",
    icon: Car,
    activity: "A self-driving car staying in its lane",
    aiTech: "Real-time perception",
    tagline: "AI is a driver with eyes on every angle, all the time.",
    story: "A self-driving car constantly identifies lane markings, pedestrians, signs, and other cars — then predicts where each will move next. It makes these decisions dozens of times per second, never gets distracted, and learns from every mile every car in the fleet has ever driven.",
    takeaway: "AI perception = recognizing and predicting the world in real time.",
    accent: "from-slate-400 to-gray-300"
  },
  {
    id: "chef",
    emoji: "👨‍🍳",
    icon: Utensils,
    activity: "A recipe app inventing a dish from what you have",
    aiTech: "Generative AI",
    tagline: "AI is a creative chef who has read every cookbook.",
    story: 'Tell a recipe app "I have eggs, spinach, and feta" and it invents a dish. It is not searching a database — it learned the patterns of countless recipes and now generates a new one that follows those patterns. Creative, but sometimes a little weird.',
    takeaway: "Generative AI = inventing new things in a style it learned from examples.",
    accent: "from-lime-400 to-green-300"
  },
  {
    id: "health",
    emoji: "❤️",
    icon: Activity,
    activity: "A smartwatch flagging an irregular heartbeat",
    aiTech: "Anomaly detection",
    tagline: "AI is a doctor who watches your heartbeat 24/7.",
    story: "Your smartwatch learned what a normal heart rhythm looks like for you. When something deviates — an odd pattern that could be atrial fibrillation — it flags it. It is not diagnosing you, but it is spotting the unusual so a human doctor can take a closer look.",
    takeaway: 'AI anomaly detection = learning "normal" and flagging when something strays.',
    accent: "from-red-400 to-rose-300"
  }
];
