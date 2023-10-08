import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
    approveEvent: protectedProcedure.input(z.object({
        eventId: z.string(),
    })).mutation(async ({ ctx, input }) => {
        await ctx.prisma.event.update({
            where: {
                id: input.eventId
            },
            data: {
                approved: true,
            },
        });
    }),
    
    denyEvent: protectedProcedure.input(z.object({
        eventId: z.string(),
    })).mutation(async ({ ctx, input }) => {
        await ctx.prisma.event.delete({
            where: {
                id: input.eventId
            },
        });
    }),

    fetchLatestEpisodes: protectedProcedure.query(async ({ ctx }) => {
        const [episodes] = await ctx.podbean.fetchEpisodes(0, 3);
        await ctx.prisma.podcastEpisode.deleteMany(); // drop all records

        return await Promise.all(episodes.map(async (it) => await ctx.prisma.podcastEpisode.create({
            data: {
                id: it.id,
                title: it.title,
            },
        })));
    }),
});
