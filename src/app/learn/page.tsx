import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learning Path',
  description:
    'A structured 6-step path from LLM basics to context engineering, with common pitfalls and success metrics for mastering prompt engineering and AI agents.',
};

const pathSteps = [
  { step: 1, title: 'LLM Basics', desc: 'Understand prompt elements, temperature, and top-p settings.', path: '/basics' },
  { step: 2, title: 'Prompt Techniques', desc: 'From zero-shot to Reflexion — nine essential patterns.', path: '/techniques' },
  { step: 3, title: 'RAG & Grounding', desc: 'Ground LLMs in external knowledge with retrieval-augmented generation.', path: '/rag' },
  { step: 4, title: 'AI Agents', desc: 'Planning, tools, memory — the three pillars of agent systems.', path: '/agents' },
  { step: 5, title: 'Context Engineering', desc: 'Design system prompts, tool descriptions, and error handling.', path: '/workflows' },
  { step: 6, title: 'Workflows vs Agents', desc: 'Choose the right architecture: deterministic or dynamic.', path: '/workflows' },
];

export default function LearnPage() {
  return (
    <>
      <p className="eyebrow">Learning Path</p>
      <h2>From LLM basics to context engineering.</h2>
      <p className="subtitle">
        A recommended sequence for learning prompt engineering, RAG, agents, and
        the practical discipline of making AI systems reliable.
      </p>

      <div className="learn-path">
        {pathSteps.map((s) => (
          <Link key={s.step} href={s.path} className="card learn-step">
            <div className="card-header">
              <span className="badge">Step {s.step}</span>
            </div>
            <h3>{s.title}</h3>
            <p className="card-body">{s.desc}</p>
          </Link>
        ))}
      </div>

      <div className="content-grid-2" style={{ marginTop: '2rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">Common Pitfalls</span>
          </div>
          <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--text-muted)' }}>Pitfall</th>
                <th style={{ textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--text-muted)' }}>Example</th>
                <th style={{ textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--text-muted)' }}>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.4rem 0.5rem', fontWeight: 600 }}>Over-constraint</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>&ldquo;NEVER skip a task. ALWAYS do 3 searches.&rdquo;</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>Give principles + reasoning room</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.4rem 0.5rem', fontWeight: 600 }}>Under-specification</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>&ldquo;Do some research and create a report.&rdquo;</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>Numbered steps + defined output sections</td>
              </tr>
              <tr>
                <td style={{ padding: '0.4rem 0.5rem', fontWeight: 600 }}>Ignoring error cases</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>(silence on failure)</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>Explicit retry/escalation rules</td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Success Metrics</span>
          </div>
          <ul style={{ paddingLeft: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <li>Task completion rate</li>
            <li>Behavioral consistency</li>
            <li>Error rate</li>
            <li>User satisfaction</li>
            <li>Debugging time</li>
          </ul>
        </article>
      </div>
    </>
  );
}
