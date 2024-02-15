import { type PodcastEpisode } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import AdminNavbar from "~/components/admin/Navbars/AdminNavbar";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import HeaderActions from "~/components/admin/headers/HeaderActions";
import { api } from "~/utils/api";
import { useState } from 'react';
import { prisma } from "~/server/db";
import { NextSeo } from "next-seo";
import { signIn, useSession } from "next-auth/react";


type AdminPodcastPageSSP = {
  episodes: PodcastEpisode[];
};

const AdminPodcastPage: NextPage<AdminPodcastPageSSP> = ({ episodes: sspEpisodes }) => {
  useSession({
    required: true,
    async onUnauthenticated() {
      await signIn()
    },
  });

  const { data, refetch: fetchPodcastEpisodes } = api.admin.fetchLatestEpisodes.useQuery(undefined, {enabled: false});
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(sspEpisodes)

  async function fetchEpisodes() {
    await fetchPodcastEpisodes();

    if (data) {
      setEpisodes(data);
    } else {
      // Send error warning toast
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <NextSeo
            title="Podcast - ESportsConnection Admin"
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
        <Sidebar />
        <div className="relative ml-64 bg-gray-100 min-h-screen">
          <AdminNavbar />
          <HeaderActions />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-700">
                      Podcast Episodes
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-sky-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => void fetchEpisodes()}
                    >
                      Fetch Latest Episodes 
                    </button>
                  </div>
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
                        Podbean Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {episodes.map(episode => (
                      <tr key={episode.id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {episode.title}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <a href={episode.hyperlink} target="blank" rel="noreferrer noopener nofollow" className="text-md text-sky-500 font-bold underline underline-offset-1">View on Podbean</a>
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

export const getServerSideProps: GetServerSideProps<AdminPodcastPageSSP> = async ({}) => {
  const episodes = await prisma.podcastEpisode.findMany();

  return {
    props: {
      episodes,
    }
  }
}

export default AdminPodcastPage;