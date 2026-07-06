import type { Metadata } from 'next';
import { promptElements } from '@/data/promptElements';

export const metadata: Metadata = {
  title: 'Prompt Basics',
  description:
    'Learn the four elements of a prompt: instruction, context, input data, and output format. Understand key settings like temperature and top-p for better LLM outputs.',
};

export default function BasicsPage() {
  return (
    <>
      <p className="eyebrow">LLM Basics</p>
      <h2>What makes up a prompt.</h2>
      <p className="subtitle">
        A prompt is composed of up to four elements. You don't need all four every time,
        but understanding them helps you write better prompts.
      </p>

      <div className="content-grid-2">
        {promptElements.map((el, i) => (
          <article key={i} className="card">
            <div className="card-header">
              <span className="badge">{el.name}</span>
            </div>
            <p className="card-body">{el.description}</p>
          </article>
        ))}
      </div>

      <h3 style={{ marginTop: '2rem' }}>Example</h3>
      <pre>
        <code>{`Classify the text into neutral, negative, or positive.
Text: I think the food was okay.
Sentiment:`}</code>
      </pre>
      <p className="card-body" style={{ marginTop: '0.5rem' }}>
        Here, &ldquo;Classify...&rdquo; = instruction, the food line = input data,
        &ldquo;Sentiment:&rdquo; = output indicator.
      </p>

      <h3 style={{ marginTop: '2rem' }}>Key Settings</h3>
      <div className="content-grid-2" style={{ marginTop: '0.75rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">Temperature</span>
          </div>
          <p className="card-body">
            Controls randomness. Lower values (0-0.3) for factual/consistent outputs.
            Higher values (0.7-1.0) for creative/varied responses.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Top-P</span>
          </div>
          <p className="card-body">
            Nucleus sampling. Controls the cumulative probability threshold.
            0.1 means only the top 10% likely tokens are considered.
          </p>
        </article>
      </div>
    </>
  );
}
