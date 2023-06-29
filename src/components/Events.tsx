const Events = () => {
    return(
        <div className="text-indigo-900 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 md:px-4">
                <h1 className="text-xl font-semibold mx-4 uppercase md:mx-0">Local Events</h1>
                <div className="grid grid-cols-2 md:gap-4">
                    <div className="bg-indigo-100 flex flex-col items-center p-4 gap-2 md:rounded-md">
                       <div>[event image]</div>
                       <div>[title of event]</div>
                    </div>
                    <div className="bg-indigo-100 flex flex-col items-center p-4 gap-2 md:rounded-md">
                       <div>[event image]</div>
                       <div>[title of event]</div>
                    </div>
                </div>
            </div>
            <div className="eventButtons gap-4 p-4">
                <div className="bg-indigo-100 rounded-md flex flex-col items-center justify-center p-2">
                    <img src="/uci.png" alt="UCI EVENTS" className="max-h-16" />
                </div>
                <div className="flex flex-col gap-2">
                    <button className="bg-indigo-800 p-2 flex flex-row text-sm text-white font-semibold rounded-md">SEE ALL EVENTS</button>
                    <button className="bg-indigo-600 p-2 flex flex-row text-sm text-white font-semibold rounded-md">ADD AN EVENT</button>
                </div>
                <div className="bg-indigo-100 rounded-md flex flex-col items-center justify-center p-2">
                    <img src="/ivc.png" alt="IVC EVENTS" className="max-h-16" />
                </div>
            </div>
        </div>
    );
};

export default Events;
