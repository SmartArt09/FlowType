import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'FlowType',
  description: 'The ultimate typing test to boost your speed and accuracy.',
  openGraph: {
    title: 'FlowType',
    description: 'The ultimate typing test to boost your speed and accuracy.',
    images: [{ url: 'https://placehold.co/1200x630.png', width: 1200, height: 630 }],
    siteName: 'FlowType',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowType',
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
        <meta name="google-adsense-account" content="ca-pub-6541853864426252" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6541853864426252"
     crossOrigin="anonymous"></script>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="379180ab-3017-46bd-9a44-ba20c35f181e"></script>
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
        <Analytics />
      </body>
    </html>
  );
}
