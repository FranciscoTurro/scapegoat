'use client';

import { Hand, Joystick, Search, ShieldX } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import page_icon from '../../../public/scapegoat_icon.png';
import { UserButton } from './user-button';
import Link from 'next/link';

export const Navbar = ({}) => {
  const pathname = usePathname();
  const isCombos = pathname.includes('/combos');
  const isChokePoints = pathname.includes('/choke-points');
  const isSearch = pathname.includes('/search');
  const isHand = pathname.includes('/hand-simulator');

  return (
    <nav className="border-b border-border">
      <div className="mx-auto w-full flex flex-row justify-evenly container px-20 pt-2">
        <Link href="/">
          <Image
            priority={true}
            src={page_icon}
            width={40}
            height={40}
            alt="Scapegoat Icon"
          />
        </Link>
        <div className="flex flex-row space-x-4 gap-2 h-12 items-center overflow-x-auto">
          <Link
            className="h-full relative flex items-center whitespace-nowrap"
            href="/combos"
          >
            <div
              className={`${
                isCombos ? 'text-white' : 'text-gray-400'
              } font-medium relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-white rounded-md duration-200 hover:bg-accent/30`}
            >
              <Joystick />
              <span>Combos</span>
            </div>
            {isCombos ? (
              <span className="w-full h-0.5 bg-white absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </Link>
          <Link
            className="h-full relative flex items-center whitespace-nowrap"
            href="/choke-points"
          >
            <div
              className={`${
                isChokePoints ? 'text-white' : 'text-gray-400'
              } font-medium relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-white rounded-md duration-200 hover:bg-accent/30`}
            >
              <ShieldX />
              <span>Choke points</span>
            </div>
            {isChokePoints ? (
              <span className="w-full h-0.5 bg-white absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </Link>
          <Link
            className="h-full relative flex items-center whitespace-nowrap"
            href="/search"
          >
            <div
              className={`${
                isSearch ? 'text-white' : 'text-gray-400'
              } font-medium relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-white rounded-md duration-200 hover:bg-accent/30`}
            >
              <Search />
              <span>Search cards</span>
            </div>
            {isSearch ? (
              <span className="w-full h-0.5 bg-white absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </Link>
          <Link
            className="h-full relative flex items-center whitespace-nowrap"
            href="/hand-simulator"
          >
            <div
              className={`${
                isHand ? 'text-white' : 'text-gray-400'
              } font-medium relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-white rounded-md duration-200 hover:bg-accent/30`}
            >
              <Hand />
              <span>Hand simulator</span>
            </div>
            {isHand ? (
              <span className="w-full h-0.5 bg-white absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </Link>
        </div>
        <UserButton />
      </div>
    </nav>
  );
};
