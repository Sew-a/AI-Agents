import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className="eyebrow">Practical AI guide</p>
        <h2>Use LLMs like a daily thinking system, not just a chat box.</h2>
        <p className={styles.subtitle}>
          A curated knowledge hub for prompt engineering, AI agents, reusable patterns,
          and everyday examples you can copy into ChatGPT, Claude, Gemini, or any assistant.
        </p>
        <div className={styles.heroActions}>
          <Link href="/techniques" className="btn btn-primary">
            Start learning
          </Link>
          <Link href="/library" className="btn btn-ghost">
            Open prompt library
          </Link>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <div className={styles.glow} />
        <Image
          src="/hero.avif"
          alt="AI Agents and Prompt Engineering"
          width={600}
          height={420}
          className={styles.heroImage}
          priority
        />
      </div>
    </div>
  );
}
