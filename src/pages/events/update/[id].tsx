import { UpdateEventForm } from '@/features/edit-event';
import { UpdateEventSchema, trpc } from '@/shared/api';
import { useRouter } from 'next/router';

export default function UpdateEvent() {
  const router = useRouter();
  const { data } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  const { mutate } = trpc.event.update.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`);
    },
  });

  const handleSubmit = (data: UpdateEventSchema) => {
    mutate(data);
  };

  if (!data) return null;

  const { title, description, date } = data;

  return (
    <UpdateEventForm
      onSubmit={handleSubmit}
      defaultValues={{
        title,
        description: description ?? '',
        date,
      }}
    />
  );
}
