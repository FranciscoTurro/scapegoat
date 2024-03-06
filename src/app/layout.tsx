import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/lib/auth/SessionProvider';
import { authOptions } from '../lib/auth/authOptions';
import { Navbar } from './_components/Navbar';
import { getCardsInfo } from '../data-access/cards';

export const metadata: Metadata = {
  title: 'Scapegoat',
  description: 'A Yu-Gi-Oh! assistant',
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const cardNames = await getCardsInfo(); //very VERY unsure about this. keeping it like this since its the behavior i want, but im not convinced

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar cardNames={cardNames} />
          <main className="flex w-full flex-1 flex-col">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
