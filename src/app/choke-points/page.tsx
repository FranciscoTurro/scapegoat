import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { auth } from '../../lib/auth/auth';
import { getDecks } from '../../data-access/decks';
import PaginationComponent from '../_components/pagination-component';
import Image from 'next/image';

const ChokePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  //TODOS:
  //search bar for filtering
  //styling
  //look up prisma filtering, skip and what not

  const session = await auth();
  const authorizedUser =
    session && session.user && session.user.role == 'admin';

  const decks = await getDecks();

  const page = searchParams['page'] ?? '1';
  const decksPerPage = searchParams['per_page'] ?? '1';
  const start = (Number(page) - 1) * Number(decksPerPage);
  const end = start + Number(decksPerPage);

  const paginatedDecks = decks.slice(start, end);

  const totalDecks = decks.length;
  const totalPages = Math.ceil(totalDecks / Number(decksPerPage));

  return (
    <div>
      {paginatedDecks.map((deck) => (
        <Link key={deck.id} href={`/choke-points/${deck.id}`}>
          <div className="flex bg-red-500 gap-4">
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
        currentPage={Number(page)}
        totalPages={totalPages}
        decksPerPage={Number(decksPerPage)}
        baseUrl={'choke-points/'}
      />
    </div>
  );
};

export default ChokePage;
