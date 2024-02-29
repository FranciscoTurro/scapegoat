'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../components/ui/button';

const Home = () => {
  const { data } = useSession();

  if (data?.user)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        logged in as {data.user.name}
        <Button onClick={() => signOut()}>sign out</Button>
      </main>
    );
  else
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        not logged in
        <Button onClick={() => signIn()}>sign in</Button>
      </main>
    );
};

export default Home;
