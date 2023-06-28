import { type FormEvent, useState } from "react";
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
                
                <form onSubmit={formSubmit}>
                    <button className="text-white font-semibold bg-indigo-800 flex flex-row p-2 rounded-md self-center uppercase">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default GuestForm;
