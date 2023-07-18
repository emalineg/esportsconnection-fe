import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const miscRouter = createTRPCRouter({
  submitGuest: publicProcedure
    .input(z.object({
      guestName: z.string(),
      guestContact: z.string(),
      submitterName: z.string().optional(),
      submitterContact: z.string().optional(),
      description: z.string(),
    }))
    .mutation(({ input }) => {
      return {
        
      };
    }),

  submitEvent: publicProcedure
    .input(z.object({
      eventTitle: z.string(),
      eventUrl: z.string().url(),
      eventDescription: z.string(),
      eventOrganizer: z.string(),
      eventImage: z.string(),
      sponsor: z.boolean(),
      sponsorEmail: z.string().email().optional(),
      sponsorName: z.string().optional(),
    }))
    .mutation(({ input, ctx }) => ctx.prisma.event.create({
      data: {
        title: input.eventTitle,
        url: input.eventUrl,
        sponsorship: input.sponsor, 
        description: input.eventDescription,
        image: input.eventImage,
        organizer: input.eventOrganizer,
        sponsorEmail: input.sponsorEmail,
        sponsorName: input.sponsorName,
      }
    })),

  recentEvents: publicProcedure.input(z.object({
    amount: z.number().optional().default(2)
  }).optional().default({ amount: 2 })).query(({ input, ctx }) => ctx.prisma.event.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    where: {
      approved: true,
    },
    take: input.amount,
  })),
});
