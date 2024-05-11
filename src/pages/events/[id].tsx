import { EventDetail } from '@/entities/event';
import { trpc } from '@/shared/api';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Event() {
  const router = useRouter();
  const session = useSession();
  const eventId = Number(router.query.id);

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: eventId,
  });

  if (isLoading) {
    return 'Loading...';
  }

  if (session.status === 'unauthenticated') {
    return 'Forbidden';
  }

  if (!data) {
    return 'No data';
  }

  return (
    <EventDetail
      {...data}
      isAuthor={session.data?.user.id === data.authorId}
      id={eventId}
    />
  );
}
