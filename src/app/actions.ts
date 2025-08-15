'use server';

import { typingTexts, TextType } from '@/lib/texts';

export async function getNewText(input: { type: TextType }) {
  try {
    const texts = typingTexts[input.type];
    const text = texts[Math.floor(Math.random() * texts.length)];
    return { text: text, error: null };
  } catch (error) {
    console.error('Error getting new text:', error);
    return { text: null, error: 'Failed to get new text. Please try again later.' };
  }
}
