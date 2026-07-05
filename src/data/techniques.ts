import { Technique } from '@/types';

export const techniques: Technique[] = [
  {
    title: 'Zero-shot prompting',
    badge: 'Fast',
    summary: 'Ask directly when the task is simple and the model already knows the format.',
    how: ['Give the task', 'Add relevant context', 'Specify the output shape'],
    example: 'Summarize this email in 3 bullets. Then list the one action I should take today.',
  },
  {
    title: 'Few-shot prompting',
    badge: 'Consistent',
    summary: 'Show two or three examples so the model copies your style, structure, and quality bar.',
    how: ['Provide input/output examples', 'Keep examples close to the real task', 'Ask for the next answer in the same pattern'],
    example: 'Example: messy note -> clear task. Now convert my next 8 notes into clear tasks with owner, deadline, and risk.',
  },
  {
    title: 'Chain-of-Thought (CoT)',
    badge: 'Reasoning',
    summary: 'Ask the model to reason step-by-step before answering. Dramatically improves multi-step math, logic, and planning tasks.',
    how: ['Ask it to break the problem into steps', 'Have it show intermediate reasoning', 'Request a concise final answer after the chain'],
    example: 'Solve this step by step. After your reasoning, give the final answer in a boxed format: [ANSWER] 42 [/ANSWER].',
  },
  {
    title: 'Meta Prompting',
    badge: 'Advanced',
    summary: 'Prompt the model to generate or optimize its own prompts. Useful for refining vague requests into precise instructions.',
    how: ['Describe the high-level goal', 'Ask the model to write a detailed prompt for that goal', 'Iterate on the output'],
    example: 'I need to analyze customer feedback. Write me a detailed prompt I can use with any LLM to get structured sentiment analysis with quotes, trends, and recommendations.',
  },
  {
    title: 'Self-Consistency',
    badge: 'Reliable',
    summary: 'Sample multiple reasoning paths for the same problem, then take the majority answer. Reduces variance in CoT outputs.',
    how: ['Ask for 3-5 independent solutions', 'Compare the answers', 'Pick the most common or most defensible result'],
    example: 'Solve this math problem three different ways. Compare answers. If they disagree, show why and give the most reliable final answer.',
  },
  {
    title: 'Tree of Thoughts',
    badge: 'Complex',
    summary: 'For strategic problems, generate several candidate paths, evaluate each, and keep the strongest path.',
    how: ['Generate 3 approaches', 'Score them against criteria', 'Select or combine the best', 'Backtrack if the chosen path fails'],
    example: 'Create three possible study plans for learning React. Score each by speed, depth, and project usefulness. Pick the best hybrid.',
  },
  {
    title: 'Prompt chaining',
    badge: 'Reliable',
    summary: 'Split a big task into smaller prompts where each output becomes input for the next step.',
    how: ['Extract facts', 'Organize facts', 'Draft output', 'Review and improve'],
    example: 'Step 1: extract requirements from this text. Step 2: turn them into acceptance criteria. Step 3: draft the implementation plan.',
  },
  {
    title: 'ReAct (Reason + Act)',
    badge: 'Agentic',
    summary: 'Interleave reasoning ("thought") with actions ("tool calls"). The standard pattern for AI agents that use tools.',
    how: ['Define available tools', 'Ask for observe-decide-act loops', 'Require result verification'],
    example: 'Use tools only when needed. After every tool result, state what changed and what you will do next.',
  },
  {
    title: 'Reflexion',
    badge: 'Agentic',
    summary: 'Agent critiques its own past attempt and retries with feedback. Self-improving loop without human intervention.',
    how: ['Attempt the task', 'Evaluate the output against criteria', 'Identify specific failures', 'Retry with improvements noted'],
    example: 'Attempt this task. Then evaluate your output against these 5 criteria. List what you missed. Then try again fixing those gaps.',
  },
];