import { z } from "zod";
import { env } from "~/env.mjs";

type LoginResponseSuccess = {
    access_token: string;
    token_type: 'Bearer';
    scope: string;
    expires_in: number;
};

type EpisodeTypeEnum = 'public' | 'premium' | 'private';
type EpisodeStatusEnum = 'draft' | 'publish';
type AppleEpisodeTypeEnum = 'full' | 'trailer' | 'bonus';
type EpisodeExplicitContentEnum = 'clean' | 'explicit';

type EpisodeObject = {
    id: string;
    podcast_id: string;
    title: string;
    content: string;
    logo: string;
    media_url: string;
    player_url: string;
    permalink_url: string;
    publish_time: number; // DON'T USE THIS RAW - WRAP WITH DATETIME OBJECT
    duration: number | null;
    status: EpisodeStatusEnum;
    type: EpisodeTypeEnum;
    season_number: number;
    episode_number: number;
    apple_episode_type: AppleEpisodeTypeEnum;
    transcripts_url: string;
    content_explicit: EpisodeExplicitContentEnum;
    object: 'Episode';
};

type FetchMultipleEpisodesResponseSuccess = {
    episodes: EpisodeObject[];
    offset: number;
    limit: number;
    count: number;
    has_more: boolean;
}

type EmbedResponseSuccess = {
    version: "1.0";
    provider_name: "Podbean";
    provider_url: "http://podbean.org";
    width: number;
    height: number;
    type: "rich";
    html: string;
}

const PODBEAN_V1_API_BASE = 'https://api.podbean.com/v1';

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
    
    updateEvent: protectedProcedure.input(z.object({
        eventId: z.string(),
        updateData: z.object({
            title: z.string().min(1),
            url: z.string().min(1).url(),
            description: z.string().min(1).max(5000),
            organizer: z.string().min(1),
            sponsorship: z.boolean(),
            sponsorName: z.string().nullable(),
            sponsorEmail: z.string().nullable(),
        }),
    })).mutation(async ({ ctx, input }) => {
        await ctx.prisma.event.update({
            where: {
                id: input.eventId
            },
            data: {
                ...input.updateData,
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
        await ctx.prisma.podcastEpisode.deleteMany(); // drop all records
        const USER_AGENT = 'ESportsConnection/1.0.0';

        try {
            // Encode a basic auth header value with client id/secret
            const authBasic = btoa(`${env.PODBEAN_CLIENT_ID}:${env.PODBEAN_CLIENT_SECRET}`);
      
            const loginResp = await fetch(`${PODBEAN_V1_API_BASE}/oauth/token`, {
              method: 'POST',
              body: 'grant_type=client_credentials',
              headers: {
                'Authorization': `Basic ${authBasic}`,
                'User-Agent': USER_AGENT,
                'Content-Type': 'application/x-www-form-urlencoded', // OAuth requires urlencoded :/
              },
            })
      
            if (!loginResp.ok) throw await loginResp.json();
            
            const loginResponseData: LoginResponseSuccess = await loginResp.json() as LoginResponseSuccess;
            const accessToken = loginResponseData.access_token;

            const episodesResp = await fetch(`${PODBEAN_V1_API_BASE}/episodes?access_token=${accessToken}&offset=0&limit=3`)
          
            if (!episodesResp.ok) throw await episodesResp.json();
            const episodesResponseData: FetchMultipleEpisodesResponseSuccess = await episodesResp.json() as FetchMultipleEpisodesResponseSuccess;
            
            return await Promise.all(episodesResponseData.episodes.filter(it => it.status === 'publish').map(async (it) => {
                const embedResp = await fetch(`${PODBEAN_V1_API_BASE}/oembed?format=json&url=${it.permalink_url}`);
          
                if (!embedResp.ok) throw await episodesResp.json();
                const embedResponseData: EmbedResponseSuccess = await embedResp.json() as EmbedResponseSuccess;

                return await ctx.prisma.podcastEpisode.create({
                    data: {
                        id: it.id,
                        title: it.title,
                        hyperlink: it.permalink_url,
                        embedHtml: embedResponseData.html,
                    },
                })
            }))
        } catch (e) {
            console.error(e)
        }
    }),
});
