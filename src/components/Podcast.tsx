const Podcast = () => {
    return(
        <div>
            <div>
                <div className="text-white" >
                    <div>
                        <h1>LISTEN TO OUR LATEST INTERVIEW</h1>
                        <div className="pl-5">
                            <div>
                                podcast embed
                            </div>
                        </div>
                     </div>
                    <div>
                        <h2>OTHER RECENT INTERVIEWS</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                            <div className="pl-5">
                        <div className="col-start-1 col-end-4 bg-indigo-500 rounded-md">list</div>
                             </div>
                             </div>
                        <div className="col-start-4 col-end-4">icons</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}   
export default Podcast;
