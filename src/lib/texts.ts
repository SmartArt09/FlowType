
export type TextType = 'commonWords' | 'quotes' | 'codeSnippets';

export const typingTexts: Record<TextType, string[]> = {
  commonWords: [
    'The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet. Practice it to improve your typing speed and accuracy. The journey of a thousand miles begins with a single step. Keep practicing.',
    'Hello world, this is a test of your typing skills. The rain in Spain falls mainly on the plain. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood? A proper copper coffee pot.',
    'Many people feel that the best way to learn is by doing. The early bird catches the worm. Actions speak louder than words. All that glitters is not gold. A picture is worth a thousand words. When in Rome, do as the Romans do.',
    'The sun always shines brightest after the rain. It is a beautiful day in the neighborhood. The cat sat on the mat. The dog chased the ball. The birds are singing in thetrees. The flowers are blooming in the garden. Life is what you make it.',
    'Technology has changed the way we live and work. The internet connects people from all over the world. Computers have become an essential tool in modern society. We can now access information at our fingertips. The future is exciting.',
  ],
  quotes: [
    'The only way to do great work is to love what you do. - Steve Jobs',
    'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
    'In the end, it\'s not the years in your life that count. It\'s the life in your years. - Abraham Lincoln',
    'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
    'You must be the change you wish to see in the world. - Mahatma Gandhi',
  ],
  codeSnippets: [
    'function greet(name) { console.log("Hello, " + name + "!"); } greet("World");',
    'const numbers = [1, 2, 3, 4, 5]; const sum = numbers.reduce((acc, val) => acc + val, 0);',
    'for (let i = 0; i < 5; i++) { text += "The number is " + i + "<br>"; }',
    'import React from "react"; function App() { return <h1>Hello, React!</h1>; }',
    'public class HelloWorld { public static void main(String[] args) { System.out.println("Hello, Java!"); } }',
  ],
};

export const dailyChallenges: string[] = [
    'The majestic mountains stood tall against the vibrant sunset, their peaks painted in hues of orange and purple. A gentle breeze whispered through the pine trees, carrying the scent of adventure and the promise of a new day. Nature\'s beauty is a timeless gift.',
    'In the heart of the bustling city, life moves at a relentless pace. Sirens wail in the distance as crowds of people navigate the concrete jungle. Yet, amidst the chaos, moments of quiet reflection can be found in small parks and hidden alleyways.',
    'The old library was a sanctuary of knowledge, its shelves lined with books that held stories from generations past. The air was thick with the smell of aging paper and leather, a perfume for the curious mind. Every volume was a doorway to another world.',
    'Creativity is not a finite resource. It is a muscle that grows stronger with use. The more you challenge your mind to think differently, the more innovative your ideas will become. Do not be afraid to experiment and fail, for failure is a teacher.',
    'Friendship is a bond forged in shared laughter and supported by unwavering trust. It is a treasure more valuable than gold, a comfort in times of sorrow, and a celebration in moments of joy. Cherish the friends who make your life brighter.',
    'The vast expanse of the ocean holds countless mysteries within its depths. From the smallest plankton to the largest whale, a complex ecosystem thrives beneath the waves. It is a powerful reminder of the intricate balance of life on our planet.',
    'Learning a new skill requires patience and persistence. There will be moments of frustration and self-doubt, but every small step forward is a victory. Celebrate your progress and remember that mastery is a journey, not a destination.',
    'Music has a unique power to evoke emotions and transport us to different times and places. A single melody can trigger a flood of memories, and a powerful rhythm can make you want to dance. It is the universal language of the soul.',
    'The aroma of freshly baked bread filled the cozy kitchen, a warm and comforting scent that promised simple pleasures. In a world of complexity, sometimes the most profound happiness is found in the simplest of things. Enjoy the little moments.',
    'Space, the final frontier, continues to capture our imagination. With every new discovery, our understanding of the universe expands. We are small, yet we are part of something magnificent and incomprehensibly vast. Look up at the stars and wonder.',
];
