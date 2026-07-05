import { Card } from '@/components/atoms/Card';
import { Tag } from '@/components/atoms/Tag';
import { AgentWorkflow } from '@/types';

interface AgentWorkflowCardProps {
  workflow: AgentWorkflow;
}

export function AgentWorkflowCard({ workflow }: AgentWorkflowCardProps) {
  return (
    <Card variant="prompt">
      <h3>{workflow.title}</h3>
      <p>{workflow.summary}</p>
      <div>
        {workflow.steps.map((step, i) => (
          <Tag key={i}>{step}</Tag>
        ))}
      </div>
      <pre>
        <code>{workflow.example}</code>
      </pre>
    </Card>
  );
}