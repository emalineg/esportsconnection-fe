import { type GetServerSideProps, type NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Footer from "~/components/Footer";
import Nav from "~/components/Nav";
import { type Event as DbEvent } from "@prisma/client";
import { prisma } from "~/server/db";
import EventCard from "~/components/EventCard";

type EventsPageSSP = {
  events: (DbEvent)[],
}

const EventsPage: NextPage<EventsPageSSP> = ({ events }) => {
    return(
        <>
            <Head>
                <NextSeo
                    title="Events"
                />
            </Head>
            <main className="flex min-h-screen flex-col items-center bg-indigo-200 w-full">
                <Nav />

                <div className="container max-w-screen-xl flex-grow text-indigo-900 flex flex-col items-center justify-center py-8">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold">Events</h2>
                        <p className="font-light text-indigo-600 lg:mb-16 sm:text-xl">Tagline</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 px-4">
                        {events.map(e => (<EventCard event={e} key={e.id} />))}
                    </div>
                </div>

                <Footer/>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<EventsPageSSP> = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: {
      approved: true,
    },
  });

  return {
    props: {
      events: events.map(it => ({
        ...it,
        // below makes next shut up about date serialization, then tells TS to shut up about type mismatch
        createdAt: it.createdAt.toISOString() as unknown as Date,
        updatedAt: it.updatedAt.toISOString() as unknown as Date,
      })),
    }
  }
}

export default EventsPage;
