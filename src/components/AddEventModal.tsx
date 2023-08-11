import { faClose } from "@fortawesome/free-solid-svg-icons";
import { type ChangeEvent, type FC, type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { uploadFiles } from "~/utils/uploadthing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AddEventModalProps = {
    open: boolean;
    onClose?: () => void;
};

const AddEventModal: FC<AddEventModalProps> = ({ open, onClose }) => {
    const [completed, setCompleted] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventUrl, setEventUrl] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [eventImage, setEventImage] = useState<File>()
    const [eventImageDataUri, setEventImageDataUri] = useState<string | null>(null);

    const submitEventMutation = api.misc.submitEvent.useMutation();

    function formSubmit(e: FormEvent) {
        e.preventDefault();

        if (eventImage) {
            const files = [ // construct a list of files
                eventImage,
            ];
            
            uploadFiles({
                files,
                endpoint: "imageUploader",
            }).then(async (res) => {
                setEventImageDataUri(res[0]!.url)

                await submitEventMutation.mutateAsync({
                    eventTitle,
                    eventDescription,
                    eventUrl,
                    eventOrganizer,
                    eventImage: res[0]!.url,
                    sponsor: false
                });

                setCompleted(true);
            }).catch(console.error);
            
        }
    }

    function uploadFile(e: ChangeEvent<HTMLInputElement>) {
        const image = e.target.files![0];
        setEventImage(image);
    }

    function close() {
        setEventTitle('');
        setEventOrganizer('');
        setEventDescription('');
        setEventUrl('');
        setEventImageDataUri(null);
        setCompleted(false);

        onClose?.();
    }

    return (
        <>
            {open && <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-20 flex flex-col items-center justify-center">
                <div aria-modal className="bg-indigo-100 text-indigo-900 w-full px-4 py-8 md:px-8 md:rounded-lg md:shadow-2xl md:w-1/2 md:h-3/4 flex flex-col">
                    <div className="flex flex-row items-center justify-end">
                        <button onClick={close} className="text-indigo-400 text-2xl rounded-md self-center">
                            <FontAwesomeIcon icon={faClose} fixedWidth></FontAwesomeIcon>
                        </button>
                    </div>
                    
                    { completed ?
                        <>
                            <div className="flex flex-col justify-center items-center w-full flex-grow">
                                <h2 className="text-5xl font-light mb-8 md:mb-16 inline-auto">{eventTitle} has been submitted for review</h2>
                            </div>

                            <div className="flex flex-row justify-end items-center justify-self-end w-full">
                                <button className="text-white font-semibold bg-indigo-800 flex flex-row p-2 rounded-md self-center justify-center justify-self-end" onClick={close}>Close modal</button>
                            </div>
                        </>
                    : 
                        <form onSubmit={formSubmit} className="flex flex-col w-full flex-grow">
                            <div className="flex-grow w-full flex-col items-center">
                                <h2 className="text-5xl font-light mb-8 md:mb-16 inline-block">Add an Event</h2>
                                <div className="grid w-full columns-1 md:columns-2 gap-4">
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="eventTitle" className="text-sm font-semibold">Event Title</label>
                                        <input
                                            type="text"
                                            name='eventTitle'
                                            id='eventTitle'
                                            required
                                            aria-required
                                            value={eventTitle}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEventTitle(e.target.value)}
                                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="eventUrl" className="text-sm font-semibold">Event URL</label>
                                        <input
                                            type="url"
                                            name='eventUrl'
                                            id='eventUrl'
                                            required
                                            aria-required
                                            value={eventUrl}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEventUrl(e.target.value)}
                                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="eventOrganizer" className="text-sm font-semibold">Event Organizer</label>
                                        <input
                                            type="text"
                                            name='eventOrganizer'
                                            id='eventOrganizer'
                                            required
                                            aria-required
                                            value={eventOrganizer}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEventOrganizer(e.target.value)}
                                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                        />
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <div className='flex flex-col gap-2 flex-grow'>
                                            <label htmlFor="eventImage" className="text-sm font-semibold">Event Image</label>
                                            <input
                                                type="file"
                                                name='eventImage'
                                                id='eventImage'
                                                required
                                                aria-required
                                                onChange={uploadFile}
                                                className="p-0 w-full rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border border-indigo-200 hover:border-indigo-300 hover:ring hover:ring-indigo-200 hover:ring-opacity-50 file:rounded-l-md file:transition-colors file:py-2 file:px-3 file:mr-2 file:text-indigo-700 file:font-bold file:border-0 file:bg-transparent file:border-indigo-200 file:hover:border-indigo-300 file:border-r file:border-solid" 
                                            />
                                        </div>

                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        {eventImageDataUri && <img src={eventImageDataUri} className="rounded-md h-[4.375rem] w-auto" alt="Event image" />}
                                    </div>
                                    <div className='flex flex-col gap-2 col-span-1 md:col-span-2'>
                                        <label htmlFor="eventDescription" className="text-sm font-semibold">Describe the event</label>
                                        <textarea
                                            name='eventDescription'
                                            id='eventDescription'
                                            required
                                            aria-required
                                            value={eventDescription}
                                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEventDescription(e.target.value)}
                                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none max-h-48" 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <button type="submit" className="text-white font-semibold bg-indigo-800 w-full flex flex-row p-2 rounded-md self-center uppercase col-span-1 md:col-span-2 justify-center justify-self-end">Submit</button>
                        </form>
                    }
                </div>
            </div>}
        </>
    );
};

export default AddEventModal;