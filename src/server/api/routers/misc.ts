import { z } from "zod";
import { mg } from "~/utils/mailgun";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";

export const miscRouter = createTRPCRouter({
  submitGuest: publicProcedure
    .input(z.object({
      guestName: z.string(),
      guestContact: z.string(),
      submitterName: z.string().optional(),
      submitterContact: z.string().optional(),
      description: z.string(),
    }))
    .mutation(async ({ input }) => {
      await mg.messages.create(env.MAILGUN_DOMAIN, {
        to: env.SEND_TO,
        from: `Guest Submission <guests@${env.MAILGUN_DOMAIN}>`,
        subject: `Guest submitted - ${input.guestName}`,
        text: `
        Guest: ${input.guestName}
        Guest Contact: ${input.guestContact}
        Submitter: ${input.submitterName || 'Empty'}
        Submitter Contact: ${input.submitterContact || 'Empty'}
        
        ${input.description}
        `,
      });
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
    .mutation(async ({ input, ctx }) => {
      const newEvent = await ctx.prisma.event.create({
        data: {
          title: input.eventTitle,
          url: input.eventUrl,
          sponsorship: input.sponsor, 
          description: input.eventDescription,
          image: input.eventImage,
          organizer: input.eventOrganizer,
          sponsorEmail: input.sponsorEmail,
          sponsorName: input.sponsorName,
        },
      });

      await mg.messages.create(env.MAILGUN_DOMAIN, {
        to: env.SEND_TO,
        from: `Event Submission <events@${env.MAILGUN_DOMAIN}>`,
        subject: `Event submitted - ${input.eventTitle}`,
        text: `
        Event Title: ${input.eventTitle}
        URL: ${input.eventUrl}

        Approve event at: ${env.NEXTAUTH_URL}/admin/events/${newEvent.id}
        `,
      })
    }),

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
  recentEpisodes: publicProcedure.query(async ({ ctx }) => {
    const [episodes] = await ctx.podbean.fetchEpisodes(0, 3);

    // tRPC doesn't like classes, only raw data. so here, we select the fields
    // we need and nothing else. Later, we may switch this to a DB system, but
    // we will definitely need to add more logic here to fetch and sanitize
    // embed HTML.
    return episodes.filter(it => it.status === 'publish').map(it => ({
      title: it.title,
      id: it.id,
    }));
  }),
});
