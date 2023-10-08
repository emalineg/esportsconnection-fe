import { z } from "zod";
import PodbeanAPI from 'podbean.js';
import { env } from "~/env.mjs";

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
        const podbean = new PodbeanAPI({
            clientId: env.PODBEAN_CLIENT_ID,
            clientSecret: env.PODBEAN_CLIENT_SECRET,
            userAgent: 'ESportsConnection/1.0.0'
        });
        await podbean.login();
        const [episodes] = await podbean.fetchEpisodes(0, 3);
        await ctx.prisma.podcastEpisode.deleteMany(); // drop all records

        return await Promise.all(episodes.map(async (it) => await ctx.prisma.podcastEpisode.create({
            data: {
                id: it.id,
                title: it.title,
            },
        })));
    }),
});
