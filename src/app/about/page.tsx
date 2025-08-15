import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-3xl">
        <Card className="bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/5">
          <CardHeader>
            <CardTitle>
              <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                About FlowType
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Welcome to FlowType, the ultimate destination for improving your typing speed and accuracy. Our mission is to provide a clean, modern, and engaging platform for users of all skill levels to practice and enhance their typing abilities.
              </p>
              <p>
                At FlowType, we believe that typing is a fundamental skill in today&apos;s digital world. Whether you&apos;re a student, a professional, or just someone looking to type faster, our carefully curated typing tests and real-time feedback are designed to help you achieve your goals.
              </p>
              <h3 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Our Features
              </h3>
              <ul>
                <li>
                  <strong>Multiple Test Modes:</strong> Choose from various time durations and text types, including common words, famous quotes, and code snippets.
                </li>
                <li>
                  <strong>Real-time Feedback:</strong> Track your Words Per Minute (WPM), accuracy, and mistakes as you type.
                </li>
                <li>
                  <strong>Sleek & Minimalist Design:</strong> A distraction-free interface designed to help you focus on your practice.
                </li>
                <li>
                  <strong>Responsive Experience:</strong> Practice on any device, anytime, anywhere.
                </li>
              </ul>
              <p>
                Join our community of typists and start your journey to becoming a faster, more accurate typist today. Type. Train. Flow. Repeat.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
