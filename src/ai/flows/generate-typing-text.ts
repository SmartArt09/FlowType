'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating random typing texts.
 *
 * The flow takes input specifying the type of text desired (common words, quotes, or code snippets)
 * and returns a generated text suitable for typing practice.
 *
 * @exports generateTypingText - The main function to generate typing text.
 * @exports GenerateTypingTextOutput - The output type for the generated typing text.
 * @exports GenerateTypingTextInput - The input type for the generateTypingText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTypingTextInputSchema = z.object({
  type: z
    .enum(['commonWords', 'quotes', 'codeSnippets'])
    .describe('The type of typing text to generate.'),
});
export type GenerateTypingTextInput = z.infer<typeof GenerateTypingTextInputSchema>;

const GenerateTypingTextOutputSchema = z.object({
  text: z.string().describe('The generated typing text.'),
});
export type GenerateTypingTextOutput = z.infer<typeof GenerateTypingTextOutputSchema>;

export async function generateTypingText(input: GenerateTypingTextInput): Promise<GenerateTypingTextOutput> {
  return generateTypingTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTypingTextPrompt',
  input: {schema: GenerateTypingTextInputSchema},
  output: {schema: GenerateTypingTextOutputSchema},
  prompt: `You are a typing text generator. Generate typing text based on the type requested.

      If the type is commonWords, generate a paragraph of common English words for typing practice.
      If the type is quotes, generate a paragraph of famous quotes for typing practice.
      If the type is codeSnippets, generate a paragraph of code snippets for typing practice.

      Type: {{{type}}}
      `,
});

const generateTypingTextFlow = ai.defineFlow(
  {
    name: 'generateTypingTextFlow',
    inputSchema: GenerateTypingTextInputSchema,
    outputSchema: GenerateTypingTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
