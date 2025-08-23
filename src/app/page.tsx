import { TypingTest } from '@/components/typing-test';
import { TypingTip } from '@/components/typing-tip';
import { AdBanner } from '@/components/ad-banner';
import { typingTexts } from '@/lib/texts';

export default async function Home() {
  const initialText = typingTexts.commonWords[0];

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 py-2">Welcome to FlowType</h1>
          <p className="text-muted-foreground mt-2">The modern way to test and improve your typing speed.</p>
        </header>

        <TypingTest initialText={initialText} />

        <div className="flex flex-col gap-8 pt-8">
          <TypingTip />
          <AdBanner />
        </div>
      </div>
    </main>
  );
}
