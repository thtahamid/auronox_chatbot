import './globals.css';
import type { Metadata } from 'next';
import { Comic_Neue } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const comicNeue = Comic_Neue({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Auranox AI',
  description: 'Your personal AI-powered healthcare assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={comicNeue.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
