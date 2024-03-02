import { AuthOptions } from 'next-auth';
import Discord from 'next-auth/providers/discord';
import prisma from '../db/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ user, session }) {
      session.user!.role = user.role;
      return session;
    },
  },
};
