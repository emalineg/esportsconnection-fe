const Events = () => {
    return(
        <div className="text-indigo-900 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
                <h1 className="text-lg font-bold ml-4">LOCAL EVENTS:</h1>
                <div className="bg-indigo-100">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center p-4 gap-2">
                           <div>[event image]</div>
                           <div>[title of event]</div>
                        </div>
                        <div className="flex flex-col items-center p-4 gap-2">
                           <div>[event image]</div>
                           <div>[title of event]</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="eventButtons gap-4 p-4">
                <div className="bg-indigo-100 rounded-md flex flex-col items-center justify-center">
                    <span className="font-bold">UCI<br />EVENTS</span>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="bg-indigo-800 p-2 flex flex-row text-sm text-white font-semibold rounded-md">SEE ALL EVENTS</button>
                    <button className="bg-indigo-600 p-2 flex flex-row text-sm text-white font-semibold rounded-md">ADD AN EVENT</button>
                </div>
                <div className="bg-indigo-100 rounded-md flex flex-col items-center justify-center">
                    <span className="font-bold">IVC<br />EVENTS</span>
                </div>
            </div>
        </div>
    );
};

export default Events;
