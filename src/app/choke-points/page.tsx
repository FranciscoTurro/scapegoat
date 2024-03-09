import { Button } from '../../components/ui/button';
import { auth } from '../../lib/auth/auth';

const ChokePage = async () => {
  const session = await auth();

  if (!session || !session.user) return <div>error i guess?</div>;

  return (
    <div>
      <p>chokers waiting room</p>
      {session.user.role == 'admin' ? <Button>hoochie mama</Button> : null}
    </div>
  );
};

export default ChokePage;
