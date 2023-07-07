import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Podcast = () => {
    return (
        <div className="text-indigo-800 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold mx-4 uppercase">Listen to Our Latest Interview</h1>
                <div className="px-4 flex items-center justify-center">
                    <div className="rounded-lg bg-indigo-100 p-1 w-full">
                        <iframe style={{borderRadius: '8px'}} src="https://open.spotify.com/embed/episode/63xhARhXMcyOyVbE0qa00s?utm_source=generator&t=0" width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold ml-4 uppercase">Other Recent Interviews</h2>
                <div className="flex flex-col gap-4 px-4">
                    <div className="flex flex-row items-center gap-3">
                        <div className="rounded-md p-2 flex-grow bg-indigo-100 font-semibold">
                            Mark Deppe, UCI ESports Director
                        </div>
                        <div className="flex flex-row gap-2">
                            <a href='#' className='h-8 w-8 flex flex-row items-center justify-center'>
                                <FontAwesomeIcon icon={faSpotify} fixedWidth size='2x' />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <div className="rounded-md p-2 flex-grow bg-indigo-100 font-semibold">
                            Adam Lopez, IVC Coordinator
                        </div>
                        <div className="flex flex-row gap-2">
                            <a href='#' className='h-8 w-8 flex flex-row items-center justify-center'>
                                <FontAwesomeIcon icon={faSpotify} fixedWidth size='2x' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end px-4">
                    <a href='#' className="text-sm font-semibold text-indigo-600 text-opacity-70 hover:text-opacity-100">More Podcasts!</a> 
                </div>
            </div>
        </div>
    );
};

export default Podcast;
