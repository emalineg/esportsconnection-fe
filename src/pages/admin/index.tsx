import type { NextPage } from "next";
import Head from "next/head";
import AdminNavbar from "~/components/admin/Navbars/AdminNavbar";
import Sidebar from "~/components/admin/Sidebar/Sidebar";
import HeaderActions from "~/components/admin/headers/HeaderActions";

const AdminIndexPage: NextPage = () => {
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
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminIndexPage;