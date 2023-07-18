import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import { type Event as DbEvent } from "@prisma/client";
import Footer from "~/components/Footer";
import Nav from "~/components/Nav";
import Head from "next/head";

type EventViewPageSSP = {
    event: DbEvent
};

const EventViewPage: NextPage<EventViewPageSSP> = ({ event }) => {
    return (
        <>
            <Head>
                <title>{event.title} - OC Talk Radio</title>
                <meta name="description" content={event.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center bg-indigo-200 w-full">
                <Nav />

                <div className="container max-w-screen-xl flex-grow text-indigo-900 flex flex-col items-center justify-center py-8">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold">{event.title}</h2>
                        <p className="font-light text-indigo-600 lg:mb-16 sm:text-xl">{event.organizer}</p>
                    </div>
                    {/* todo: event details */}
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
            event,
        },
    };
};

export default EventViewPage;