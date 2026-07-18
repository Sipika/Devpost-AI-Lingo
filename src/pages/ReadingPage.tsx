import React from 'react';
import { Card } from '../components/Card';

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
    <Card className="p-6 space-y-6">
      <div className="p-2 space-y-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 border-b border-white/5 pb-4">
          AI Reading List
        </h2>
        <div className="space-y-4">
          {articles.map((a, idx) => (
            <Card key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-4 glass">
              <div className="flex items-start gap-4">
                <span className="text-4xl p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex-shrink-0" role="img" aria-label="icon">
                  📚
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-violet-200">{a.title} ({a.year})</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{a.summary}</p>
                  <p className="text-slate-400 text-xs font-semibold">Authors: {a.authors}</p>
                </div>
              </div>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button px-5 py-2.5 flex-shrink-0 w-full sm:w-auto text-center"
              >
                Read Paper
              </a>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ReadingPage;
