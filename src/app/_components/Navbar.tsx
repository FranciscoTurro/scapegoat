'use client';

import { Joystick, Search, ShieldX } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import page_icon from '../../../public/scapegoat_icon.png';
import { UserButton } from './UserButton';

export const Navbar = ({}) => {
  const pathname = usePathname();
  const isCombos = pathname == '/combos';
  const isChokePoints = pathname == '/choke-points';
  const isSearch = pathname == '/search';

  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto w-full flex flex-row gap-6 container px-20 pt-4">
        <a href="/">
          <Image
            priority={true}
            src={page_icon}
            width={40}
            height={40}
            alt="Scapegoat Icon"
          />
        </a>
        <div className="flex flex-row space-x-4 gap-2 h-12 items-center overflow-x-auto w-full">
          <a
            className="h-full relative flex items-center whitespace-nowrap"
            href="combos"
          >
            <div
              className={`${
                isCombos
                  ? 'text-primary font-bold'
                  : 'text-gray-600 font-medium '
              } relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-primary rounded-md duration-200 hover:bg-gray-100`}
            >
              <Joystick />
              <span>Combos</span>
            </div>
            {isCombos ? (
              <span className="w-full h-0.5 bg-primary absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </a>
          <a
            className="h-full relative flex items-center whitespace-nowrap"
            href="choke-points"
          >
            <div
              className={`${
                isChokePoints
                  ? 'text-primary font-bold'
                  : 'text-gray-600 font-medium '
              } relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-primary rounded-md duration-200 hover:bg-gray-100`}
            >
              {' '}
              <ShieldX />
              <span>Choke points</span>
            </div>
            {isChokePoints ? (
              <span className="w-full h-0.5 bg-primary absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </a>
          <a
            className="h-full relative flex items-center whitespace-nowrap"
            href="search"
          >
            <div
              className={`${
                isSearch
                  ? 'text-primary font-bold'
                  : 'text-gray-600 font-medium '
              } relative text-sm p-2 flex flex-row items-center space-x-2 hover:text-primary rounded-md duration-200 hover:bg-gray-100`}
            >
              <Search />
              <span>Search cards</span>
            </div>
            {isSearch ? (
              <span className="w-full h-0.5 bg-primary absolute bottom-0 left-0 rounded-full"></span>
            ) : null}
          </a>
        </div>
        <UserButton />
      </div>
    </nav>
  );
};
