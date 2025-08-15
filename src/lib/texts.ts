export type TextType = 'commonWords' | 'quotes' | 'codeSnippets';

export const typingTexts: Record<TextType, string[]> = {
  commonWords: [
    'The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet. Practice it to improve your typing speed and accuracy. The journey of a thousand miles begins with a single step. Keep practicing.',
    'Hello world, this is a test of your typing skills. The rain in Spain falls mainly on the plain. She sells seashells by the seashore. How much wood would a woodchuck chuck if a woodchuck could chuck wood? A proper copper coffee pot.',
    'Many people feel that the best way to learn is by doing. The early bird catches the worm. Actions speak louder than words. All that glitters is not gold. A picture is worth a thousand words. When in Rome, do as the Romans do.',
    'The sun always shines brightest after the rain. It is a beautiful day in the neighborhood. The cat sat on the mat. The dog chased the ball. The birds are singing in the trees. The flowers are blooming in the garden. Life is what you make it.',
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
