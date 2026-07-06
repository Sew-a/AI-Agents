import type { Metadata } from 'next';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Footer } from '@/components/organisms/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-agents.example.com'
  ),
  title: {
    default: 'AI Agents Prompts | Practical LLM Guide',
    template: '%s | AI Agents Prompts',
  },
  description:
    'AI Agents Prompts is a practical guide to LLM prompting, daily AI workflows, agent patterns, Tree of Thoughts, prompt contracts, and useful prompt libraries.',
  openGraph: {
    title: 'AI Agents Prompts',
    description:
      'Useful AI, LLM, and prompt engineering examples for daily life and agent workflows.',
    type: 'website',
    url: '/',
    siteName: 'AI Agents Prompts',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Agents Prompts',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="theme-color" content="#0f0f1a" />
      </head>
      <body>
        <ThemeProvider>
          <div className="app-layout">
            <Sidebar />
            <main className="main" id="main">
              <div className="page-content">{children}</div>
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}