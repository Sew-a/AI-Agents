import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-text">
          &copy; {new Date().getFullYear()} AI Agents Prompts. Built with Next.js.
        </span>
        <div className="footer-links">
          <Link href="/techniques">Techniques</Link>
          <Link href="/daily">Daily Prompts</Link>
          <Link href="/library">Library</Link>
          <Link href="/links">Sources</Link>
          <a
            href="https://github.com/Sew-a/AI-Agents"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}