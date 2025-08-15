import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'TypeFlow',
  description: 'The ultimate typing test to boost your speed and accuracy.',
  openGraph: {
    title: 'TypeFlow',
    description: 'The ultimate typing test to boost your speed and accuracy.',
    images: [{ url: 'https://placehold.co/1200x630.png', width: 1200, height: 630 }],
    siteName: 'TypeFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypeFlow',
    description: 'The ultimate typing test to boost your speed and accuracy.',
    images: ['https://placehold.co/1200x630.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
            {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
