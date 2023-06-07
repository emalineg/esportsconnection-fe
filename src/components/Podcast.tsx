import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Podcast = () => {
    return (
        <div className="text-indigo-900 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-lg font-bold ml-4">LISTEN TO OUR LATEST INTERVIEW</h1>
                <div className="px-8 flex items-center justify-center">
                    <div className="rounded-lg bg-indigo-100 p-1 w-full">
                        [podcast embed]
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold ml-4">OTHER RECENT INTERVIEWS:</h2>
                <div className="flex flex-col gap-4 px-4 lg:px-8">
                    <div className="flex flex-row items-center gap-3">
                        <div className="rounded-md p-2 flex-grow bg-indigo-100">
                            MARK DEPPE, UCI ESPORTS DIRECTOR
                        </div>
                        <div className="flex flex-row gap-2">
                            <a href='#' className='h-8 w-8 flex flex-row items-center justify-center'>
                                <FontAwesomeIcon icon={faSpotify} fixedWidth />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <div className="rounded-md p-2 flex-grow bg-indigo-100">
                            ADAM LOPEZ, IVC COORDINATOR
                        </div>
                        <div className="flex flex-row gap-2">
                            <a href='#' className='h-8 w-8 flex flex-row items-center justify-center'>
                                <FontAwesomeIcon icon={faSpotify} fixedWidth />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end px-4">
                    <p className="text-sm underline">More Podcasts!</p> 
                </div>
            </div>
        </div>
    );
};

export default Podcast;
