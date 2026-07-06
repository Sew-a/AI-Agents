import { dailyPrompts } from '@/data/dailyPrompts';
import { DailyPromptCard } from '@/components/molecules/DailyPromptCard';

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