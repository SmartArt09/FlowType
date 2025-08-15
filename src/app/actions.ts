'use server';

import { generateTypingText, GenerateTypingTextInput } from "@/ai/flows/generate-typing-text";
import { generateSocialPost, GenerateSocialPostInput } from "@/ai/flows/generate-social-post";

export async function getNewText(input: GenerateTypingTextInput) {
  try {
    const result = await generateTypingText(input);
    return { text: result.text, error: null };
  } catch (error) {
    console.error('Error generating new text:', error);
    return { text: null, error: 'Failed to generate new text. Please try again later.' };
  }
}

export async function getSocialPostText(input: GenerateSocialPostInput) {
    try {
      const result = await generateSocialPost(input);
      return { post: result.post, error: null };
    } catch (error) {
      console.error('Error generating social post:', error);
      return { post: null, error: 'Failed to generate social post. Please try again later.' };
    }
}
