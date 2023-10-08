import { useState } from "react";
import AddEventModal from "./AddEventModal";
import Link from "next/link";
import { api } from "~/utils/api";
import EventCard from "./EventCard";

const Events = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const recentEventsQuery = api.misc.recentEvents.useQuery();

    return(
        <div className="text-indigo-900 flex flex-col gap-4 w-full">
            <AddEventModal open={modalOpen} onClose={() => setModalOpen(false)} />
            <div className="flex flex-col gap-4 px-4">
                <h1 className="text-xl font-semibold mx-0 uppercase">Local Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {recentEventsQuery.data && recentEventsQuery.data.map(it => (<EventCard key={it.id} event={it} />))}
                </div>
            </div>
            <div className="eventButtons gap-4 p-4">
                <div className="bg-indigo-100 rounded-md flex flex-col items-center justify-center p-2">
                    <img src="/uci.png" alt="UCI EVENTS" className="max-h-16" />
                </div>
                <div className="flex flex-col gap-2">
                    <Link href="/events" className="bg-indigo-800 p-2 flex flex-row text-sm text-white font-semibold rounded-md">SEE ALL EVENTS</Link>
                    <button className="bg-indigo-600 p-2 flex flex-row text-sm text-white font-semibold rounded-md cursor-pointer" onClick={() => setModalOpen(true)}>ADD AN EVENT</button>
                </div>
                <div className="bg-indigo-100 rounded-md flex flex-col items-center justify-center p-2">
                    <img src="/ivc.png" alt="IVC EVENTS" className="max-h-16" />
                </div>
            </div>
        </div>
    );
};

export default Events;
