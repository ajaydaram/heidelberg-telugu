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
  title: 'జ్ఞాన నిధి - క్రైస్తవ విశ్వాస ప్రమాణాలు',
  description: 'క్రైస్తవ విశ్వాస ప్రమాణాల గ్రంథాలయం - తెలుగు అనువాదం',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'జ్ఞాన నిధి',
  },
};

export const viewport: Viewport = {
  themeColor: '#334155',
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
      <body className="font-body antialiased selection:bg-accent selection:text-accent-foreground">
        <FirebaseClientProvider>
          {children}
          <Toaster />
          <PWAInstallPrompt />
        </FirebaseClientProvider>
        
        {/* Service Worker Registration */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                  },
                  function(err) {
                    console.log('Service Worker registration failed: ', err);
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
