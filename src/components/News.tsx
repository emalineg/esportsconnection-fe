const News = () => {
    return(
        <div className="text-white">
             <div>
                <h1 className="col-start-1 col-end-3">LATEST NEWS</h1>
                <div className="grid grid-rows-4 gap-4 pl-5">
                <div className="bg-indigo-500 rounded-md">UCI VALORANT TEAM WINS WORLD CUP</div>
                <div className="bg-indigo-500 rounded-md">IRVINE VALLEY COLLEGE DEFEATS...</div>
                <div className="bg-indigo-500 rounded-md">MORE FUNDING TO GO TO ESPORTS?</div>
                <div className="bg-indigo-500 rounded-md">ESPORTS AS A JOB INDUSTRY</div>
                </div>
                <div>
                    <p className="text-xs text-right underline">More Esports News!</p>
                </div>
             </div>
        </div>
        
    )
}   
export default News;
