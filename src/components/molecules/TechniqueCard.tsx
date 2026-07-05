import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { CopyButton } from '@/components/molecules/CopyButton';
import { Technique } from '@/types';

interface TechniqueCardProps {
  technique: Technique;
}

export function TechniqueCard({ technique }: TechniqueCardProps) {
  return (
    <Card variant="prompt">
      <Badge>{technique.badge}</Badge>
      <h3>{technique.title}</h3>
      <p>{technique.summary}</p>
      <ul>
        {technique.how.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
      <pre>
        <code>{technique.example}</code>
      </pre>
      <CopyButton text={technique.example} label="Copy example" />
    </Card>
  );
}