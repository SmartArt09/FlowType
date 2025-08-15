import { generateTypingText } from '@/ai/flows/generate-typing-text';
import { TypingTest } from '@/components/typing-test';
import { TypingTip } from '@/components/typing-tip';
import { AdBanner } from '@/components/ad-banner';

export default async function Home() {
  const initialTextData = await generateTypingText({ type: 'commonWords' });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold text-primary tracking-tighter">TypeFlow</h1>
          <p className="text-muted-foreground mt-2">The ultimate typing test to boost your speed and accuracy.</p>
        </header>

        <TypingTest initialText={initialTextData.text} />

        <footer className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <TypingTip />
          <AdBanner />
        </footer>
      </div>
    </main>
  );
}
