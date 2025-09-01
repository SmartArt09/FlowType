import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function TypingInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>How WPM is Calculated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            WPM is based on the number of characters typed, divided by five (the average length of a word), then adjusted for time.
          </p>
        </CardContent>
      </Card>
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>Why Accuracy Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Typing quickly with poor accuracy won’t help in real-world tasks. FlowType tracks both speed and precision so you can focus on balanced improvement.
          </p>
        </CardContent>
      </Card>
      <div className="md:col-span-2">
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle>Typing Tips</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>Practice a few minutes daily instead of once a week.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>Focus on accuracy first; speed will naturally follow.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>Try using all ten fingers (touch typing) for long-term gains.</span>
                    </li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
