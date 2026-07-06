import { techniques } from '@/data/techniques';
import { TechniqueCard } from '@/components/molecules/TechniqueCard';

export default function TechniquesPage() {
  return (
    <>
      <p className="eyebrow">Technique map</p>
      <h2>Prompt engineering patterns that actually change output quality.</h2>
      <p className="subtitle">
        Inspired by DAIR.AI's Prompt Engineering Guide, Prompting Guide, and curated research lists.
      </p>
      <div className="content-grid">
        {techniques.map((technique, index) => (
          <TechniqueCard key={index} technique={technique} />
        ))}
      </div>
    </>
  );
}