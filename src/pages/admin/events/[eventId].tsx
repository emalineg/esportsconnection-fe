import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "~/server/db";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { type FormEvent, useMemo, useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import AdminNavbar from "~/components/admin/Navbars/AdminNavbar";
import HeaderActions from "~/components/admin/headers/HeaderActions";
import { signIn, useSession } from "next-auth/react";
// import { getServerAuthSession } from "~/server/auth";

type EventAdminPageSSP = {
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
    }
};

const EventAdminPage: NextPage<EventAdminPageSSP> = ({ event: sspEvent }) => {
    useSession({
        required: true,
        async onUnauthenticated() {
            await signIn()
        },
    });

    const [event, setEvent] = useState(sspEvent);

    const unsaved = useMemo(() => {
        if (event.title !== sspEvent.title) return true;
        if (event.description !== sspEvent.description) return true;
        if (event.url !== sspEvent.url) return true;
        if (event.organizer !== sspEvent.organizer) return true;
        if (event.sponsorship !== sspEvent.sponsorship) return true;
        if (event.sponsorName !== sspEvent.sponsorName) return true;
        if (event.sponsorEmail !== sspEvent.sponsorEmail) return true;

        return false;
    }, [event, sspEvent])
    const approveEventMutation = api.admin.approveEvent.useMutation();
    const denyEventMutation = api.admin.denyEvent.useMutation();
    const updateEventMutation = api.admin.updateEvent.useMutation();
    const router = useRouter();

    function approveEvent() {
        approveEventMutation.mutateAsync({ eventId: sspEvent.id }).then(() => {
            setEvent((oldEvent) => ({...oldEvent, approved: true})); // fuck it, no refetch
        }).catch(console.error);
    }

    function denyEvent() {
        denyEventMutation.mutateAsync({ eventId: sspEvent.id }).then(async () => {
            await router.push('/admin/events')
        }).catch(console.error);
    }

    async function saveEvent(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await updateEventMutation.mutateAsync({
            eventId: sspEvent.id,
            updateData: {
                title: event.title,
                url: event.url,
                organizer: event.organizer,
                description: event.description,
                sponsorship: event.sponsorship,
                sponsorEmail: event.sponsorEmail,
                sponsorName: event.sponsorName,
            }
        })

        // refresh ssp
        await router.replace(router.asPath);
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
            <main className="absolute top-0 bottom-0 left-0 right-0 flex flex-row">
                <Sidebar />
                <div className="relative ml-64 flex-grow bg-gray-100">
                    <AdminNavbar />
                    <HeaderActions />
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-gray-700 text-xl font-bold">Event - {event.title} {!event.approved && `(Not Approved)`}</h6>

                                    {!event.approved && <div className="flex gap-4">    
                                        <button className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={approveEvent}>Approve Event</button>
                                        <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" onClick={denyEvent}>Deny Event (delete from DB)</button>
                                    </div>}
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={(e) => void saveEvent(e)}>
                                    <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Event Details
                                    </h6>

                                    <div className="flex flex-wrap">
                                        <div className="w-4/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    htmlFor="event-title"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    id="event-title"
                                                    value={event.title}
                                                    onChange={(e) => setEvent((oldEvent) => ({...oldEvent, title: e.target.value}))}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-4/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    htmlFor="event-url"
                                                >
                                                    URL
                                                </label>
                                                <input
                                                    type="url"
                                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    id="event-url"
                                                    value={event.url}
                                                    onChange={(e) => setEvent((oldEvent) => ({...oldEvent, url: e.target.value}))}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-4/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    htmlFor="event-organizer"
                                                >
                                                    Organizer
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    id="event-organizer"
                                                    value={event.organizer}
                                                    onChange={(e) => setEvent((oldEvent) => ({...oldEvent, organizer: e.target.value}))}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    htmlFor="event-description"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    cols={1}
                                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full max-w-full ease-linear transition-all duration-150"
                                                    id="event-description"
                                                    value={event.description}
                                                    onChange={(e) => setEvent((oldEvent) => ({...oldEvent, description: e.target.value}))}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-12/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                    htmlFor="event-sponsorship"
                                                >
                                                    Sponsored
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    className="border-0 px-3 py-3 placeholder-gray-300 text-sky-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                                                    id="event-sponsorship"
                                                    checked={event.sponsorship}
                                                    onChange={(e) => setEvent((oldEvent) => ({...oldEvent, sponsorship: e.target.checked}))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {event.sponsorship && <>
                                        <hr className="mt-6 border-b-1 border-gray-300" />

                                        <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Sponsorship Settings
                                        </h6>
                                        
                                        <div className="flex flex-wrap">
                                            <div className="w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        htmlFor="event-sponsor-name"
                                                    >
                                                        Sponsor Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        id="event-title"
                                                        value={event.sponsorName ?? ""}
                                                        onChange={(e) => setEvent((oldEvent) => ({...oldEvent, sponsorName: e.target.value === "" ? null : e.target.value}))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                                        htmlFor="event-sponsor-email"
                                                    >
                                                        Sponsor Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        id="event-sponsor-email"
                                                        value={event.sponsorEmail ?? ""}
                                                        onChange={(e) => setEvent((oldEvent) => ({...oldEvent, sponsorEmail: e.target.value === "" ? null : e.target.value}))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>}

                                    {unsaved && <button className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">Save</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <main>
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
            </main> */}
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

    return {
        props: {
            event: {
                id: event.id,
                title: event.title,
                url: event.url,
                image: event.image,
                description: event.description,
                organizer: event.organizer,
                sponsorship: event.sponsorship,
                sponsorName: event.sponsorName,
                sponsorEmail: event.sponsorEmail,
                approved: event.approved,
            },
        },
    };
};

export default EventAdminPage;