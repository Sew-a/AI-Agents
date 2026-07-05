'use client';

import { useState, useMemo } from 'react';
import { library } from '@/data/library';
import { SearchBar } from '@/components/molecules/SearchBar';
import { LibraryItemCard } from '@/components/molecules/LibraryItemCard';

export default function LibraryPage() {
  const categories = Object.keys(library);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');

  const items = library[activeCategory] || [];

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.use.toLowerCase().includes(q) ||
        item.prompt.toLowerCase().includes(q)
    );
  }, [search, items]);

  return (
    <>
      <p className="eyebrow">Copy and adapt</p>
      <h2>Prompt library with tab-style examples.</h2>
      <p className="subtitle">
        Switch between prompt categories and open a concrete example.
      </p>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search library prompts..."
      />
      <div className="tab-switcher" role="tablist" aria-label="Prompt library categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`switch-btn ${category === activeCategory ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category);
              setSearch('');
            }}
            role="tab"
            aria-selected={category === activeCategory}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="library-panel">
        {filtered.map((item, index) => (
          <LibraryItemCard key={index} item={item} />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>
            No items match your search in this category.
          </p>
        )}
      </div>
    </>
  );
}