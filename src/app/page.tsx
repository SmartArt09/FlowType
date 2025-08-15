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
          <h1 className="text-5xl font-bold text-primary tracking-tighter">TypeFlow</h1>
          <p className="text-muted-foreground mt-2">Type. Train. Flow. Repeat</p>
        </header>

        <TypingTest initialText={initialText} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <TypingTip />
          <AdBanner />
        </div>
      </div>
    </main>
  );
}
