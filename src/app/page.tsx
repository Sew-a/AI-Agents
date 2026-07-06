import type { Metadata } from 'next';
import Link from 'next/link';
import { homeFeatures } from '@/data/homeFeatures';
import { Hero } from '@/components/organisms/Hero';

export const metadata: Metadata = {
  title: 'AI Agents Prompts | Practical LLM Guide',
  description:
    'A curated knowledge hub for prompt engineering, AI agents, RAG, reusable patterns, and everyday examples you can copy into ChatGPT, Claude, Gemini, or any assistant.',
  openGraph: {
    title: 'AI Agents Prompts | Practical LLM Guide',
    description:
      'A curated knowledge hub for prompt engineering, AI agents, RAG, reusable patterns, and everyday examples.',
    images: [{ url: '/hero.avif', width: 1200, height: 630, alt: 'AI Agents Prompts' }],
  },
};

const openSourceRepos = [
  { name: 'n8n', desc: 'Workflow automation for technical people. Connect any app, run any action.', url: 'https://github.com/n8n-io/n8n', stars: '54k+' },
  { name: 'Appflowy', desc: 'Open-source Notion alternative. AI-native workspace with collaborative docs.', url: 'https://github.com/AppFlowy-IO/AppFlowy', stars: '60k+' },
  { name: 'Ollama', desc: 'Run LLMs locally. Llama 3, Mistral, Gemma, and 100+ models with one command.', url: 'https://github.com/ollama/ollama', stars: '130k+' },
  { name: 'Fooocus', desc: 'AI image generation with simplicity. Offline, free, and prompt-focused.', url: 'https://github.com/lllyasviel/Fooocus', stars: '44k+' },
  { name: 'Whisper', desc: 'OpenAI\'s general-purpose speech recognition model. Multilingual, robust.', url: 'https://github.com/openai/whisper', stars: '78k+' },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="feature-grid">
        {homeFeatures.map((feature, i) => (
          <Link key={i} href={feature.path} className="feature-card-link">
            <article className="card feature-card">
              <div className="card-header">
                <span className="feature-icon">{feature.icon}</span>
                <span className="badge">{feature.path.replace('/', '')}</span>
              </div>
              <h3>{feature.title}</h3>
              <p className="card-body">{feature.summary}</p>
            </article>
          </Link>
        ))}
      </div>

      <section className="site-summary">
        <p className="eyebrow">Open Source AI Tools</p>
        <h3>Self-host the best open-source AI infrastructure.</h3>
        <p className="subtitle">
          Production-ready repos for automation, document collaboration, local LLMs,
          image generation, and speech recognition — all free to self-host.
        </p>
        <div className="content-grid">
          {openSourceRepos.map((repo) => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="feature-card-link">
              <article className="card feature-card">
                <div className="card-header">
                  <span className="badge" style={{ fontSize: '0.85rem', textTransform: 'lowercase', fontFamily: 'var(--font-mono)' }}>{repo.name}</span>
                  <span className="tag">{repo.stars} stars</span>
                </div>
                <p className="card-body">{repo.desc}</p>
              </article>
            </a>
          ))}
        </div>
      </section>

      <section className="site-summary">
        <p className="eyebrow">What you'll find here</p>
        <h3>A complete guide to working with AI, LLMs, and prompt engineering.</h3>
        <div className="summary-grid">
          <div className="summary-block">
            <h4>Learn</h4>
            <ul>
              <li><Link href="/basics"><strong>Prompt Basics</strong></Link> — The four elements of a prompt (instruction, context, input data, output format) and key settings like temperature and top-p.</li>
              <li><Link href="/techniques"><strong>Prompt Techniques</strong></Link> — Nine essential patterns: zero-shot, few-shot, chain-of-thought, meta prompting, self-consistency, tree of thoughts, prompt chaining, ReAct, and reflexion. Each with copyable examples.</li>
              <li><Link href="/agents"><strong>AI Agents</strong></Link> — The three pillars of agent systems: planning, tools, and memory. Understand how agents differ from workflows and when to use each.</li>
              <li><Link href="/rag"><strong>RAG & Grounding</strong></Link> — Retrieval-Augmented Generation explained: how to ground LLMs in external knowledge for factual accuracy.</li>
            </ul>
          </div>
          <div className="summary-block">
            <h4>Use</h4>
            <ul>
              <li><Link href="/daily"><strong>Daily Life Prompts</strong></Link> — Ready-to-use prompts for planning, learning, writing, decision-making, document summarization, and interview practice.</li>
              <li><Link href="/workflows"><strong>Agent Workflows</strong></Link> — Six practical workflow patterns: prompt contracts, planner-builder-reviewer, agent chatrooms, self-modifying rules, stochastic consensus, and verification loops.</li>
              <li><Link href="/library"><strong>Prompt Library</strong></Link> — Browse categorized prompt examples across 8 categories: Design, Development, Marketing, Education, Analytics, Reasoning, Agents, and Study.</li>
            </ul>
          </div>
          <div className="summary-block">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/learn"><strong>Learning Path</strong></Link> — A structured 6-step path from LLM basics to context engineering, with common pitfalls and success metrics.</li>
              <li><Link href="/links"><strong>Links & Sources</strong></Link> — Curated references to DAIR.AI's Prompt Engineering Guide, prompts.chat, and other essential resources.</li>
              <li><strong>Search</strong> — Every content page includes a search bar to filter techniques, prompts, and workflows by keyword.</li>
              <li><strong>Dark/Light Mode</strong> — Toggle between themes using the button in the sidebar header.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
