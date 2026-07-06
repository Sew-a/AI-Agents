import { agentWorkflows } from '@/data/agentWorkflows';
import { agentComponents } from '@/data/agentComponents';
import { AgentWorkflowCard } from '@/components/molecules/AgentWorkflowCard';

export default function AgentsPage() {
  return (
    <>
      <p className="eyebrow">AI Agents</p>
      <h2>Beyond text generation — agents that plan, use tools, and remember.</h2>
      <p className="subtitle">
        An agent is an LLM-powered system designed to take actions and solve complex tasks
        autonomously. They go beyond text generation via planning, tool access, and memory.
      </p>

      <h3>The Three Pillars of an Agent</h3>
      <div className="content-grid" style={{ marginBottom: '1.5rem' }}>
        {agentComponents.map((comp, i) => (
          <article key={i} className="card">
            <div className="card-header">
              <span className="badge">{comp.title}</span>
            </div>
            <p className="card-body">{comp.summary}</p>
            <ul style={{ paddingLeft: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {comp.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="content-grid-2" style={{ marginBottom: '1.5rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">Workflow</span>
          </div>
          <p className="card-body">
            A predefined, fixed sequence of LLM/tool calls — deterministic, predictable, easy to debug.
            Use when steps are known in advance.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Agent</span>
          </div>
          <p className="card-body">
            The LLM decides the next step dynamically. More flexible, handles novel tasks.
            Use when the task genuinely requires dynamic decision-making.
          </p>
        </article>
      </div>

      <p className="eyebrow" style={{ marginTop: '2rem' }}>Agent Workflows</p>
      <h3>Practical patterns for agent-like behavior.</h3>
      <div className="content-grid">
        {agentWorkflows.map((workflow, index) => (
          <AgentWorkflowCard key={index} workflow={workflow} />
        ))}
      </div>
    </>
  );
}