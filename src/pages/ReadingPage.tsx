import React from 'react';

const articles = [
  {
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al.',
    year: 2017,
    url: 'https://arxiv.org/abs/1706.03762',
    summary: 'Introduces the Transformer architecture that powers modern LLMs.'
  },
  {
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'He et al.',
    year: 2015,
    url: 'https://arxiv.org/abs/1512.03385',
    summary: 'Presents ResNet, a breakthrough in deep image classification.'
  },
  {
    title: 'GPT‑3: Language Models are Few‑Shot Learners',
    authors: 'Brown et al.',
    year: 2020,
    url: 'https://arxiv.org/abs/2005.14165',
    summary: 'Describes the capabilities of large language models like GPT‑3.'
  }
];

const ReadingPage: React.FC = () => {
  console.log('ReadingPage rendered');
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 mb-4">
        AI Reading List
      </h2>
      <ul className="space-y-4">
        {articles.map((a, idx) => (
          <li key={idx} className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors shadow-lg glass">
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-xl font-medium text-violet-300 hover:underline flex items-center">
              <span className="mr-2" role="img" aria-label="book">📚</span>
              {a.title} ({a.year})
            </a>
            <p className="text-slate-300 mt-1">{a.summary}</p>
            <p className="text-slate-400 text-sm mt-1">Authors: {a.authors}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingPage;
