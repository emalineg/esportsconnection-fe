import { type PodcastEpisode } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import AdminNavbar from "~/components/admin/Navbars/AdminNavbar";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import HeaderActions from "~/components/admin/headers/HeaderActions";
import { api } from "~/utils/api";
import { type FC } from 'react';

type EpisodeSettingsProps = {
  episode: PodcastEpisode,

};

const EpisodeSettings: FC<EpisodeSettingsProps> = ({ episode }) => {
  return (
    <form>
      <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
        {episode.title}
      </h6>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-600 text-xs font-bold mb-2"
              htmlFor="episode-spotify"
            >
              Spotify URL
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value={episode.spotifyUrl ?? ""}
              id="episode-spotify"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

const AdminPodcastPage: NextPage = () => {
  const { data, refetch } = api.admin.fetchLatestEpisodes.useQuery(undefined, {
    enabled: false,
  });

  async function fetchEpisodes() {
    await refetch();

    if (data) {
      // send toast: "Episodes fetched!"
    } else {
      // Send error warning toast
    }
  }

  return (
    <>
      <Head>
        
      </Head>

      <main className="absolute top-0 bottom-0 left-0 right-0 flex flex-row">
        <Sidebar />
        <div className="relative flex-grow bg-gray-100">
          <AdminNavbar />
          <HeaderActions />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-gray-700 text-xl font-bold">Podcast Episodes</h6>
                  <button
                    className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => void fetchEpisodes()}
                  >
                    Fetch latest episodes
                  </button>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {data && data.map((episode, idx) => {
                  return (
                    <>
                      <EpisodeSettings episode={episode} />
                      {idx !== data.length - 1 && <hr className="mt-6 border-b-1 border-gray-300" />}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminPodcastPage;