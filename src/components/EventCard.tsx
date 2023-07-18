import { type Event as DbEvent } from "@prisma/client";
import Link from "next/link";
import { type FC } from "react";

type EventCardProps = {
    event: DbEvent;
};

const EventCard: FC<EventCardProps> = ({ event }) => {
    return (
        <Link href={`/events/${event.id}`} className="flex flex-row bg-indigo-100 rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="flex-grow-0" src={event.image} alt={`${event.title} image`} />

            <div className="flex flex-col p-4 gap-2">
                <h4 className="text-xl font-bold">{event.title}</h4>
                <p className="">{event.description}</p>
            </div>
        </Link>
    );
};

export default EventCard;