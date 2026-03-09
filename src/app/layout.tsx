import type {Metadata, Viewport} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Mandali, Gidugu } from 'next/font/google';

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
  title: 'జ్ఞాన నిధి - Christian Creeds & Catechisms Library',
  description: 'క్రైస్తవ విశ్వాస ప్రమాణాల గ్రంథాలయం - తెలుగు అనువాదం',
};

export const viewport: Viewport = {
  themeColor: '#334155',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
