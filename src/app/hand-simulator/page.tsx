import { getCards } from '../../data-access/cards';
import { HandSimulator } from './hand-simulator';

const HandSimulatorPage = async () => {
  const cards = await getCards();

  return <HandSimulator cards={cards} />;
};

export default HandSimulatorPage;
