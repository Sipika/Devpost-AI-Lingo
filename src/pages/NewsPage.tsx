import { useState } from 'react';
import type { ReactNode } from 'react';
import { Newspaper, Brain, Zap, Globe, Sparkles, BookOpen, Code, Image as ImageIcon, MessageSquare, ArrowLeft, Heart, Share2 } from 'lucide-react';

type ArticleCategory = 'Breakthrough' | 'Trending' | 'Research';

interface Article {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string[];
  category?: ArticleCategory;
  featured?: boolean;
  imageUrl?: string;
  wide?: boolean;
}

const mockArticles: Article[] = [
  // Featured (Top Row)
  {
    id: '1',
    icon: <Globe className="w-8 h-8 text-white" />,
    title: 'AI Revolutionizes Language Learning',
    description: 'Generative AI models are completely changing how quickly humans acquire new vocabulary and structures.',
    date: 'Oct 28, 2026',
    author: 'Sarah Chen',
    featured: true,
    content: [
      'Generative AI models are completely changing how quickly humans acquire new vocabulary and structures. Instead of static grammar sheets, learners can now chat with adaptive tutors who target their specific weaknesses.',
      'Research shows that adaptive learning paths guided by LLMs speed up secondary language acquisition by up to 40%.',
      'As speech synthesis and speech recognition technologies mature, vocal practice is reaching near-native conversational flows.'
    ]
  },
  {
    id: '2',
    icon: <Brain className="w-8 h-8 text-white" />,
    title: 'Neural Models Achieve Fluency',
    description: 'New deep learning systems emulate human intuition for smooth context-dependent translations.',
    date: 'Oct 28, 2026',
    author: 'Leo Dubois',
    featured: true,
    content: [
      'New deep learning systems emulate human intuition for smooth context-dependent translations. Standard rule-based engines are a thing of the past.',
      'By analyzing millions of conversational samples, current transformer systems understand idiomatic expressions, regional slang, and subtle tones.',
      'This creates translation tools that sound native rather than robotic.'
    ]
  },
  {
    id: '3',
    icon: <Zap className="w-8 h-8 text-white" />,
    title: 'Real-time AI Translation Trends',
    description: 'Instant translation devices are bridging human connections on business meetings and casual interactions.',
    date: 'Oct 27, 2026',
    author: 'Ben Carter',
    featured: true,
    content: [
      'Instant translation devices are bridging human connections on business meetings and casual interactions. Hardware and software integrations are reaching sub-second latency.',
      'Whether traveling abroad or conducting international trade, real-time overlays are removing the friction of language boundaries.',
      'Next-generation integrations point toward wearable devices and seamless smart glasses.'
    ]
  },
  // Regular (Middle Rows)
  {
    id: '4',
    icon: <Code className="w-5 h-5 text-indigo-400" />,
    title: 'AI Revolutionizes Develop Tech',
    description: 'New coding assistants are helping developers build language apps faster than ever before.',
    date: 'Oct 27, 2026',
    author: 'Sarah Chen',
    category: 'Trending',
    content: [
      'New coding assistants are helping developers build language apps faster than ever before.',
      'Vite configurations and React templates are set up in minutes with robust TypeScript constraints.',
      'Developers can now dedicate 100% of their focus to visual aesthetics and game loop user experiences.'
    ]
  },
  {
    id: '5',
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    title: 'AI Heading Technology',
    description: 'Breakthroughs in natural language processing create more realistic human-like text generation.',
    date: 'Oct 26, 2026',
    author: 'Leo Dubois',
    category: 'Breakthrough',
    content: [
      'Breakthroughs in natural language processing create more realistic human-like text generation.',
      'Advanced token prediction and semantic weighting are making dialogue feel remarkably organic.',
      'AI systems can adopt specific personas, from friendly language partners to expert technical engineers.'
    ]
  },
  {
    id: '6',
    icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
    title: 'Real-time AI Archive Science',
    description: 'Researchers have digitized and translated thousands of ancient texts in record time.',
    date: 'Oct 25, 2026',
    author: 'Ben Carter',
    category: 'Research',
    content: [
      'Researchers have digitized and translated thousands of ancient texts in record time.',
      'OCR vision engines translate deteriorating stone carvings and manuscripts with accuracy, preserving cultural history.',
      'This technology opens historical archives to global researchers without requiring physical document transit.'
    ]
  },
  {
    id: '7',
    icon: <Globe className="w-5 h-5 text-violet-400" />,
    title: 'AI Revolutionizes E-Learning',
    description: 'Personalized AI tutors are becoming the standard in modern online education platforms.',
    date: 'Oct 25, 2026',
    author: 'Sarah Chen',
    content: [
      'Personalized AI tutors are becoming the standard in modern online education platforms.',
      'Interactive modules adapt in real-time, giving students customized quizzes matching their progress.',
      'Teachers are leveraging these analytics to quickly design classroom curriculums.'
    ]
  },
  {
    id: '8',
    icon: <ImageIcon className="w-5 h-5 text-rose-400" />,
    title: 'Real-time AI Image Fluency',
    description: 'Vision models are now capable of understanding and explaining complex scenes in 50+ languages.',
    date: 'Oct 24, 2026',
    author: 'Leo Dubois',
    category: 'Breakthrough',
    content: [
      'Vision models are now capable of understanding and explaining complex scenes in 50+ languages.',
      'A user can point their mobile phone at an object and get dynamic contextual translations instantly.',
      'This merges visual and lexical learning pathways seamlessly.'
    ]
  },
  {
    id: '9',
    icon: <MessageSquare className="w-5 h-5 text-amber-400" />,
    title: 'Real-time AI Translation Trends',
    description: 'Live translation features are being integrated into every major communication app this year.',
    date: 'Oct 24, 2026',
    author: 'Ben Carter',
    category: 'Trending',
    content: [
      'Live translation features are being integrated into every major communication app this year.',
      'Voice chats and messaging feeds are translated on-the-fly, allowing multi-lingual group chats.',
      'This enables global collaborations without needing human translators present.'
    ]
  },
  // Bottom Row (Wide/Images)
  {
    id: '10',
    icon: <Newspaper className="w-5 h-5 text-fuchsia-400" />,
    title: 'The Future of Polyglot AI Systems',
    description: 'Deep dive into the architecture of the next generation of language models that natively understand multiple languages without translation layers.',
    date: 'Oct 23, 2026',
    author: 'Sarah Chen',
    wide: true,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    category: 'Research',
    content: [
      'Deep dive into the architecture of the next generation of language models that natively understand multiple languages without translation layers.',
      'Natively multilingual representations map vocabulary into high-dimensional vector spaces where semantics are shared.',
      'This bypasses traditional double-translation lags and maintains emotional semantics.'
    ]
  },
  {
    id: '11',
    icon: <Brain className="w-5 h-5 text-teal-400" />,
    title: 'Cognitive Science Meets Deep Learning',
    description: 'How studies of the human brain are influencing the design of new neural network architectures for language processing.',
    date: 'Oct 22, 2026',
    author: 'Leo Dubois',
    wide: true,
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop',
    content: [
      'How studies of the human brain are influencing the design of new neural network architectures for language processing.',
      'Researchers are experimenting with neural networks that feature artificial attention systems similar to human visual focus.',
      'This promises to reduce hallucination and enhance contextual memories.'
    ]
  }
];

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const featuredArticles = mockArticles.filter(a => a.featured);
  const regularArticles = mockArticles.filter(a => !a.featured && !a.wide).slice(0, visibleCount);
  const wideArticles = mockArticles.filter(a => !a.featured && a.wide);

  const getBadgeClass = (category?: ArticleCategory) => {
    switch (category) {
      case 'Breakthrough': return 'badge badge-breakthrough';
      case 'Trending': return 'badge badge-trending';
      case 'Research': return 'badge badge-research';
      default: return 'badge';
    }
  };

  const getIconBgColor = (index: number) => {
    const colors = ['bg-teal-500', 'bg-violet-500', 'bg-emerald-500'];
    return colors[index % colors.length];
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 pt-24 text-slate-200">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-medium text-sm gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to News Feed
          </button>

          <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden space-y-6">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                {selectedArticle.category && (
                  <span className={getBadgeClass(selectedArticle.category)}>
                    {selectedArticle.category}
                  </span>
                )}
                <span className="text-slate-400 text-xs">{selectedArticle.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => toggleLike(e, selectedArticle.id)}
                  className={`p-2 rounded-full border transition ${likes[selectedArticle.id] ? 'bg-rose-500/20 border-rose-500 text-rose-500' : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'}`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
                <button className="p-2 rounded-full border bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white transition">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="text-sm text-slate-400 font-semibold">
              By {selectedArticle.author}
            </div>

            {selectedArticle.imageUrl && (
              <div className="rounded-2xl overflow-hidden h-64 md:h-96 w-full">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-6 text-slate-300 leading-relaxed text-base">
              {selectedArticle.content ? (
                selectedArticle.content.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>{selectedArticle.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 pt-24 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-12 stagger-children">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 gradient-text">
              AI-Lingo News
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            The Latest in AI &amp; Language Innovation
          </p>
        </div>

        {/* TOP ROW: Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="glass card card-hover rounded-2xl p-8 flex flex-col items-center text-center space-y-6 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${getIconBgColor(index)} icon-circle`}>
                {article.icon}
              </div>
              <h2 className="text-2xl font-bold leading-tight">
                {article.title}
              </h2>
            </div>
          ))}
        </div>

        {/* MIDDLE ROWS: Regular Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="glass card card-hover rounded-xl p-6 flex flex-col justify-between h-full space-y-4 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 icon-circle-sm">
                    {article.icon}
                  </div>
                  {article.category && (
                    <span className={getBadgeClass(article.category)}>
                      {article.category}
                    </span>
                  )}
                </div>
                <div className="flex-grow space-y-2">
                  <h3 className="text-lg font-bold text-slate-100 line-clamp-2">{article.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{article.description}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800/50 text-xs text-slate-500 font-medium flex items-center justify-between">
                <span>{article.date}</span>
                <span>{article.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW: Wide Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wideArticles.map((article) => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="glass card card-hover rounded-xl overflow-hidden flex flex-col sm:flex-row group cursor-pointer"
            >
              {article.imageUrl && (
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className={`p-6 flex flex-col justify-between ${article.imageUrl ? 'sm:w-3/5' : 'w-full'}`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700/50 icon-circle-sm">
                      {article.icon}
                    </div>
                    {article.category && (
                      <span className={getBadgeClass(article.category)}>
                        {article.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{article.title}</h3>
                  <p className="text-slate-400 text-sm">{article.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/50 text-xs text-slate-500 font-medium flex items-center justify-between">
                  <span>{article.date}</span>
                  <span>{article.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 pb-12 border-t border-slate-800/50">
          <div className="hidden sm:block w-32" /> {/* Spacer */}
          {visibleCount < mockArticles.filter(a => !a.featured && !a.wide).length && (
            <button 
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="button-load-more px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold tracking-wide shadow-lg shadow-cyan-900/20 transition-all hover:scale-105 active:scale-95"
            >
              LOAD MORE ARTICLES
            </button>
          )}
          <div className="w-32 text-right mt-4 sm:mt-0 text-slate-500 text-sm font-medium">
            Page 1 of 2
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsPage;
