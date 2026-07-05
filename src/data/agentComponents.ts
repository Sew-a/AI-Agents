import { AgentComponent } from '@/types';

export const agentComponents: AgentComponent[] = [
  {
    title: 'Planning',
    summary: 'Task decomposition via chain-of-thought, self-reflection, and adaptive learning.',
    details: [
      'Break complex tasks into smaller sub-steps',
      'Reflect on past actions and adjust strategy',
      'Adapt based on new information mid-task',
    ],
  },
  {
    title: 'Tools',
    summary: 'Code interpreters, web search, APIs, calculators, and image generation.',
    details: [
      'Access to external tools for real-world data',
      'LLM decides when and how to use each tool',
      'Critical for tasks beyond text generation',
    ],
  },
  {
    title: 'Memory',
    summary: 'Short-term in-context buffer and long-term external vector stores.',
    details: [
      'Short-term: working memory for single-session tasks',
      'Long-term: persist knowledge across sessions',
      'Enables recall and contextual awareness over time',
    ],
  },
];