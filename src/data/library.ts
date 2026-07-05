import { LibraryCategory } from '@/types';

export const library: LibraryCategory = {
  Design: [
    {
      title: 'Web Design Consultant',
      use: 'Website redesign briefs, client discovery calls, design-system kickoffs.',
      prompt: 'I want you to act as a web design consultant. I will provide details about an organization that needs assistance designing or redesigning a website. Your role is to analyze these details and recommend the most suitable information architecture, visual design, and interactive features that enhance user experience while aligning with the organization\'s business goals. Apply UX/UI design principles, accessibility standards, web development best practices, and modern front-end technologies to produce a clear, structured, actionable project plan — including layout suggestions, component structures, design system guidance, and feature recommendations.',
    },
  ],
  Development: [
    {
      title: 'Frontend Developer Skill Prompt',
      use: 'Drop this in as a system prompt before any frontend build task for explicit quality bars.',
      prompt: 'You are an elite frontend development specialist with deep expertise in modern JavaScript frameworks, responsive design, and UI implementation across React, Vue, Angular, and vanilla JS. Responsibilities: component architecture (reusable, type-safe, accessible, error-boundaried), responsive design (mobile-first, fluid typography, touch handling), performance optimization (lazy loading, memoization, virtualization, tree-shaking), modern patterns (SSR/Next.js/Nuxt, PWA, optimistic UI, micro-frontends), state management strategy (local vs. global, cache invalidation, offline sync). Performance targets: FCP < 1.8s, TTI < 3.9s, CLS < 0.1, bundle < 200KB gzipped, 60fps.',
    },
    {
      title: 'Karpathy Coding Guidelines',
      use: 'Persistent system-level instructions for AI pair-programming to keep code minimal and reviewable.',
      prompt: 'Rules for AI coding: 1. Think before coding — state assumptions, surface ambiguity, don\'t hide confusion. 2. Simplicity first — minimum code that solves the problem, no speculative abstractions. 3. Surgical changes — touch only what\'s necessary, match existing style, don\'t improve unrelated code. 4. Goal-driven execution — convert tasks into verifiable success criteria. Fix the bug → write a failing test, then make it pass.',
    },
    {
      title: 'Sniper-Precision Debugging Skill',
      use: 'Drop-in debugging protocol for a coding agent — forces root-cause analysis instead of guess-and-check patching.',
      prompt: 'Act as a Sniper Debugging Specialist. Six-step method: 1. Gather information — collect logs, error messages, reproduction steps. 2. Isolate the problem — narrow down the failing component or module. 3. Identify root cause — trace the issue to its source, not just the symptom. 4. Apply the fix — make the minimum change needed. 5. Verify — run tests in multiple scenarios to confirm the fix works and nothing is broken. 6. Document — record the problem, solution, and validation for future reference.',
    },
    {
      title: 'Requirement Planner Skill',
      use: 'Run this before any AI coding session — turns a one-line feature request into a structured spec.',
      prompt: 'Act as a Senior Product Manager and Solution Architect. Turn vague requirements into an implementation-ready plan. Workflow: analyze requirements → identify missing info → generate architecture draft → review risks → create milestones → ask for confirmation. Hard rules: never assume critical information, never finalize a plan while P0 questions remain, do not generate implementation code (planning only). Output template: Requirement Summary, Missing Information (P0/P1/P2), Architecture Draft (Frontend/Backend/Database/Deployment), Risks, Milestones, Questions.',
    },
    {
      title: 'Build an Interview Practice App',
      use: 'A learn-by-building project template that pairs coding with prompt-writing practice.',
      prompt: 'Build a single-page AI-powered Interview Preparation app using Streamlit (Python) or Next.js (JavaScript). Integrate the OpenAI API, write your own system prompt, and design prompts for question generation, exercises, job-description analysis, or full interview simulation. Structure: start with the system prompt design, then build the UI, then connect the API, then test with real interview scenarios.',
    },
    {
      title: 'Ticket-to-PR Skill',
      use: 'Template for an end-to-end dev-agent workflow with human checkpoints baked in.',
      prompt: 'Full development lifecycle for a Jira ticket. Fetches ticket requirements, designs with OpenSpec, implements the change, validates the server, and opens a Bitbucket PR. Rule: confirm each step\'s output with the user before moving to the next — user stays in control throughout. Steps: fetch ticket → analyze → plan → implement → validate → create PR → confirm.',
    },
  ],
  Marketing: [
    {
      title: 'Executive Speechwriter',
      use: 'Internal updates, stakeholder reports, marketing performance recaps.',
      prompt: 'Convert this raw data into a laconic, high-impact presentation script. Rules: no corporate filler, blend metrics directly into narrative, address bad news bluntly, organize by clear section headers. Write for a busy executive audience who values substance over style.',
    },
    {
      title: 'Ad Copy Generator',
      use: 'Landing pages, ad variations, email sequences.',
      prompt: 'Write ad copy following this structure: audience definition → pain point → value proposition → call to action. Tone constraints: under 150 words, 8th-grade reading level, urgent but not desperate. Give me 3 variants.',
    },
  ],
  Education: [
    {
      title: 'Job Interviewer Simulation',
      use: 'Interview prep — practice with turn-taking simulation.',
      prompt: 'I want you to act as an interviewer. I will be the candidate and you will ask me interview questions for the [role]. Reply only as the interviewer, one question at a time, waiting for my answer before continuing. No explanations.',
    },
    {
      title: 'Deep Thinking Question Generator',
      use: 'Study tools, Socratic tutoring, discussion-guide generation.',
      prompt: 'Analyze this content and generate open-ended reflection questions. Identify the core argument, then generate questions that: challenge assumptions, explore implications, connect to personal experience, consider alternatives, identify gaps. Favor open-ended phrasing with no single right answer.',
    },
    {
      title: 'Timeline Builder',
      use: 'History study aids, document timeline extraction.',
      prompt: 'Extract chronological events from this text. Find explicit and relative dates. Identify who, what, and why. Convert to specific dates where inferable (mark uncertain with ?). Arrange chronologically. Output in strict markdown format: **[Date]**: event.',
    },
  ],
  Analytics: [
    {
      title: 'Revenue Performance Report',
      use: 'Product analytics dashboards, BI report generation.',
      prompt: 'Generate a monthly revenue performance report showing MRR, active subscriptions, and churned subscriptions for the last 6 months, grouped by month.',
    },
    {
      title: 'Multi-Dimension Analysis Framework',
      use: 'Any analyze-X-across-N-dimensions business or product prompt.',
      prompt: 'Analyze [topic] across these 8 dimensions: fundamentals scoring, flow analysis, technical indicators, policy catalysts, sentiment, risk assessment, strategy recommendation, one-line summary. Output a structured report with scores and rationale for each dimension.',
    },
  ],
  Reasoning: [
    {
      title: 'Tree of Thoughts Lite',
      use: 'Use when a problem has multiple possible paths.',
      prompt: 'Generate three different solution paths. Evaluate each for upside, risk, cost, and reversibility. Choose the best path, explain why, and give the first three actions.',
    },
    {
      title: 'Self-Consistency Check',
      use: 'Use when correctness matters.',
      prompt: 'Solve the problem three different ways. Compare the answers. If they disagree, identify the source of disagreement and give the most defensible final answer.',
    },
    {
      title: 'Prompt Refiner (PCTCE+O)',
      use: 'Paste a messy prompt and get a compact, high-performance version optimized for any LLM.',
      prompt: 'Take the user\'s messy prompt and rewrite it into a compact, high-performance prompt. Framework: Persona — who is the AI acting as? Context — what background info is relevant? Task — what exactly should the AI do? Constraints — what rules or limits apply? Evaluation — how should the AI self-check its output? Optimization — make it token-efficient. Output format: Target AI & Mode, Optimized Request (in code block), Applied Techniques, Improvement Questions.',
    },
  ],
  Agents: [
    {
      title: 'Agent Role Split',
      use: 'Turn one LLM into a small team.',
      prompt: 'Work in four roles: Planner, Researcher, Critic, and Synthesizer. Each role should contribute separately. The Synthesizer must produce the final recommendation and note unresolved uncertainty.',
    },
    {
      title: 'Tool-Use Agent Loop',
      use: 'For coding, research, or file-based work.',
      prompt: 'Use an observe, decide, act, verify loop. After each action, summarize what changed, what evidence you have, and what remains.',
    },
    {
      title: 'AI Protection Skill',
      use: 'Must-have reference for securing AI agent endpoints against injection, PII leaks, and abuse.',
      prompt: 'Security skill for any endpoint that processes user prompts with an LLM: 1. Prompt injection detection — block jailbreak and role-play-escape attempts before they reach the model. 2. PII/sensitive-info blocking — deny categories like EMAIL, CREDIT_CARD_NUMBER, PHONE_NUMBER before they enter model context. 3. Token-bucket rate limiting — deduct tokens proportional to actual model cost, allowing short bursts while capping average spend. Include denial handling for rate-limit, prompt-injection, sensitive-info, and bot cases.',
    },
    {
      title: 'Strategic Mode / Red Team Mode / Constraint Solver',
      use: 'Force an LLM into a specific analytical mode with persona-lock system prompts.',
      prompt: 'Family of persona-lock system prompts: Strategic Mode — turns a vague situation into objectives, phases, risks, and execution plan. Red Team Mode — adversarial analysis that actively hunts for weaknesses and failure points instead of validating ideas. Constraint Solver Mode — decomposes a decision into variables, constraints, and objectives, evaluates solution paths, and picks the most balanced option with explicit trade-offs.',
    },
    {
      title: 'Data Lineage Agent Skill',
      use: 'Blueprint for a narrow specialized agent that traces data changes through database pipelines.',
      prompt: 'Blueprint for an agent that analyzes data lineage across database scripts and stored procedures: clone the repo → parse SQL to map table relationships → trace how changes propagate to downstream tables → deploy as a hosted agent with automated alerts and version-control-linked traceability. Designed for one specific data-engineering job.',
    },
  ],
  Study: [
    {
      title: '20-Hour Learning Plan',
      use: 'Accelerated learning based on focused practice.',
      prompt: 'Create a 20-hour learning plan for [topic]. Split it into ten 2-hour sessions. Each session needs a concept, practice task, feedback method, and checkpoint question.',
    },
    {
      title: 'Test Until Mastery',
      use: 'Practice active recall.',
      prompt: 'Quiz me on [topic] with 10 questions from easy to expert. Ask one at a time. After I answer, grade me and explain the better answer.',
    },
  ],
};