'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResultsDialog } from './results-dialog';
import { cn } from '@/lib/utils';
import { generateTypingText } from '@/ai/flows/generate-typing-text';

type TestState = 'waiting' | 'running' | 'finished';
type TextMode = 'commonWords' | 'quotes' | 'codeSnippets';
type TestDuration = 15 | 30 | 60 | 180 | 300; // in seconds

export function TypingTest({ initialText }: { initialText: string }) {
  const [testText, setTestText] = useState(initialText);
  const [userInput, setUserInput] = useState('');
  const [testState, setTestState] = useState<TestState>('waiting');
  const [duration, setDuration] = useState<TestDuration>(60);
  const [timer, setTimer] = useState(duration);
  const [textMode, setTextMode] = useState<TextMode>('commonWords');
  const [isFocused, setIsFocused] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, mistakes: 0 });
  const [displayedWpm, setDisplayedWpm] = useState(0);
  const [resultsOpen, setResultsOpen] = useState(false);

  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const characters = useMemo(() => testText.split(''), [testText]);

  const resetTest = useCallback(async (newDuration: TestDuration = duration, newMode: TextMode = textMode) => {
    setTestState('waiting');
    setUserInput('');
    setStats({ wpm: 0, accuracy: 100, mistakes: 0 });
    setDisplayedWpm(0);
    
    if (newDuration !== duration) {
        setDuration(newDuration);
        setTimer(newDuration);
    } else {
        setTimer(duration);
    }

    if (newMode !== textMode) {
        setTextMode(newMode);
    }
    
    if (timerInterval.current) clearInterval(timerInterval.current);
    startTime.current = null;
    setResultsOpen(false);

    try {
      const result = await generateTypingText({ type: newMode });
      if (result.text) {
        setTestText(result.text);
      }
    } catch (error) {
      console.error("Failed to fetch new text:", error);
      // fallback to initial text if API fails
    }

    inputRef.current?.focus();
  }, [duration, textMode]);


  useEffect(() => {
    setTimer(duration);
  }, [duration]);

  useEffect(() => {
    if (testState === 'running' && timer > 0) {
      timerInterval.current = setInterval(() => {
        setTimer(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            if (timerInterval.current) clearInterval(timerInterval.current);
            setTestState('finished');
            setResultsOpen(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else if (timer <= 0 && testState === 'running') {
        if (timerInterval.current) clearInterval(timerInterval.current);
        setTestState('finished');
        setResultsOpen(true);
    }
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [testState, timer]);

  // WPM and Accuracy calculation
  useEffect(() => {
    if (testState !== 'running' || !startTime.current) return;
    
    const calculateStats = () => {
        const elapsedMinutes = (Date.now() - startTime.current!) / 60000;
        if (elapsedMinutes === 0) return;

        let correctChars = 0;
        let currentMistakes = 0;
        
        const currentUserInput = inputRef.current?.value || '';

        currentUserInput.split('').forEach((char, index) => {
            if (char === characters[index]) {
                correctChars++;
            } else {
                currentMistakes++;
            }
        });

        const wpm = Math.round((correctChars / 5) / elapsedMinutes);
        const accuracy = currentUserInput.length > 0 
            ? Math.round((correctChars / currentUserInput.length) * 100) 
            : 100;
        
        setStats({ wpm, accuracy, mistakes: currentMistakes });
    }

    const intervalId = setInterval(calculateStats, 200);

    return () => clearInterval(intervalId);

  }, [testState, characters, userInput]);

  // Smooth WPM display
  useEffect(() => {
    const smoothingFactor = 0.05;
    let animationFrameId: number;
    const updateWpm = () => {
      setDisplayedWpm(prev => {
        const newWpm = prev + (stats.wpm - prev) * smoothingFactor;
        if (Math.abs(stats.wpm - newWpm) < 0.1) return stats.wpm;
        return newWpm;
      });
      animationFrameId = requestAnimationFrame(updateWpm);
    };
    animationFrameId = requestAnimationFrame(updateWpm);
    return () => cancelAnimationFrame(animationFrameId);
  }, [stats.wpm]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testState === 'finished') return;

    const value = e.target.value;

    if (testState === 'waiting' && value.length > 0) {
      setTestState('running');
      startTime.current = Date.now();
    }
    setUserInput(value);
  };


  const renderText = () => {
    return characters.map((char, index) => {
      let charClass = 'text-muted-foreground/70';
      if (index < userInput.length) {
        charClass = userInput[index] === char ? 'text-foreground' : 'text-destructive';
      }
      if (index === userInput.length) {
         charClass += ' bg-primary/20 rounded';
      }
      return (
        <span key={index} className={`transition-colors duration-150 ${charClass}`}>
          {char === ' ' ? <span>&nbsp;</span> : char}
        </span>
      );
    });
  };

  return (
    <>
      <Card
        className={cn(
          'w-full p-6 sm:p-8 transition-all duration-300 border-2',
          isFocused ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent shadow-md'
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Select
                value={duration.toString()}
                onValueChange={(val) => resetTest(Number(val) as TestDuration)}
                disabled={testState === 'running'}
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="15">15 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="180">3 minutes</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={textMode}
                onValueChange={(val) => resetTest(duration, val as TextMode)}
                disabled={testState === 'running'}
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Text Type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="commonWords">Words</SelectItem>
                    <SelectItem value="quotes">Quotes</SelectItem>
                    <SelectItem value="codeSnippets">Code</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-sm text-muted-foreground">WPM</div>
              <div className="text-3xl font-bold text-primary">{Math.round(displayedWpm)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <div className="text-3xl font-bold text-primary">{stats.accuracy}%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="text-3xl font-bold text-primary">{timer}s</div>
            </div>
          </div>
        </div>

        <div className="relative text-2xl font-code tracking-wider leading-relaxed p-4 bg-background/50 rounded-lg overflow-hidden">
          <div className="whitespace-pre-wrap select-none" aria-hidden="true">
            {renderText()}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute inset-0 w-full h-full p-4 bg-transparent border-none outline-none text-transparent caret-primary"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            disabled={testState === 'finished'}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={() => resetTest()} size="lg">
            Reset Test
          </Button>
        </div>
      </Card>
      <ResultsDialog
        open={resultsOpen}
        onOpenChange={setResultsOpen}
        stats={stats}
        onTryAgain={() => resetTest()}
      />
    </>
  );
}
