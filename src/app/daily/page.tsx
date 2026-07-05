'use client';

import { useState, useMemo } from 'react';
import { dailyPrompts } from '@/data/dailyPrompts';
import { SearchBar } from '@/components/molecules/SearchBar';
import { DailyPromptCard } from '@/components/molecules/DailyPromptCard';

export default function DailyPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return dailyPrompts;
    const q = search.toLowerCase();
    return dailyPrompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <>
      <p className="eyebrow">Everyday use</p>
      <h2>Daily life prompt recipes.</h2>
      <p className="subtitle">
        These examples are designed for normal work and study: short enough to use immediately, structured enough to get reliable answers.
      </p>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search daily prompts..."
      />
      <div className="content-grid">
        {filtered.map((prompt, index) => (
          <DailyPromptCard key={index} prompt={prompt} />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
            No prompts match your search.
          </p>
        )}
      </div>
    </>
  );
}