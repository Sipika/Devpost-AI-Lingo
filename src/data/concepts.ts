export type Concept = {
  id: number;
  name: string;
  icon: string; // emoji or SVG string
  tip: string;
};

export const concepts: Concept[] = [
  {
    id: 0,
    name: 'Bias',
    icon: '⚖️',
    tip: 'Bias can creep into training data; always audit your dataset for representation gaps.',
  },
  {
    id: 1,
    name: 'RAG',
    icon: '📚',
    tip: 'Retrieval‑Augmented Generation combines external knowledge sources with LLMs for up‑to‑date answers.',
  },
  {
    id: 2,
    name: 'Prompt Engineering',
    icon: '🪄',
    tip: 'Craft clear, specific prompts and experiment with few‑shot examples to steer model behavior.',
  },
  {
    id: 3,
    name: 'LLM',
    icon: '🤖',
    tip: 'Large Language Models are powerful but can hallucinate; verify critical facts.',
  },
  {
    id: 4,
    name: 'Fine‑tuning',
    icon: '🔧',
    tip: 'Fine‑tune on domain‑specific data to improve relevance and reduce undesirable outputs.',
  },
];
