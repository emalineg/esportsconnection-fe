import { type FormEvent, useState, ChangeEvent } from "react";
import { api } from "~/utils/api";

const GuestForm = () => {
    const submitGuestMutation = api.misc.submitGuest.useMutation();

    const [guestName, setGuestName] = useState('');
    const [guestContact, setGuestContact] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [submitterContact, setSubmitterContact] = useState('');
    const [description, setDescription] = useState('');

    const formSubmit = (_: FormEvent) => {
        submitGuestMutation.mutate({
            guestName,
            guestContact,
            submitterName,
            submitterContact,
            description,
        });
    }

    return(
        <div className="text-indigo-900 w-full px-4">
            <div className="flex flex-col gap-4 bg-indigo-100 rounded-md justify-center items-center p-4">
                <h1 className="text-center text-xl uppercase font-semibold">Suggest a Guest!</h1>
                <p className="text-sm text-center">We love our local esports community and want to make sure we are representing it accurately with those we bring onto our podcast.</p>
                <p className="text-sm text-center mt-3 font-bold">If you know someone that should be invited as a guest, please let us know!</p>
                
                <form onSubmit={formSubmit} className="grid w-full md:w-1/2 columns-1 md:columns-2 gap-4">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="guestName" className="text-sm font-semibold">Guest Name</label>
                        <input
                            type="text"
                            name='guestName'
                            id='guestName'
                            required
                            aria-required
                            value={guestName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGuestName(e.target.value)}
                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="guestContact" className="text-sm font-semibold">Guest Contact Details</label>
                        <input
                            type="text"
                            name='guestContact'
                            id='guestContact'
                            required
                            aria-required
                            value={guestContact}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGuestContact(e.target.value)}
                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="submitterName" className="text-sm font-semibold">Your Name (Optional)</label>
                        <input
                            type="text"
                            name='submitterName'
                            id='submitterName'
                            value={submitterName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSubmitterName(e.target.value)}
                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="submitterContact" className="text-sm font-semibold">Your Contact Details (Optional)</label>
                        <input
                            type="text"
                            name='submitterContact'
                            id='submitterContact'
                            value={submitterContact}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSubmitterContact(e.target.value)}
                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        />
                    </div>
                    <div className='flex flex-col gap-2 col-span-1 md:col-span-2'>
                        <label htmlFor="description" className="text-sm font-semibold">What impact has this individual had on the world of esports?</label>
                        <textarea
                            name='description'
                            id='description'
                            required
                            aria-required
                            value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            className="p-2 rounded-md placeholder:text-indigo-400 text-indigo-900 bg-indigo-50 border-indigo-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                        />
                    </div>
                    <button className="text-white font-semibold bg-indigo-800 flex flex-row p-2 rounded-md self-center uppercase col-span-1 md:col-span-2 justify-center">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default GuestForm;
