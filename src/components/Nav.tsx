import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { type FC } from "react";

const Nav: FC = () => {
  return(
    <nav className="p-2 flex flex-row gap-4 bg-indigo-300 w-full">
      <Link href='/' className="bg-white border border-white bg-opacity-20 border-opacity-60 hover:bg-opacity-50 text-white font-semibold px-2 py-1 flex flex-row items-center gap-1.5 rounded-md">
        <FontAwesomeIcon icon={faHome} fixedWidth className="w-4 h-4"></FontAwesomeIcon>
        Home
      </Link>
    </nav>
  );
}

export default Nav;