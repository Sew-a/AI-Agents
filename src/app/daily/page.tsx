import type { Metadata } from 'next';
import { dailyPrompts } from '@/data/dailyPrompts';
import { DailyPromptCard } from '@/components/molecules/DailyPromptCard';

export const metadata: Metadata = {
  title: 'Daily Life Prompts',
  description:
    'Ready-to-use AI prompts for planning, learning, writing, decision-making, document summarization, and interview practice. Short enough to use immediately.',
};

export default function DailyPage() {
  return (
    <>
      <p className="eyebrow">Everyday use</p>
      <h2>Daily life prompt recipes.</h2>
      <p className="subtitle">
        These examples are designed for normal work and study: short enough to use immediately, structured enough to get reliable answers.
      </p>
      <div className="content-grid">
        {dailyPrompts.map((prompt, index) => (
          <DailyPromptCard key={index} prompt={prompt} />
        ))}
      </div>
    </>
  );
}
