import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import Footer from "~/components/Footer";
import Nav from "~/components/Nav";
import Head from "next/head";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

type EventViewPageSSP = {
    event: {
        id: string;
        title: string;
        url: string;
        image: string;
        description: string;
        organizer: string;
        sponsorship: boolean;
        sponsorName: string | null;
        sponsorEmail: string | null;
        approved: boolean;
        createdAt: string;
        updatedAt: string;
    }
};

const EventViewPage: NextPage<EventViewPageSSP> = ({ event }) => {
    return (
        <>
            <Head>
                <meta name="description" content={event.description} />
                <link rel="icon" href="/favicon.ico" />
                <NextSeo
                    title={event.title}
                    description={event.description}
                    openGraph={{
                        title: event.title,
                        description: event.description,
                        url: `https://<website>/events/${event.id}`, // todo: domain
                        type: 'article',
                        article: {
                            publishedTime: event.createdAt,
                            modifiedTime: event.updatedAt,
                        },
                    }}
                    twitter={{
                        cardType: ''
                    }}
                />
                <ArticleJsonLd
                    type="BlogPosting"
                    url={`https://<website>/events/${event.id}`} // todo: domain
                    title={event.title}
                    images={[
                        event.image
                    ]}
                    datePublished={event.createdAt}
                    dateModified={event.updatedAt}
                    authorName="OC Talk Radio"
                    description={event.description}
                />
            </Head>
            <main className="flex min-h-screen flex-col items-center bg-indigo-200 w-full">
                <Nav />

                <div className="container max-w-screen-xl flex-grow text-indigo-900 flex flex-col items-center justify-center py-8">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold">{event.title}</h2>
                        <p className="text-lg font-light text-indigo-600 mb-4 sm:text-xl">{event.organizer} {event.sponsorship && <> &middot; Sponsored by {event.sponsorName}</>}</p>
                        <a href={event.url} className="inline-flex items-center rounded-md px-2 py-0.5 bg-indigo-300 bg-opacity-0 hover:bg-opacity-50 text-indigo-600 lg:mb-16 sm:text-lg gap-2 transition-colors duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faGlobe} />
                            Visit Website
                        </a>
                    </div>
                    <p>{event.description}</p>
                </div>

                <Footer/>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<EventViewPageSSP> = async ({ query }) => {
    const eventId = query.eventId as string;

    const event = await prisma.event.findUnique({
        where: {
            id: eventId,
        },
    });

    if (!event) return {
        notFound: true,
    };

    if (!event.approved) return {
        notFound: true
    }

    return {
        props: {
            event: {
                ...event,
                createdAt: event.createdAt.toISOString(),
                updatedAt: event.updatedAt.toISOString(),
            },
        },
    };
};

export default EventViewPage;