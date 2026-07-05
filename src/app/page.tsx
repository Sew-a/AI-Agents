import Link from 'next/link';
import { homeFeatures } from '@/data/homeFeatures';

export default function HomePage() {
  return (
    <>
      <div className="page-header">
        <p className="eyebrow">Practical AI guide</p>
        <h2>Use LLMs like a daily thinking system, not just a chat box.</h2>
        <p className="subtitle">
          A curated knowledge hub for prompt engineering, AI agents, RAG, reusable patterns,
          and everyday examples you can copy into ChatGPT, Claude, Gemini, or any assistant.
        </p>
      </div>

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