import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    return(
        <header className="flex flex-col items-center gap-3 justify-center text-indigo-900 mb-8">
            <div className='flex flex-col items-center'>
                <img src="/Logo.png" alt="OC Talk Radios Esports Connection Logo" className='h-auto max-w-full md:max-w-[400px]' />
                <h1 className="text-2xl text-center font-bold">WHERE THE ESPORTS WORLD GOES TO CONNECT.</h1>
            </div>
            <div className="flex flex-row gap-4 justify-between items-center md:w-3/4 px-4">
                <div className="flex flex-row gap-2 text-indigo-800">
                    <a href='https://youtube.com/playlist?list=PLQN6TAdsJwp6jIWEOCZCCzx84ik8SdQo1&si=OOCz9eoUXgnLKuQo' target="_blank" rel="noopener noreferrer" className='h-8 w-8 flex flex-row items-center justify-center'>
                        <FontAwesomeIcon icon={faYoutube} fixedWidth size='2x' />
                    </a>

                    {/* <a href='#' className='h-8 w-8 flex flex-row items-center justify-center'>
                        <FontAwesomeIcon icon={faTwitch} fixedWidth size='2x' />
                    </a> */}
                    
                    <a href='https://www.instagram.com/esportsconnection/' target="_blank" rel="noopener noreferrer" className='h-8 w-8 flex flex-row items-center justify-center'>
                        <FontAwesomeIcon icon={faInstagram} fixedWidth size='2x' />
                    </a> 

                    <a href='https://www.linkedin.com/company/oc-talk-radio/' target="_blank" rel="noopener noreferrer" className='h-8 w-8 flex flex-row items-center justify-center'>
                        <FontAwesomeIcon icon={faLinkedinIn} fixedWidth size='2x' />
                    </a>

                    {/* <a href='#' className='h-8 w-8 flex flex-row items-center justify-center'>
                        <FontAwesomeIcon icon={faTwitter} fixedWidth size='2x' />
                    </a> */}
                </div>
                <button className="flex flex-row gap-2 bg-indigo-600 font-semibold p-2 text-white rounded-md cursor-pointer">
                    Our Newsletter
                </button>
            </div>
        </header>
    );
};

export default Header;
