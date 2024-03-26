import { Metadata } from 'next';
import { getCardsInfo } from '../../../data-access/cards';
import { ComboWizard } from '../_components/combo-wizard';

export const metadata: Metadata = {
  title: 'Create a combo - Scapegoat',
};

const CreateComboPage = async () => {
  const cards = await getCardsInfo();

  return (
    <div>
      <ComboWizard cards={cards} />{' '}
      {/*CAN do read only https://tiptap.dev/docs/editor/guide/output*/}
    </div>
  );
};

export default CreateComboPage;
