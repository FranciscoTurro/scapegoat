import { Metadata } from 'next';
import { getCombo } from '../../../data-access/combos';

export async function generateMetadata({
  params: { comboId },
}: {
  params: { comboId: string };
}): Promise<Metadata> {
  const combo = await getCombo(comboId);

  return {
    title: {
      absolute: combo!.name + ' combo - Scapegoat' ?? 'Scapegoat',
      default: 'Scapegoat',
    },
  };
}

const ComboPage = async ({
  params: { comboId },
}: {
  params: { comboId: string };
}) => {
  const combo = await getCombo(comboId);

  return <div>{combo?.content}</div>;
};

export default ComboPage;
