'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

interface SocialShareButtonsProps {
  stats: {
    wpm: number;
    accuracy: number;
    mistakes: number;
  };
}

export function SocialShareButtons({ stats }: SocialShareButtonsProps) {
  const [postText, setPostText] = useState('');

  useEffect(() => {
    setPostText(`I just scored ${stats.wpm} WPM with ${stats.accuracy}% accuracy on FlowType!`);
  }, [stats]);

  const appUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedPostText = encodeURIComponent(postText + `\n\nChallenge me on FlowType! `);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedPostText}&url=${encodeURIComponent(appUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${encodedPostText}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(appUrl)}&title=My%20FlowType%20Result!&summary=${encodedPostText}`,
  };

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-muted-foreground mb-2">Share your results!</p>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleShare(shareUrls.twitter)}>
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare(shareUrls.facebook)}>
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare(shareUrls.linkedin)}>
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">Share on LinkedIn</span>
        </Button>
      </div>
    </div>
  );
}
