import type { Metadata } from 'next';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Footer } from '@/components/organisms/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AI Agents Prompts | Practical LLM Guide',
  description:
    'AI Agents Prompts is a practical guide to LLM prompting, daily AI workflows, agent patterns, Tree of Thoughts, prompt contracts, and useful prompt libraries.',
  openGraph: {
    title: 'AI Agents Prompts',
    description:
      'Useful AI, LLM, and prompt engineering examples for daily life and agent workflows.',
    type: 'website',
    url: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AI Agents Prompts',
              description:
                'A practical guide for using AI, LLMs, prompts, and agent workflows in daily life.',
              inLanguage: 'en',
            }),
          }}
        />
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