import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export const metadata: Metadata = {
  title: 'Combos - Scapegoat',
};

const CombosPage = () => {
  return (
    <div>
      <Link className="mx-48" href="combos/create-combo">
        <Button className="font-bold" variant="ghost">
          Add new combo
        </Button>
      </Link>
    </div>
  );
};

export default CombosPage;
