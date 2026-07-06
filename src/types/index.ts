// ============================================================
// Domain Types — Pure data models, no UI dependencies
// ============================================================

export interface Technique {
  title: string;
  badge: string;
  summary: string;
  how: string[];
  example: string;
}

export interface DailyPrompt {
  title: string;
  summary: string;
  prompt: string;
}

export interface AgentWorkflow {
  title: string;
  summary: string;
  steps: string[];
  example: string;
}

export interface LibraryCategory {
  [category: string]: LibraryItem[];
}

export interface LibraryItem {
  title: string;
  use: string;
  prompt: string;
}

export interface LinkItem {
  title: string;
  url: string;
  text: string;
}

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export interface NavSection {
  type: 'section';
  label: string;
}

export interface NavLink {
  type: 'link';
  label: string;
  path: string;
  icon?: string;
}

export type NavItem = NavSection | NavLink;

export interface ThemeContextType {
  theme: 'dark';
  toggleTheme: () => void;
}

// --- New types for expanded content ---

export interface PromptElement {
  name: string;
  description: string;
}

export interface AgentComponent {
  title: string;
  summary: string;
  details: string[];
  icon?: string;
}

export interface RagConcept {
  title: string;
  summary: string;
  steps: string[];
}

export interface HomeFeature {
  title: string;
  summary: string;
  path: string;
  icon: string;
}

export interface FreeAgentTool {
  name: string;
  type: string;
  interface: string;
  license: string;
  selfHosted: string;
  bestFor: string;
  stars: string;
  description: string;
  install?: string;
}