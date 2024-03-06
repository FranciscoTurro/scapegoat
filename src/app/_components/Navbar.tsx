'use client';

import { Joystick, ShieldX } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import page_icon from '../../../public/scapegoat_icon.png';
import { UserButton } from './UserButton';
import Link from 'next/link';
import { Searchbar } from './Searchbar';

export const Navbar = ({
  cardNames,
}: {
  cardNames: { id: string; name: string; small_image_path: string }[];
}) => {
  const pathname = usePathname();
  const isCombos = pathname == '/combos';
  const isChokePoints = pathname == '/choke-points';

  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto w-full flex flex-row justify-between container px-20 pt-4">
        <div className="flex gap-3 w-2/5">
          <Link href="/">
            <Image
              priority={true}
              src={page_icon}
              width={40}
              height={40}
              alt="Scapegoat Icon"
            />
          </Link>
          <Searchbar names={cardNames} />
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row space-x-4 gap-2 justify-center overflow-x-auto">
            <Link
              className="h-full relative flex items-center whitespace-nowrap"
              href="combos"
            >
              <div
                className={`${
                  isCombos ? 'text-primary' : 'text-gray-600'
                }  font-medium relative text-sm p-2 flex flex-col items-center hover:text-primary rounded-md duration-200 hover:bg-gray-100`}
              >
                <Joystick />
                <span>Combos</span>
              </div>
              {isCombos ? (
                <span className="w-full h-0.5 bg-primary absolute bottom-0 rounded-full"></span>
              ) : null}
            </Link>
            <Link
              className="h-full relative flex items-center whitespace-nowrap"
              href="choke-points"
            >
              <div
                className={`${
                  isChokePoints ? 'text-primary' : 'text-gray-600'
                }  font-medium relative text-sm p-2 flex flex-col items-center hover:text-primary rounded-md duration-200 hover:bg-gray-100`}
              >
                <ShieldX />
                <span>Choke points</span>
              </div>
              {isChokePoints ? (
                <span className="w-full h-0.5 bg-primary absolute bottom-0 left-0 rounded-full"></span>
              ) : null}
            </Link>
          </div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
