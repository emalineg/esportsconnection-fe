import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import AdminNavbar from "~/components/admin/Navbars/AdminNavbar";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import HeaderActions from "~/components/admin/headers/HeaderActions";

const AdminIndexPage: NextPage = () => {
  useSession({
    required: true,
    async onUnauthenticated() {
      await signIn()
    },
  });
  
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <NextSeo
            title="ESportsConnection Admin"
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
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminIndexPage;