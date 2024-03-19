import { Metadata } from 'next';
import { getCards } from '../../data-access/cards';
import { HandSimulator } from './hand-simulator';

export const metadata: Metadata = {
  title: 'Hand simulator - Scapegoat',
};

const HandSimulatorPage = async () => {
  const cards = await getCards();

  return <HandSimulator cards={cards} />;
};

export default HandSimulatorPage;
