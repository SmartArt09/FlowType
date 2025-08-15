'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { typingTips } from "@/lib/tips";

export function TypingTip() {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const dayOfMonth = new Date().getDate();
    const tipIndex = dayOfMonth % typingTips.length;
    setTip(typingTips[tipIndex]);
  }, []);

  if (!tip) return null;

  return (
    <Card className="bg-card/50 border-dashed h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Lightbulb className="h-8 w-8 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground">Tip of the Day</h3>
            <p className="text-sm text-muted-foreground mt-1">{tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
