import { trpc } from '@/shared/api';

type LeaveEventButtonProps = {
  eventId: number;
  onSuccess?: () => void;
};

export const LeaveEventButton = ({
  eventId,
  onSuccess,
}: LeaveEventButtonProps) => {
  const { mutate } = trpc.event.leave.useMutation({ onSuccess });

  const handleClick = () => {
    mutate({ id: eventId });
  };

  return (
    <button
      className='h-10 px-6 font-semibold rounded-md bg-rose-600 text-white'
      onClick={handleClick}
    >
      Покинуть
    </button>
  );
};
