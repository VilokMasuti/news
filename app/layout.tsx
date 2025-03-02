import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { NewsProvider } from '@/context/news-context';
import { ThemeProvider } from '@/context/theme-context';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NewsPluse',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NewsProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-10">
              {children}
            </main>
            <Footer />
          </NewsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
