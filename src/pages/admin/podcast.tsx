import type { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

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
      <main>
        <button onClick={() => void fetchEpisodes()}>Fetch latest episodes</button>

        {data && <>
          
        </>}
      </main>
    </>
  )
}

export default AdminPodcastPage;