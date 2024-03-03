import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/lib/auth/SessionProvider';
import { authOptions } from '../lib/auth/authOptions';
import { downloadImages, renameImageRoutes } from '../utils/populateDb';

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

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
