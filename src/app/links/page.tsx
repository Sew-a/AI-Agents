import type { Metadata } from 'next';
import { links } from '@/data/links';

export const metadata: Metadata = {
  title: 'Links & Sources',
  description:
    'Curated references to DAIR.AI\'s Prompt Engineering Guide, prompts.chat, Lil\'Log, and other essential AI and prompt engineering resources.',
};

export default function LinksPage() {
  return (
    <>
      <p className="eyebrow">Sources</p>
      <h2>Links and thanks.</h2>
      <p className="subtitle">
        I am thankful to these repositories, sites, authors, and contributors. This page is a learning guide that points users back to the original resources.
      </p>
      <div className="content-grid">
        {links.map((link, index) => (
          <article key={index} className="card source-card">
            <h3>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </h3>
            <p className="card-body">{link.text}</p>
            <div className="card-footer">
              <a
                className="btn btn-ghost btn-sm"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open source &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
