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
});
