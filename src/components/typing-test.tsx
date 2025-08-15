'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { getNewText } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ResultsDialog } from './results-dialog';
import { RefreshCw, Timer } from 'lucide-react';
import { Button } from './ui/button';
import type { TextType } from '@/lib/texts';


type TestState = 'waiting' | 'running' | 'finished';

const DURATIONS = [
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '3m', value: 180 },
  { label: '5m', value: 300 },
];
const TEXT_TYPES: {label: string, value: TextType}[] = [
    { label: 'Words', value: 'commonWords' },
    { label: 'Quotes', value: 'quotes' },
    { label: 'Code', value: 'codeSnippets' },
]

export function TypingTest({ initialText }: { initialText: string }) {
  const [textToType, setTextToType] = useState(initialText);
  const [userInput, setUserInput] = useState('');
  const [testState, setTestState] = useState<TestState>('waiting');
  const [duration, setDuration] = useState(60);
  const [textType, setTextType] = useState<TextType>('commonWords');
  const [timer, setTimer] = useState(duration);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, correctChars: 0, incorrectChars: 0, mistakes: 0 });
  const [loadingNewText, setLoadingNewText] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const resetTest = useCallback((newText?: string) => {
    setTestState('waiting');
    setUserInput('');
    setTimer(duration);
    setStats({ wpm: 0, accuracy: 100, correctChars: 0, incorrectChars: 0, mistakes: 0 });
    if (intervalRef.current) clearInterval(intervalRef.current);
    if(newText) setTextToType(newText)
    inputRef.current?.focus();
  }, [duration]);

  const fetchNewText = useCallback(async () => {
    setLoadingNewText(true);
    resetTest();
    const { text, error } = await getNewText({ type: textType });
    if (error || !text) {
      toast({
        title: 'Error',
        description: error || 'Could not fetch new text.',
        variant: 'destructive',
      });
      setTextToType('The quick brown fox jumps over the lazy dog.'); // fallback text
    } else {
      setTextToType(text);
    }
    setLoadingNewText(false);
  }, [textType, resetTest, toast]);


  useEffect(() => {
    setTimer(duration);
    resetTest();
  }, [duration, resetTest]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    if (testState === 'running') {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            if(intervalRef.current) clearInterval(intervalRef.current);
            setTestState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testState]);

  useEffect(() => {
    if (testState !== 'finished') {
        let correctChars = 0;
        let incorrectChars = 0;
        
        textToType.split('').slice(0, userInput.length).forEach((char, index) => {
            if (char === userInput[index]) {
                correctChars++;
            } else {
                incorrectChars++;
            }
        });

        const elapsedSeconds = duration - timer;
        const wpm = elapsedSeconds > 0 ? (correctChars / 5) / (elapsedSeconds / 60) : 0;
        const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100;
        
        setStats({ wpm: Math.round(wpm), accuracy: Math.round(accuracy), correctChars, incorrectChars, mistakes: incorrectChars });
    }
  }, [userInput, textToType, duration, timer, testState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testState === 'finished') return;
    if (testState === 'waiting') setTestState('running');
    setUserInput(e.target.value);
  };

  const characters = useMemo(() => textToType.split('').map((char, index) => {
    const typedChar = userInput[index];
    let state: 'correct' | 'incorrect' | 'untyped' = 'untyped';
    if (typedChar !== undefined) {
      state = typedChar === char ? 'correct' : 'incorrect';
    }
    return { char, state };
  }), [textToType, userInput]);

  return (
    <Card className="w-full bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/5">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className='flex flex-wrap gap-4'>
                <Tabs value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
                    <TabsList>
                        {DURATIONS.map(d => <TabsTrigger key={d.value} value={String(d.value)}>{d.label}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
                <Tabs value={textType} onValueChange={(v) => setTextType(v as TextType)}>
                    <TabsList>
                        {TEXT_TYPES.map(t => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
            </div>
            <Button variant="ghost" size="icon" onClick={() => fetchNewText()} disabled={loadingNewText}>
                <RefreshCw className={cn("h-4 w-4", loadingNewText && "animate-spin")}/>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="relative" onClick={() => inputRef.current?.focus()}>
        <div className="flex justify-around p-4 rounded-md bg-card/50 mb-6 text-center">
            <div className="w-1/3">
                <p className="text-sm text-muted-foreground">WPM</p>
                <p className="text-3xl font-bold text-primary">{stats.wpm}</p>
            </div>
            <div className="w-1/3 border-x border-border">
                <p className="text-sm text-muted-foreground">ACCURACY</p>
                <p className="text-3xl font-bold text-primary">{stats.accuracy}%</p>
            </div>
            <div className="w-1/3">
                <p className="text-sm text-muted-foreground">TIMER</p>
                <p className="text-3xl font-bold text-primary flex items-center justify-center gap-2"><Timer className="h-6 w-6" /> {timer}</p>
            </div>
        </div>

        <div className={cn("font-code text-2xl leading-relaxed tracking-wider break-all transition-opacity duration-300", loadingNewText && 'opacity-20')}>
          {characters.map(({ char, state }, index) => (
            <span
              key={index}
              className={cn({
                'text-muted-foreground': state === 'untyped',
                'text-foreground': state === 'correct',
                'text-destructive': state === 'incorrect',
                'relative': index === userInput.length
              })}
            >
              {index === userInput.length && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary animate-caret-blink" />}
              {char === ' ' && state === 'incorrect' ? <span className='bg-destructive/50'>&nbsp;</span> : char}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
          onPaste={(e) => e.preventDefault()}
          disabled={testState === 'finished' || loadingNewText}
          autoFocus
        />
        <ResultsDialog 
            open={testState === 'finished'} 
            stats={stats} 
            onTryAgain={() => fetchNewText()}
        />
      </CardContent>
    </Card>
  );
}
