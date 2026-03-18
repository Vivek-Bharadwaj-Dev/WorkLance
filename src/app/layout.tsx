
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Interna - Freelance & Internship Platform for Students',
  description: 'Connecting university students with businesses for tech projects, internships, and freelance opportunities.',
  // Add more metadata like open graph tags, icons etc. for a production app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        {/* Removed default container and padding from main to allow full-width sections if needed */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
