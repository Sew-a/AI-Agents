'use client';

import { useState, useMemo } from 'react';
import { agentWorkflows } from '@/data/agentWorkflows';
import { SearchBar } from '@/components/molecules/SearchBar';
import { AgentWorkflowCard } from '@/components/molecules/AgentWorkflowCard';

export default function WorkflowsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return agentWorkflows;
    const q = search.toLowerCase();
    return agentWorkflows.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.summary.toLowerCase().includes(q) ||
        w.steps.some((s) => s.toLowerCase().includes(q))
    );
  }, [search]);

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

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search workflow patterns..."
      />
      <div className="content-grid">
        {filtered.map((workflow, index) => (
          <AgentWorkflowCard key={index} workflow={workflow} />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
            No workflows match your search.
          </p>
        )}
      </div>
    </>
  );
}