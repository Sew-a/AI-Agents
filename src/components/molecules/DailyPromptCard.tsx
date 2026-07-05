import { Card } from '@/components/atoms/Card';
import { CopyButton } from '@/components/molecules/CopyButton';
import { DailyPrompt } from '@/types';

interface DailyPromptCardProps {
  prompt: DailyPrompt;
}

export function DailyPromptCard({ prompt }: DailyPromptCardProps) {
  return (
    <Card variant="prompt">
      <h3>{prompt.title}</h3>
      <p>{prompt.summary}</p>
      <pre>
        <code>{prompt.prompt}</code>
      </pre>
      <CopyButton text={prompt.prompt} label="Copy prompt" />
    </Card>
  );
}