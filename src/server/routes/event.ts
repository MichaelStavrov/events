import {
  CreateEventSchema,
  JoinEventSchema,
  LeaveEventSchema,
  UpdateEventSchema,
} from '@/shared/api';
import { prisma } from '../db';
import { isAuth, procedure, router } from '../trpc';
import { z } from 'zod';

export const eventRouter = router({
  findMany: procedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    });

    const data = events.map(({ participations, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
      isEventAuthor: event.authorId === user?.id,
    }));
    console.log('data ', data);

    return data;
  }),
  findUnique: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        select: {
          authorId: true,
          title: true,
          description: true,
          date: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  create: procedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      });
    }),
  update: procedure
    .input(UpdateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      console.log('dd');

      return prisma.event.update({
        where: { id: input.id },
        data: {
          authorId: user.id,
          ...input,
        },
      });
    }),
  join: procedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      });
    }),
  leave: procedure
    .input(LeaveEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.delete({
        where: {
          userId_eventId: {
            eventId: input.id,
            userId: user.id,
          },
        },
      });
    }),
});
