'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/data/navigation';
import { NavLink } from '@/types';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} aria-label="Primary navigation">
      <div className={styles.sidebarHeader}>
        <Link href="/" className={styles.brand}>
          <div>
            <span className={styles.brandTitle}>AI Agents</span>
            <span className={styles.brandSubtitle}>Prompts & Workflows</span>
          </div>
        </Link>
      </div>

      <ul className={styles.navList}>
        {navigationItems.map((item, index) => {
          if (item.type === 'section') {
            return (
              <li key={index} className={styles.navSection}>
                {item.label}
              </li>
            );
          }
          const link = item as NavLink;
          const isActive = pathname === link.path;
          return (
            <li key={index}>
              <Link
                href={link.path}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}