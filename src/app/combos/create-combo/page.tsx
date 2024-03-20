import { Metadata } from 'next';
import { getCards } from '../../../data-access/cards';
import { ComboWizard } from '../_components/combo-wizard';

export const metadata: Metadata = {
  title: 'Create a combo - Scapegoat',
};

const CreateComboPage = async () => {
  const cards = await getCards();

  return (
    <div>
      <ComboWizard cards={cards} />
    </div>
  );
};

export default CreateComboPage;
