import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { auth } from '../../lib/auth/auth';
import { getDecksPaginated } from '../../data-access/decks';
import PaginationComponent from '../_components/pagination-component';
import Image from 'next/image';
import { FilterBar } from './_components/filter-bar';
import { shortenDeckName } from '../../utils/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { CircleEllipsis, Trash2 } from 'lucide-react';
import { deleteDeckAction } from '../../actions/delete-deck-action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choke points - Scapegoat',
};

const ChokePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const authorizedUser =
    session && session.user && session.user.role == 'admin';

  const page = searchParams['page'] ?? '1';
  const filter = searchParams['filter'] ?? '';
  const decksPerPage = 25;

  const { decks, totalPages } = await getDecksPaginated(
    Number(page),
    decksPerPage,
    String(filter)
  );

  return (
    <div className="h-full">
      <FilterBar />
      {authorizedUser ? (
        <div className="container px-20 w-full">
          <Link className="mx-48" href="choke-points/create-deck">
            <Button className="font-bold" variant="ghost">
              Add new deck
            </Button>
          </Link>
        </div>
      ) : null}
      <div className="h-full justify-center flex-wrap gap-10 flex px-60 pt-5">
        {decks.map((deck) => {
          const deleteDeckWithId = deleteDeckAction.bind(null, deck.id);

          return (
            <div key={deck.id} className="relative">
              <Link href={`/choke-points/${deck.id}`}>
                <div className="flex items-center border rounded-lg p-1 border-border w-64 hover:bg-accent gap-4">
                  <Image
                    width={40}
                    height={40}
                    src={deck.cover_card.small_image_path}
                    alt={`${deck.name}'s cover card`}
                  />
                  <p className="font-semibold">{shortenDeckName(deck.name)}</p>
                </div>
              </Link>
              {authorizedUser ? (
                <div className="absolute top-1 right-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <CircleEllipsis
                        size={20}
                        className="hover:text-white/80 cursor-pointer"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-3 w-40">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="w-full focus:ring-0 flex p-1 hover:rounded gap-4 items-center cursor-pointer hover:bg-accent">
                            <Trash2 size={20} />
                            <p>Delete</p>
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete deck?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <form
                              className="flex gap-2"
                              action={deleteDeckWithId}
                            >
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction type="submit">
                                Confirm
                              </AlertDialogAction>
                            </form>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <PaginationComponent
        filter={String(filter)}
        currentPage={Number(page)}
        totalPages={totalPages}
        baseUrl={'choke-points'}
      />
    </div>
  );
};

export default ChokePage;
