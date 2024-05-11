import { EventCard } from '@/entities/event';
import { JoinEventButton } from '@/features/join-event';
import { LeaveEventButton } from '@/features/leave-event/ui/button';
import { trpc } from '@/shared/api';

export default function Home() {
  const { data, refetch } = trpc.event.findMany.useQuery();

  const getEventAction = (
    isEventAuthor: boolean,
    isJoined: boolean,
    eventId: number
  ) => {
    if (isEventAuthor) return null;

    return isJoined ? (
      <LeaveEventButton eventId={eventId} onSuccess={refetch} />
    ) : (
      <JoinEventButton eventId={eventId} onSuccess={refetch} />
    );
  };

  return (
    <ul>
      {data?.map((event) => (
        <li key={event.id} className='mb-6'>
          <EventCard
            {...event}
            action={getEventAction(
              event.isEventAuthor,
              event.isJoined,
              event.id
            )}
          />
        </li>
      ))}
    </ul>
  );
}
