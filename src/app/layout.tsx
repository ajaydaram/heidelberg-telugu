import type {Metadata, Viewport} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Mandali, Gidugu } from 'next/font/google';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import Script from 'next/script';

const mandali = Mandali({
  weight: '400',
  subsets: ['telugu'],
  variable: '--font-mandali',
  display: 'swap',
});

const gidugu = Gidugu({
  weight: '400',
  subsets: ['telugu'],
  variable: '--font-gidugu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'జ్ఞాన బోధ - హీడెల్‌బర్గ్ కాటెకిజమ్',
  description: 'హీడెల్‌బర్గ్ కాటెకిజమ్ (Heidelberg Catechism) తెలుగు అనువాదం. జీవితంలోను, మరణంలోను మనకు ఉన్న ఏకైక ఆదరణ.',
  keywords: ['Heidelberg Catechism', 'Telugu', 'Christian', 'Reformed', 'Bible', 'జ్ఞాన బోధ'],
  authors: [{ name: 'Gnaana Bodha Team' }],
  openGraph: {
    title: 'జ్ఞాన బోధ - హీడెల్‌బర్గ్ కాటెకిజమ్',
    description: 'హీడెల్‌బర్గ్ కాటెకిజమ్ తెలుగు అనువాదం',
    type: 'website',
    locale: 'te_IN',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'జ్ఞాన బోధ',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te" className={`${mandali.variable} ${gidugu.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-accent-foreground bg-background">
        <FirebaseClientProvider>
          {children}
          <Toaster />
          <PWAInstallPrompt />
        </FirebaseClientProvider>
        
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registered');
                  },
                  function(err) {
                    console.log('Service Worker failed', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}