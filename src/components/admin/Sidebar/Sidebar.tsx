import Link from 'next/link'
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faGear, faPodcast } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const router = useRouter();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <Link
            className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            href="/"
          >
            Go to main site
          </Link>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
            }
          >
            <h6 className="w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              ESportsConnection Admin
            </h6>

            <ul className="flex-col w-full flex list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.asPath === "/admin" ? "text-sky-500 hover:text-sky-600" : "text-gray-700 hover:text-gray-500")
                  }
                  href="/admin/"
                >
                  <FontAwesomeIcon icon={faGear} className={
                    "mr-2 text-sm " +
                    (router.asPath === "/admin" ? "opacity-75" : "text-gray-300")
                  } fixedWidth />{" "}
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.asPath === "/admin/podcast" ? "text-sky-500 hover:text-sky-600" : "text-gray-700 hover:text-gray-500")
                  }
                  href="/admin/podcast"
                >
                  <FontAwesomeIcon icon={faPodcast} className={
                    "mr-2 text-sm " +
                    (router.asPath === "/admin/podcast" ? "opacity-75" : "text-gray-300")
                  } fixedWidth />{" "}
                  Podcast
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.asPath === "/admin/events" ? "text-sky-500 hover:text-sky-600" : "text-gray-700 hover:text-gray-500")
                  }
                  href="/admin/events"
                >
                  <FontAwesomeIcon icon={faCalendar} className={
                    "mr-2 text-sm " +
                    (router.asPath === "/admin/events" ? "opacity-75" : "text-gray-300")
                  } fixedWidth />{" "}
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
