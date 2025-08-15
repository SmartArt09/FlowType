'use server';

/**
 * @fileOverview Generates a social media post for sharing typing test results.
 *
 * - generateSocialPost - A function that generates the social media post.
 * - GenerateSocialPostInput - The input type for the generateSocialPost function.
 * - GenerateSocialPostOutput - The return type for the generateSocialPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialPostInputSchema = z.object({
  wpm: z.number().describe('The user\'s typing speed in words per minute.'),
  accuracy: z.number().describe('The user\'s typing accuracy as a percentage.'),
  mistakes: z.number().describe('The number of mistakes the user made.'),
});
export type GenerateSocialPostInput = z.infer<typeof GenerateSocialPostInputSchema>;

const GenerateSocialPostOutputSchema = z.object({
  post: z.string().describe('The generated social media post text.'),
});
export type GenerateSocialPostOutput = z.infer<typeof GenerateSocialPostOutputSchema>;

export async function generateSocialPost(input: GenerateSocialPostInput): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: GenerateSocialPostInputSchema},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `Write a social media post to share typing test results.

Include the following information:
* WPM: {{{wpm}}}
* Accuracy: {{{accuracy}}}%
* Mistakes: {{{mistakes}}}

Make the post engaging and encourage others to try the typing test. Keep it under 280 characters.`,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
