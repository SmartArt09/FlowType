'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SocialShareButtons } from './social-share-buttons';

interface ResultsDialogProps {
  open: boolean;
  stats: {
    wpm: number;
    accuracy: number;
    mistakes: number;
  };
  onTryAgain: () => void;
}

export function ResultsDialog({ open, stats, onTryAgain }: ResultsDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Test Complete!</DialogTitle>
          <DialogDescription>Here are your results. Practice makes perfect!</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 text-center my-4">
          <div>
            <p className="text-sm text-muted-foreground">WPM</p>
            <p className="text-4xl font-bold text-primary">{stats.wpm}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-4xl font-bold text-primary">{stats.accuracy}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Mistakes</p>
            <p className="text-4xl font-bold text-primary">{stats.mistakes}</p>
          </div>
        </div>
        
        <SocialShareButtons stats={stats} />
        
        <DialogFooter className='sm:justify-center mt-4'>
          <Button onClick={onTryAgain} className="w-full">
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
