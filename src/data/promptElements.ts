import { PromptElement } from '@/types';

export const promptElements: PromptElement[] = [
  {
    name: 'Instruction',
    description: 'The specific task you want the model to perform. Be clear and direct.',
  },
  {
    name: 'Context',
    description: 'External or background information that steers the model toward better responses.',
  },
  {
    name: 'Input Data',
    description: 'The actual question, text, or content you want the model to process.',
  },
  {
    name: 'Output Indicator',
    description: 'The desired format or type of output (JSON, table, bullet list, etc.).',
  },
];