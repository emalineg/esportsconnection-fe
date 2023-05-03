const Podcast = () => {
    return(
        <div>
            <div>
                <div className="text-white" >
                    <div>
                        <h1>LISTEN TO OUR LATEST INTERVIEW</h1>
                        <div className="pl-5 flex items-center justify-center pb-4">
                            <div>
                                [podcast embed]
                            </div>
                        </div>
                     </div>
                    <div>
                        <h2>OTHER RECENT INTERVIEWS</h2>
                        <div>
                            <div>
                            <div className="grid grid-rows-2 gap-4 pl-5">
                     
                        <div className=" bg-indigo-500 rounded-md">[Guest Name, Insitution] [Podcast Icons]</div>
                        <div className=" bg-indigo-500 rounded-md">[Guest Name, Insitution] [Podcast Icons]</div>
      
                             </div>
                             <div>
                    <p className="text-xs text-right underline">More Podcasts!</p>
                </div>
                             </div>
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}   
export default Podcast;
