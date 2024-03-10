import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { auth } from '../../lib/auth/auth';
import { getDecks } from '../../data-access/decks';
import Image from 'next/image';

const ChokePage = async () => {
  const session = await auth();
  const authorizedUser =
    session && session.user && session.user.role == 'admin';

  const decks = await getDecks();

  return (
    <div>
      <p>chokers waiting room</p>
      {authorizedUser ? (
        <Link href={'/choke-points/create-deck'}>
          <Button>Add new deck</Button>
        </Link>
      ) : null}
      {decks.map((deck) => (
        <div className="flex gap-4" key={deck.id}>
          <p>{deck.name}</p>
          <Image
            src={deck.cover_card.small_image_path}
            height={20}
            width={20}
            alt={`${deck.name}'s cover card`}
          />
        </div>
      ))}
    </div>
  );
};

export default ChokePage;
