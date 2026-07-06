# AI Agents Prompts — Practical LLM Guide

> Use LLMs like a daily thinking system, not just a chat box.

A curated knowledge hub and practical guide for prompt engineering, AI agents, RAG, reusable agent workflow patterns, and everyday prompt examples. Built for anyone who uses ChatGPT, Claude, Gemini, or any LLM-powered assistant and wants to go beyond basic chat interactions.

## Features

- **11 pages** covering prompt basics, techniques, agents, RAG, daily prompts, workflows, a prompt library, AI tools comparison, a learning path, and curated links
- **Client-side search** on 5 pages — real-time filtering by keyword
- **Copy-to-clipboard** on every example prompt — ready to use
- **Tab-based prompt library** — 8 categories (Design, Development, Marketing, Education, Analytics, Reasoning, Agents, Study)
- **Tool comparison** — 9 open-source AI coding tools with install commands
- **Dark/Light mode toggle** — persisted in localStorage
- **SEO optimized** — OpenGraph tags, JSON-LD structured data, canonical URL
- **Responsive design** — fixed sidebar on desktop, collapsible on mobile

## Pages

| Route | Content |
|---|---|
| `/` | Home — hero section + feature grid linking to all sections |
| `/basics` | Prompt basics — 4 prompt elements + key settings |
| `/techniques` | 9 prompt techniques (Zero-shot, CoT, ToT, ReAct, etc.) |
| `/agents` | AI agents — 3 pillars (Planning, Tools, Memory) + workflow patterns |
| `/rag` | RAG & Grounding — retrieval-augmented generation explained |
| `/daily` | 6 ready-to-use daily life prompts |
| `/workflows` | 6 agent workflow patterns with examples |
| `/library` | 20+ curated prompts across 8 categories |
| `/tools` | 9 free open-source AI coding tools compared |
| `/learn` | 6-step learning path from basics to advanced |
| `/links` | 21 curated external resources |

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (React Compiler) | Framework / Routing |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **CSS Modules** | Component-scoped styling |
| **CSS Custom Properties** | Light/dark theming |
| **Cloudflare Pages** | Deployment |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build        # Standard Next.js build
npm run pages:build  # Cloudflare Pages build
```

## Deployment

Configured for Cloudflare Pages via `@opennextjs/cloudflare`. The `wrangler.toml` file contains the deployment configuration.

## Credits

Inspired by [DAIR.AI Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide), [Prompting Guide](https://promptingguide.ai/), and [f/prompts.chat](https://github.com/f/prompts).

Built by [Sew-a](https://github.com/Sew-a).
