'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

export const UserButton = () => {
  const { data } = useSession();

  if (!data || !data.user)
    return (
      <Button
        onClick={() => {
          signIn();
        }}
      >
        <User className="mr-2 h-4 w-4" />
        Log In
      </Button>
    );
  else
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border-white border-2 cursor-pointer">
            <AvatarImage
              src={data.user.image!}
              alt={`${data.user.name}'s picture`}
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black border-border w-56">
          <DropdownMenuLabel>{`${data.user!.name}`}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="bg-black cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
