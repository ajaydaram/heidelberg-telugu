import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'జ్ఞాన బోధ - Heidelberg Catechism Telugu',
  description: 'హీడెల్‌బర్గ్ కాటెకిజమ్ తెలుగు అనువాదం - జ్ఞాన బోధ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gidugu&family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-accent-foreground">
        {children}
      </body>
    </html>
  );
}