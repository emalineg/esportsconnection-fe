import Link from "next/link";

const AdSpace = () => {
    return(
        <div className="text-indigo-800 w-full flex flex-col gap-4">
            <div className="md:px-4 w-full mt-4">
                <div className="relative flex flex-row justify-center items-center bg-indigo-100 md:rounded-md p-4">
                    <div className="absolute top-0 right-0 bg-red-500 text-xs text-white md:rounded-tr-md rounded-bl-md p-1">Sponsored!</div>
                    [Ads]
                </div>
            </div>
            
            <div className="flex flex-row justify-end px-4">
                <Link href='/advertise' className="text-sm font-semibold text-indigo-600 text-opacity-70 hover:text-opacity-100">Advertise With Us</Link> 
            </div>
        </div>
    );
};

export default AdSpace;
