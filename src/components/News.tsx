const News = () => {
    return(
        <div className="text-indigo-900 w-full">
             <div>
                <h1 className="text-lg font-bold ml-4">LATEST NEWS</h1>
                <div className="flex flex-col gap-4 py-4 px-8">
                    <div className="bg-indigo-100 rounded-md p-2">UCI VALORANT TEAM WINS WORLD CUP</div>
                    <div className="bg-indigo-100 rounded-md p-2">IRVINE VALLEY COLLEGE DEFEATS...</div>
                    <div className="bg-indigo-100 rounded-md p-2">MORE FUNDING TO GO TO ESPORTS?</div>
                    <div className="bg-indigo-100 rounded-md p-2">ESPORTS AS A JOB INDUSTRY</div>
                </div>
                <div className="flex flex-row justify-end px-4">
                    <p className="text-sm underline">More Esports News!</p>
                </div>
             </div>
        </div>
    );
};

export default News;
