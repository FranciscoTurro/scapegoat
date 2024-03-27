import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { getCombosPaginated } from '../../data-access/combos';
import { FilterBar } from '../_components/filter-bar';
import PaginationComponent from '../_components/pagination-component';
import { Badge } from '../../components/ui/badge';
import { shortenName } from '../../utils/utils';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Combos - Scapegoat',
};

const CombosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams['page'] ?? '1';
  const filter = searchParams['filter'] ?? '';
  const combosPerPage = 25;

  const { combos, totalPages } = await getCombosPaginated(
    Number(page),
    combosPerPage,
    String(filter)
  );

  return (
    <div className="h-full">
      <FilterBar placeholder="Filter combos by name..." />
      <div className="container px-20 w-full">
        <Link className="mx-48" href="combos/create-combo">
          <Button className="font-bold" variant="ghost">
            Add new combo
          </Button>
        </Link>
      </div>
      <div className="h-full justify-center flex-wrap gap-10 flex px-60 pt-5">
        {combos.map((combo) => (
          <div key={combo.id} className="relative">
            <Link href={`/combos/${combo.id}`}>
              <div className="flex items-center border rounded-lg p-1 border-border w-64 hover:bg-accent gap-4">
                <Image
                  width={40}
                  height={40}
                  src={combo.cover_card.small_image_path}
                  alt={`${combo.name}'s cover card`}
                />
                <div className="w-full">
                  <p className="font-semibold">{shortenName(combo.name)}</p>
                  <div className="flex items-center w-full justify-start gap-5">
                    <Badge variant="default">Combo</Badge>
                    <p className="text-white/50 text-xs">
                      by: {combo.creator.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <PaginationComponent
        filter={String(filter)}
        currentPage={Number(page)}
        totalPages={totalPages}
        baseUrl={'combos'}
      />
    </div>
  );
};

export default CombosPage;
