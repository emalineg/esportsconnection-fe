import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import AdminNavbar from "~/components/admin/Navbars/AdminNavbar";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import HeaderActions from "~/components/admin/headers/HeaderActions";
import { prisma } from "~/server/db";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

type AdminEventsIndexPageSSP = {
  events: {
    id: string;
    title: string;
    approved: boolean;
    sponsorship: boolean;
    sponsorName: string | null;
    sponsorEmail: string | null;
    url: string;
    organizer: string;
  }[];
}

const AdminEventsIndexPage: NextPage<AdminEventsIndexPageSSP> = ({ events: sspEvents }) => {
  const [events] = useState(sspEvents);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <NextSeo
            title="Events - ESportsConnection Admin"
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
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-700">
                      Events
                    </h3>
                  </div>
                  {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-sky-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => void fetchEpisodes()}
                    >
                      Fetch Latest Episodes 
                    </button>
                  </div> */}
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Title
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        URL
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Organizer
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Sponsor Info
                      </th>
                      <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Approved?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event.id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {event.title}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <a href={event.url} target="blank" rel="noreferrer noopener nofollow" className="text-md text-sky-500 font-bold underline underline-offset-1">{event.url}</a>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {event.organizer}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {event.sponsorship ? <span>{event.sponsorName} &middot; <a href={`mailto:${event.sponsorEmail}`} className="text-md text-sky-500 font-bold underline underline-offset-1">{event.sponsorEmail}</a></span> : "No Sponsor"}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          <FontAwesomeIcon fixedWidth icon={event.approved ? faCheck : faX} className={event.approved ? "text-green-500" : "text-red-500"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<AdminEventsIndexPageSSP> = async () => {
  const events = await prisma.event.findMany();

  return {
    props: {
      events: events.map(it => ({
        id: it.id,
        approved: it.approved,
        title: it.title,
        organizer: it.organizer,
        sponsorship: it.sponsorship,
        sponsorEmail: it.sponsorEmail,
        sponsorName: it.sponsorName,
        url: it.url,
      })),
    }
  }
}

export default AdminEventsIndexPage;