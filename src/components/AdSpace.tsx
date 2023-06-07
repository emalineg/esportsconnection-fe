const AdSpace = () => {
    return(
        <div className="text-indigo-900 md:px-4 w-full">
            <div className="relative flex flex-row justify-center items-center bg-indigo-100 md:rounded-md p-4">
                <div className="absolute top-0 right-0 bg-red-500 text-xs text-white md:rounded-tr-md rounded-bl-md p-1">Sponsored!</div>
                [Ads]
            </div>
        </div>
    );
};

export default AdSpace;
