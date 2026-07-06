import { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  { type: 'link', label: 'Home', path: '/' },
  { type: 'section', label: 'Learn' },
  { type: 'link', label: 'Prompt Basics', path: '/basics' },
  { type: 'link', label: 'Prompt Techniques', path: '/techniques' },
  { type: 'link', label: 'AI Agents', path: '/agents' },
  { type: 'link', label: 'RAG & Grounding', path: '/rag' },
  { type: 'section', label: 'Use' },
  { type: 'link', label: 'Daily Life Prompts', path: '/daily' },
  { type: 'link', label: 'Agent Workflows', path: '/workflows' },
  { type: 'link', label: 'Prompt Library', path: '/library' },
  { type: 'section', label: 'Resources' },
  { type: 'link', label: 'Free AI Tools', path: '/tools' },
  { type: 'link', label: 'Learning Path', path: '/learn' },
  { type: 'link', label: 'Links', path: '/links' },
];