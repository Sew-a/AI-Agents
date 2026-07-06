import type { Metadata } from 'next';
import { agentWorkflows } from '@/data/agentWorkflows';
import { AgentWorkflowCard } from '@/components/molecules/AgentWorkflowCard';

export const metadata: Metadata = {
  title: 'Agent Workflows',
  description:
    'Six practical workflow patterns: prompt contracts, planner-builder-reviewer, agent chatrooms, self-modifying rules, stochastic consensus, and verification loops.',
};

export default function WorkflowsPage() {
  return (
    <>
      <p className="eyebrow">Agent Workflows</p>
      <h2>Practical patterns for agent-like behavior.</h2>
      <p className="subtitle">
        Workflows are predefined sequences of LLM/tool calls. They are deterministic,
        predictable, and easy to debug. Start with a workflow; upgrade to an agent
        only when the task requires dynamic decision-making.
      </p>

      <div className="content-grid-2" style={{ marginBottom: '1.5rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">Workflow</span>
          </div>
          <p className="card-body">
            Fixed sequence of steps known in advance. Predictable, debuggable.
            Best for routine tasks where the process is well-understood.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Context Engineering</span>
          </div>
          <p className="card-body">
            Designing everything that shapes agent behavior: system prompts, task constraints,
            tool descriptions, memory management, and error handling.
          </p>
        </article>
      </div>

      <div className="content-grid">
        {agentWorkflows.map((workflow, index) => (
          <AgentWorkflowCard key={index} workflow={workflow} />
        ))}
      </div>
    </>
  );
}
