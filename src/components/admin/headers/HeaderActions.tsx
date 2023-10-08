import { faCalendar, faPodcast } from "@fortawesome/free-solid-svg-icons";
import CardAction from "../Cards/CardAction";


export default function HeaderActions() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-sky-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardAction title="Manage Podcast Episodes" href="/admin/podcast" icon={faPodcast} iconColor="bg-green-500" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardAction title="Manage Events" href="/admin/events" icon={faCalendar} iconColor="bg-orange-500" />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}