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
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={data.user.image!}
              alt={`${data.user.name}'s picture`}
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{`${data.user!.name}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
