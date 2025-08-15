
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
  const [mistakeCount, setMistakeCount] = useState(0);
  
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, mistakes: 0 });
  const [displayedWpm, setDisplayedWpm] = useState(0);

  const [loadingNewText, setLoadingNewText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const { toast } = useToast();

  const resetTest = useCallback((newText?: string) => {
    setTestState('waiting');
    setUserInput('');
    setTimer(duration);
    setDisplayedWpm(0);
    setMistakeCount(0);
    setStats({ wpm: 0, accuracy: 0, mistakes: 0 });

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    
    startTimeRef.current = null;
    
    if (newText) setTextToType(newText);
    
    inputRef.current?.focus();
  }, [duration]);
  

  const fetchNewText = useCallback(async (type: TextType) => {
    setLoadingNewText(true);
    resetTest();
    const { text, error } = await getNewText({ type: type });
    if (error || !text) {
      toast({
        title: 'Error',
        description: error || 'Could not fetch new text.',
        variant: 'destructive',
      });
      setTextToType('The quick brown fox jumps over the lazy dog.'); // fallback text
      resetTest('The quick brown fox jumps over the lazy dog.');
    } else {
      setTextToType(text);
      resetTest(text);
    }
    setLoadingNewText(false);
  }, [resetTest, toast]);

  const handleTextTypeChange = (v: string) => {
    const newType = v as TextType;
    setTextType(newType);
    fetchNewText(newType);
  }

  useEffect(() => {
    setTimer(duration);
    resetTest();
  }, [duration, resetTest]);

  const calculateStats = useCallback(() => {
    if (!startTimeRef.current || testState !== 'running') return;
  
    const elapsed = (Date.now() - startTimeRef.current) / 60000; // in minutes
    if (elapsed > 0) {
      let correctChars = 0;
      let currentMistakes = 0;
      
      const typedChars = userInput.split('');
      typedChars.forEach((char, index) => {
        if (index < textToType.length) {
          if (char === textToType[index]) {
            correctChars++;
          } else {
            currentMistakes++;
          }
        }
      });
  
      const currentWpm = Math.round((correctChars / 5) / elapsed);
      const currentAccuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;
  
      setStats({
        wpm: currentWpm,
        accuracy: currentAccuracy,
        mistakes: mistakeCount,
      });
    }
  }, [userInput, textToType, mistakeCount, testState]);

  const endTest = useCallback(() => {
    if (testState !== 'running') return;

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    setTestState('finished');
    calculateStats(); // Final calculation
  }, [calculateStats, testState]);

  useEffect(() => {
    if (testState === 'running') {
      timerIntervalRef.current = setInterval(() => {
        const elapsedSeconds = (Date.now() - (startTimeRef.current || 0)) / 1000;
        const newTimer = Math.max(0, duration - Math.floor(elapsedSeconds));
        setTimer(newTimer);
        if (newTimer <= 0) {
          endTest();
        }
      }, 1000);

      statsIntervalRef.current = setInterval(calculateStats, 200);

    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    };
  }, [testState, duration, endTest, calculateStats]);


  // Smooth animation for displayed WPM
  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
        setDisplayedWpm(prev => {
            const diff = stats.wpm - prev;
            // A smaller smoothing factor makes the animation smoother
            const smoothingFactor = 0.15;
            const newWpm = prev + diff * smoothingFactor; 
            return newWpm;
        });
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [stats.wpm, displayedWpm]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testState === 'finished') return;

    const value = e.target.value;
    
    if (testState === 'waiting' && value.length > 0) {
      setTestState('running');
      startTimeRef.current = Date.now();
    }
    
    if (value.length < userInput.length) {
      // User is deleting text, don't count as mistake
    } else {
      const lastChar = value.slice(-1);
      const lastCharIndex = value.length - 1;
      if (textToType[lastCharIndex] !== lastChar) {
        setMistakeCount(prev => prev + 1);
      }
    }

    setUserInput(value);
     if (value.length === textToType.length) {
      endTest();
    }
  };


  const characters = useMemo(() => {
    return textToType.split('').map((char, index) => {
      let state: 'correct' | 'incorrect' | 'untyped' = 'untyped';
      const isCurrent = index === userInput.length;
      if (index < userInput.length) {
        state = userInput[index] === char ? 'correct' : 'incorrect';
      }
      return { char, state, isCurrent };
    });
  }, [textToType, userInput]);

  return (
    <Card className={cn(
        "w-full bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/5 transition-all duration-300",
        isFocused ? "ring-2 ring-primary" : "ring-0 ring-transparent"
    )}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className='flex flex-wrap gap-4'>
                <Tabs value={String(duration)} onValueChange={(v) => { if (testState !== 'running') setDuration(Number(v))}}>
                    <TabsList>
                        {DURATIONS.map(d => <TabsTrigger key={d.value} value={String(d.value)} disabled={testState === 'running'}>{d.label}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
                <Tabs value={textType} onValueChange={handleTextTypeChange}>
                    <TabsList>
                        {TEXT_TYPES.map(t => <TabsTrigger key={t.value} value={t.value} disabled={testState === 'running'}>{t.label}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
            </div>
            <Button variant="ghost" size="icon" onClick={() => fetchNewText(textType)} disabled={loadingNewText || testState === 'running'}>
                <RefreshCw className={cn("h-4 w-4", loadingNewText && "animate-spin")}/>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex justify-around p-4 rounded-md bg-card/50 mb-6 text-center">
            <div className="w-1/3">
                <p className="text-sm text-muted-foreground">WPM</p>
                <p className="text-3xl font-bold text-primary">{Math.round(displayedWpm)}</p>
            </div>
            <div className="w-1/3 border-x border-border">
                <p className="text-sm text-muted-foreground">ACCURACY</p>
                <p className="text-3xl font-bold text-primary">{stats.accuracy}%</p>
            </div>
            <div className="w-1/3">
                <p className="text-sm text-muted-foreground">Timer (in seconds)</p>
                <p className="text-3xl font-bold text-primary flex items-center justify-center gap-2"><Timer className="h-6 w-6" /> {timer}</p>
            </div>
        </div>

        <div
          className={cn(
            'font-code text-2xl leading-relaxed tracking-wider transition-opacity duration-300 relative whitespace-pre-wrap',
            loadingNewText && 'opacity-20'
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {characters.map((item, index) => (
            <span
              key={index}
              className={cn({
                'text-foreground': item.state === 'correct',
                'text-destructive': item.state === 'incorrect' && item.char !== ' ',
                'bg-destructive/50 rounded-[0.2rem]': item.state === 'incorrect' && item.char === ' ',
                'text-muted-foreground': item.state === 'untyped',
                'bg-primary/20 rounded-[0.2rem]': item.isCurrent,
              })}
            >
              {item.char}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
          onPaste={(e) => e.preventDefault()}
          disabled={testState === 'finished' || loadingNewText}
        />
        <ResultsDialog 
            open={testState === 'finished'} 
            stats={stats} 
            onTryAgain={() => fetchNewText(textType)}
            onOpenChange={(open) => {
              if (!open) {
                fetchNewText(textType);
              }
            }}
        />
      </CardContent>
    </Card>
  );
}
