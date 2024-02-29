import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/lib/auth/SessionProvider';

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
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
