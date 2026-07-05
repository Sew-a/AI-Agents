import { Card } from '@/components/atoms/Card';
import styles from './FeatureCards.module.css';

const features = [
  {
    index: '01',
    title: 'Prompt better',
    text: 'Use clear goals, context, examples, constraints, output format, and verification. This site turns those ideas into copyable patterns.',
  },
  {
    index: '02',
    title: 'Think with agents',
    text: 'Break hard work into planner, researcher, builder, reviewer, and resolver roles so a single LLM does not have to do every job at once.',
  },
  {
    index: '03',
    title: 'Apply daily',
    text: 'Plan study sessions, summarize documents, compare products, practice interviews, write better messages, and build learning routines.',
  },
];

export function FeatureCards() {
  return (
    <div className={styles.grid}>
      {features.map((f) => (
        <Card key={f.index} variant="feature">
          <span className={styles.index}>{f.index}</span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </Card>
      ))}
    </div>
  );
}