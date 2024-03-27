import type { Metadata } from 'next';
import '@/styles/globals.css';
import SessionProvider from '@/lib/auth/session-provider';
import { Inter } from 'next/font/google';
import { auth } from '../lib/auth/auth';
import { Navbar } from './_components/navbar';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'Scapegoat',
  description: 'A Yu-Gi-Oh! assistant',
  icons: { icon: '/favicon.ico' },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#ffff" />
        <SessionProvider session={session}>
          <Navbar />
          <main className={`${inter.variable} flex w-full flex-1 flex-col`}>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
