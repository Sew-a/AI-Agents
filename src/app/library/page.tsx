'use client';

import { useState } from 'react';
import { library } from '@/data/library';
import { LibraryItemCard } from '@/components/molecules/LibraryItemCard';

export default function LibraryPage() {
  const categories = Object.keys(library);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const items = library[activeCategory] || [];

  return (
    <>
      <p className="eyebrow">Copy and adapt</p>
      <h2>Prompt library with tab-style examples.</h2>
      <p className="subtitle">
        Switch between prompt categories and open a concrete example.
      </p>
      <div className="tab-switcher" role="tablist" aria-label="Prompt library categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`switch-btn ${category === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            role="tab"
            aria-selected={category === activeCategory}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="library-panel">
        {items.map((item, index) => (
          <LibraryItemCard key={index} item={item} />
        ))}
      </div>
    </>
  );
}