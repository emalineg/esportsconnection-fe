import { type Event as DbEvent } from "@prisma/client";
import Link from "next/link";
import { type FC } from "react";

type EventCardProps = {
    event: DbEvent;
};

const EventCard: FC<EventCardProps> = ({ event }) => {
    return (
        <Link href={`/events/${event.id}`} className="flex flex-row bg-indigo-100 max-h-32 rounded-md">
            <img className="object-cover md:object-contain h-32 w-32 md:h-full md:w-auto rounded-l-md" src={event.image} alt={`${event.title} image`} />

            <div className="flex flex-col p-4 gap-2">
                <h4 className="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden">{event.title}</h4>
                <p className="text-ellipsis line-clamp-2">{event.description}</p>
            </div>
        </Link>
    );
};

export default EventCard;