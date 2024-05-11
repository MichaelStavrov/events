import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export const UpdateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
  id: z.number().optional(),
});

export type CreateEventSchema = z.infer<typeof CreateEventSchema>;
export type UpdateEventSchema = z.infer<typeof UpdateEventSchema>;

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const LeaveEventSchema = z.object({
  id: z.number().int().positive(),
});
