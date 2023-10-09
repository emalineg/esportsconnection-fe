import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return(
        <footer className="bg-indigo-800 w-full">
            <div className="container  md:max-w-[120ch] mx-auto p-4 flex flex-col md:flex-row">
                <div className="flex flex-row flex-grow p-2">
                    <a href="https://octalkradio.com/" className="flex mr-3">
                        <img src="/Logo.png" className="h-20" alt="Esports Connection OC Talk Radio Logo" />
                    </a>
                    <div className="flex flex-col text-white">
                        <a className="text-sm uppercase font-bold" href="https://octalkradio.com">OC Talk Radio&apos;s<br />Esports Connection</a>
                        <p className="text-xs uppercase font-semibold mt-2">Host: Harrison Griffith</p>
                        <address className="text-xs uppercase font-semibold not-italic mt-1">5270 California Ave, Irvine, CA 92617</address>
                    </div>
                </div>
                <div className="md:ml-4 flex flex-col mt-2 md:mt-0">
                    <ul className="font-medium text-sm list-none flex flex-row md:flex-col md:gap-1 w-full md:w-auto justify-between md:justify-start px-4 md:px-0">
                        <li className="inline-flex">
                            <a href="#" className="text-white text-opacity-70 hover:text-opacity-100">Contact</a>
                        </li>
                        <li className="inline-flex">
                            <a href="#" className="text-white text-opacity-70 hover:text-opacity-100">Meet The Team</a>
                        </li>
                        <li className="inline-flex">
                            <a href="#" className="text-white text-opacity-70 hover:text-opacity-100">Events</a>
                        </li>
                        <li className="inline-flex">
                            <a href="#" className="text-white text-opacity-70 hover:text-opacity-100">Advertise</a>
                        </li>
                    </ul>

                    <div className="flex flex-row items-center self-center gap-3 my-3">
                        <a href="https://www.instagram.com/esportsconnection/" className="h-6 w-6 text-white text-opacity-70 hover:text-opacity-100">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>

                        <a href="https://www.linkedin.com/company/oc-talk-radio/" className="h-6 w-6 text-white text-opacity-70 hover:text-opacity-100">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                    
                        <a href="https://youtube.com/playlist?list=PLQN6TAdsJwp6jIWEOCZCCzx84ik8SdQo1&si=OOCz9eoUXgnLKuQo" className="h-6 w-6 text-white text-opacity-70 hover:text-opacity-100">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>
                </div>
            </div> 
        </footer>
    );
};

export default Footer;
