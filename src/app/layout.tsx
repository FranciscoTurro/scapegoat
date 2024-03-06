import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/lib/auth/SessionProvider';
import { authOptions } from '../lib/auth/authOptions';
import { Navbar } from './_components/Navbar';

export const metadata: Metadata = {
  title: 'Scapegoat',
  description: 'A Yu-Gi-Oh! assistant',
  icons: { icon: '/favicon.ico' },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <main className="flex w-full flex-1 flex-col">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
