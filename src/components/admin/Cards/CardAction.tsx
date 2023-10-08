import { type FC } from "react";
import { faGear, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type CardActionProps = {
  href: string;
  icon: IconDefinition;
  title: string;
  iconColor: string;
};

const CardAction: FC<CardActionProps> = ({ title, href, icon = faGear, iconColor = "bg-sky-500"}) => {
  return (
    <Link href={href} className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <span className="font-semibold text-2xl text-gray-700">
              {title}
            </span>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div className={"text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " + iconColor}>
              <FontAwesomeIcon icon={icon} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardAction;