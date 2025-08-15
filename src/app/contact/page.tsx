import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-3xl">
        <Card className="bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/5">
          <CardHeader>
            <CardTitle>
              <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Contact Us
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
              </p>
              <p>
                You can contact us via email at: <a href="mailto:support@typeflow.app" className="text-primary hover:underline">support@typeflow.app</a>.
              </p>
              <p>
                We do our best to respond to all inquiries within 24-48 hours. Your feedback is important to us and helps us improve TypeFlow for everyone.
              </p>
              <p>Thank you for using TypeFlow!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
