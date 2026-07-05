'use client';

import { useState, useMemo } from 'react';
import { techniques } from '@/data/techniques';
import { SearchBar } from '@/components/molecules/SearchBar';
import { TechniqueCard } from '@/components/molecules/TechniqueCard';

export default function TechniquesPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return techniques;
    const q = search.toLowerCase();
    return techniques.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.badge.toLowerCase().includes(q) ||
        t.how.some((s) => s.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <>
      <p className="eyebrow">Technique map</p>
      <h2>Prompt engineering patterns that actually change output quality.</h2>
      <p className="subtitle">
        Inspired by DAIR.AI's Prompt Engineering Guide, Prompting Guide, and curated research lists.
      </p>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search techniques..."
      />
      <div className="content-grid">
        {filtered.map((technique, index) => (
          <TechniqueCard key={index} technique={technique} />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
            No techniques match your search.
          </p>
        )}
      </div>
    </>
  );
}