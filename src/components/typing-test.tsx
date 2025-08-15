
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
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, mistakes: 0 });
  const [displayedWpm, setDisplayedWpm] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loadingNewText, setLoadingNewText] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { toast } = useToast();

  const resetTest = useCallback((newText?: string) => {
    setTestState('waiting');
    setUserInput('');
    setTimer(duration);
    setWpm(0);
    setDisplayedWpm(0);
    setAccuracy(0);
    setStartTime(null);
    setMistakeCount(0);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    if(newText) setTextToType(newText)
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
    } else {
      setTextToType(text);
    }
    resetTest(text);
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

  
  const endTest = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    setTestState('finished');

    const elapsed = (Date.now() - (startTime || 0)) / 60000;
    if (elapsed > 0) {
      let correctChars = 0;
      userInput.split('').forEach((char, index) => {
        if (char === textToType[index]) {
          correctChars++;
        }
      });
      const finalWpm = Math.round((correctChars / 5) / elapsed);
      const finalAccuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 0;
      
      setWpm(finalWpm);
      setDisplayedWpm(finalWpm);
      setAccuracy(finalAccuracy);

      setStats({
        wpm: finalWpm,
        accuracy: finalAccuracy,
        mistakes: mistakeCount,
      });
    }
  }, [startTime, userInput, textToType, mistakeCount]);

  
  useEffect(() => {
    if (testState === 'running' && startTime) {
      // Timer for countdown
      timerIntervalRef.current = setInterval(() => {
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        const newTimer = Math.max(0, duration - Math.floor(elapsedSeconds));
        setTimer(newTimer);
        if (newTimer <= 0) {
          endTest();
        }
      }, 1000);

      // WPM and Accuracy Calculation
      wpmIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 60000; // in minutes
        if (elapsed > 0) {
          let correctChars = 0;
          let currentMistakes = 0;
          
          userInput.split('').forEach((char, index) => {
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

          setWpm(currentWpm);
          setAccuracy(currentAccuracy);
          // Only update mistake count, don't rely on it for wpm/accuracy
          setMistakeCount(currentMistakes);
        }
      }, 1000); // Update WPM every second

    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, [testState, startTime, duration, endTest, userInput, textToType]);


  // Smooth animation for displayed WPM
  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
        setDisplayedWpm(prev => {
            const diff = wpm - prev;
            // slow down smoothing if difference is large
            const smoothingFactor = Math.abs(diff) > 20 ? 0.2 : 0.1;
            const newWpm = prev + diff * smoothingFactor; 
            return newWpm;
        });
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [wpm, displayedWpm]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testState === 'finished') return;

    const value = e.target.value;
    
    if (testState === 'waiting' && value.length > 0) {
      setTestState('running');
      setStartTime(Date.now());
    }

    if (value.length <= textToType.length) {
      setUserInput(value);
    }
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
                <Tabs value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
                    <TabsList>
                        {DURATIONS.map(d => <TabsTrigger key={d.value} value={String(d.value)}>{d.label}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
                <Tabs value={textType} onValueChange={handleTextTypeChange}>
                    <TabsList>
                        {TEXT_TYPES.map(t => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
                    </TabsList>
                </Tabs>
            </div>
            <Button variant="ghost" size="icon" onClick={() => fetchNewText(textType)} disabled={loadingNewText}>
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
                <p className="text-3xl font-bold text-primary">{accuracy}%</p>
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
            stats={{wpm: wpm, accuracy: accuracy, mistakes: mistakeCount}} 
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

    