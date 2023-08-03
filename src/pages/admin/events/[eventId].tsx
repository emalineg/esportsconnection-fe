import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import { type Event as DbEvent } from "@prisma/client";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type EventAdminPageSSP = {
    event: DbEvent
};

const EventAdminPage: NextPage<EventAdminPageSSP> = ({ event }) => {
    const [thisEvent, setThisEvent] = useState(event);
    const approveEventMutation = api.admin.approveEvent.useMutation();
    const denyEventMutation = api.admin.denyEvent.useMutation();
    const router = useRouter();

    function approveEvent() {
        approveEventMutation.mutateAsync({ eventId: event.id }).then(() => {
            setThisEvent((oldEvent) => ({...oldEvent, approved: true})); // fuck it, no refetch
        }).catch(console.error);
    }

    function denyEvent() {
        denyEventMutation.mutateAsync({ eventId: event.id }).then(async () => {
            await router.push('/')
        }).catch(console.error);
    }

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <NextSeo
                    title={event.title}
                    description={event.description}
                    noindex
                    nofollow
                    robotsProps={{
                        noimageindex: true,
                        noarchive: true,
                        nosnippet: true,
                    }}
                />
            </Head>
            <main>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <b>Title</b>
                            </td>
                            <td>
                                {thisEvent.title}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>URL</b>
                            </td>
                            <td>
                                <a href={thisEvent.url}>{thisEvent.url}</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Organizer</b>
                            </td>
                            <td>
                                {thisEvent.organizer}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Image</b>
                            </td>
                            <td>
                                <img src={thisEvent.image} alt="fuck off eslint" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Description</b>
                            </td>
                            <td>
                                <p>{thisEvent.description}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Approval status</b>
                            </td>
                            <td>
                                <b className={thisEvent.approved ? 'text-green-600' : 'text-red-600'}>{thisEvent.approved ? 'Approved' : 'Not Approved'}</b>
                            </td>
                        </tr>
                        {thisEvent.sponsorship && <>
                            <tr>
                                <td>
                                    <b>Sponsored</b>
                                </td>
                                <td>
                                    Yes
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Sponsor</b>
                                </td>
                                <td>
                                    {thisEvent.sponsorName}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Sponsor Email</b>
                                </td>
                                <td>
                                    {thisEvent.sponsorEmail}
                                </td>
                            </tr>
                        </>}
                    </tbody>
                </table>

                {!thisEvent.approved && <>
                    <button onClick={approveEvent}>Approve Event</button>
                    <button onClick={denyEvent}>Deny Event (delete from DB)</button>
                </>}
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<EventAdminPageSSP> = async ({ query }) => {
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

export default EventAdminPage;