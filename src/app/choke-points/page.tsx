import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { auth } from '../../lib/auth/auth';
import { getDecksPaginated } from '../../data-access/decks';
import PaginationComponent from '../_components/pagination-component';
import Image from 'next/image';
import { FilterBar } from './_components/filter-bar';

const ChokePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  //TODOS:
  //search bar for filtering
  //styling

  const session = await auth();
  const authorizedUser =
    session && session.user && session.user.role == 'admin';

  const page = searchParams['page'] ?? '1';
  const filter = searchParams['filter'] ?? '';
  const decksPerPage = 10;

  const { decks, totalPages } = await getDecksPaginated(
    Number(page),
    decksPerPage,
    String(filter)
  );

  return (
    <div>
      <FilterBar />
      {decks.map((deck) => (
        <Link key={deck.id} href={`/choke-points/${deck.id}`}>
          <div className="flex hover:bg-red-300 bg-red-500 gap-4">
            <p>{deck.name}</p>
            <Image
              src={deck.cover_card.small_image_path}
              height={20}
              width={20}
              alt={`${deck.name}'s cover card`}
            />
          </div>
        </Link>
      ))}
      {authorizedUser ? (
        <Link href="choke-points/create-deck">
          <Button>Add new deck</Button>
        </Link>
      ) : null}
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
