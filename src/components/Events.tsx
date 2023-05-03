const Events = () => {
    return(
        <div className="text-white">
            <div>
                <h1>LOCAL EVENTS:</h1>
                <div className="bg-indigo-500">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-rows-2 m-5">
                           <div>[event image]</div>
                           <div>[title of event]</div>
                        </div>
                        <div className="grid grid-rows-2 m-5">
                           <div>[event image]</div>
                           <div>[title of event]</div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-indigo-500 rounded-md">UCI EVENTS</div>
                <div className="bg-indigo-500 rounded-md">ALL EVENTS</div>
                <div className="bg-indigo-500 rounded-md">IVC EVENTS</div>
                
            </div>
           
        </div>
        
    )
}   
export default Events;
