import { trpc } from '@/shared/api';
import { useRouter } from 'next/router';

type EditEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const EditEventButton = ({ eventId }: EditEventButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/update/${eventId}`);
  };

  return (
    <button
      className='h-10 px-6 font-semibold rounded-md bg-indigo-600 text-white'
      onClick={handleClick}
    >
      Редактировать
    </button>
  );
};
