import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/lib/auth/SessionProvider';
import { authOptions } from '../lib/auth/authOptions';
import { Navbar } from './_components/Navbar';
import { Inter } from 'next/font/google';
import { loadDbFromJSON } from '../utils/populateDb';

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
  const session = await getServerSession(authOptions);

  loadDbFromJSON();

  return (
    <html lang="en">
      <body>
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
