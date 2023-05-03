import Image from 'next/image';

const Header = () => {
    return(
        <div className="flex flex-col items-center justify-center text-white">
        <div>
            <Image src="/logo.png" alt="OC Talk Radios Esports Connection Logo" width={400} height={400}/>
            <h1 className="text-xl text-center">WHERE THE ESPORTS WORLD GOES TO <br/> CONNECT. </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-5">
            <div className="col-start-1 col-end-1">
                socials
            </div>
            <div className="col-start-3 col-end-3">
                newsletter
            </div>


        </div>
        </div>
     
        
    )
}   
export default Header;
