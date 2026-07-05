import { DailyPrompt } from '@/types';

export const dailyPrompts: DailyPrompt[] = [
  {
    title: 'Personal planner',
    summary: 'Turn messy goals into a realistic day plan.',
    prompt: 'Act as my planning partner. Ask up to 3 clarifying questions if needed, then create a realistic plan for today with time blocks, priority order, and one fallback plan if I lose focus.',
  },
  {
    title: 'Learning coach',
    summary: 'Use the 80/20 rule to learn a topic faster.',
    prompt: 'Teach me [topic]. Identify the 20% of concepts that create 80% of practical ability. Give me a 7-day plan, daily exercises, and a quick test for each day.',
  },
  {
    title: 'Decision helper',
    summary: 'Compare options without getting a generic answer.',
    prompt: 'Help me decide between [option A] and [option B]. Use my priorities: [priorities]. Make a comparison table, hidden risks, best choice for short term, best choice for long term, and your final recommendation.',
  },
  {
    title: 'Writing editor',
    summary: 'Improve clarity while keeping your voice.',
    prompt: 'Rewrite this message to be clearer, warmer, and shorter. Keep my meaning and tone. Give me 3 versions: direct, friendly, and professional.',
  },
  {
    title: 'Document summarizer',
    summary: 'Extract decisions, risks, and actions from long text.',
    prompt: 'Summarize the document below into: key ideas, decisions, open questions, risks, and action items. Quote only short phrases when necessary.',
  },
  {
    title: 'Interview practice',
    summary: 'Practice with feedback instead of passive answers.',
    prompt: 'Act as an interviewer for [role]. Ask one question at a time. After each answer, score it, explain what was missing, and show a stronger answer structure.',
  },
];