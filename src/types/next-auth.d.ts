import { UserRole } from '@prisma/client';
import { User } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user?: User & { role: UserRole };
  }
  interface User extends User {
    role: UserRole;
  }
}
