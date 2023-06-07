const News = () => {
    return(
        <div className="text-indigo-900 w-full">
             <div>
                <h1 className="text-xl font-semibold ml-4 uppercase">Latest News</h1>
                <div className="flex flex-col gap-4 p-4">
                    <div className="bg-indigo-100 rounded-md p-2 font-semibold">UCI Valorant Team Wins World Cup</div>
                    <div className="bg-indigo-100 rounded-md p-2 font-semibold">Irvine Valley College Defeats ...</div>
                    <div className="bg-indigo-100 rounded-md p-2 font-semibold">More Funding to Go to ESports?</div>
                    <div className="bg-indigo-100 rounded-md p-2 font-semibold">ESports as a Job Industry</div>
                </div>
                <div className="flex flex-row justify-end px-4">
                    <a href='#' className="text-sm font-semibold text-indigo-600 text-opacity-70 hover:text-opacity-100">More Esports News!</a>
                </div>
             </div>
        </div>
    );
};

export default News;
