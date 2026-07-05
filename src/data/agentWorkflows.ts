import { AgentWorkflow } from '@/types';

export const agentWorkflows: AgentWorkflow[] = [
  {
    title: 'Prompt contract',
    summary: 'Define success before asking the model to work.',
    steps: ['Goal', 'Constraints', 'Output format', 'Failure conditions', 'Verification checklist'],
    example: 'GOAL: create a weekly study plan. CONSTRAINTS: 45 minutes/day, beginner level. FORMAT: table. FAILURE: no review day, no practice tasks, or vague resources.',
  },
  {
    title: 'Planner -> Builder -> Reviewer',
    summary: 'Separate creative planning from implementation and critique.',
    steps: ['Planner writes a spec', 'Builder executes', 'Reviewer checks against acceptance criteria', 'Builder resolves issues'],
    example: 'Ask one model to write the plan, another to implement, and a fresh reviewer to find missing edge cases.',
  },
  {
    title: 'Agent chatroom',
    summary: 'Have multiple roles debate before choosing a direction.',
    steps: ['Architect proposes', 'Pragmatist simplifies', 'Critic finds risks', 'Synthesizer decides'],
    example: 'Debate whether I should build a Flutter app or static site for this content hub. Require each role to challenge one assumption.',
  },
  {
    title: 'Self-modifying rules',
    summary: 'Keep a running rules section when the model repeatedly makes mistakes.',
    steps: ['Notice correction', 'Add a short rule', 'Check rules before future work', 'Prefer newer rules when conflicts appear'],
    example: 'Rule: Always include exact source links in research summaries because unsupported claims are not useful.',
  },
  {
    title: 'Stochastic consensus',
    summary: 'Ask several independent runs and compare overlap.',
    steps: ['Run 5-10 variants', 'Find consensus', 'List disagreements', 'Inspect outliers', 'Make final decision'],
    example: 'Ask 7 agents to rank my startup ideas. Keep ideas that appear in the top 3 at least 5 times.',
  },
  {
    title: 'Verification loop',
    summary: 'Make the model prove that the output meets the prompt.',
    steps: ['Restate requirements', 'Check each requirement', 'List evidence', 'Fix gaps', 'Deliver final'],
    example: 'Before final answer, produce a checklist showing where every requirement was satisfied.',
  },
];