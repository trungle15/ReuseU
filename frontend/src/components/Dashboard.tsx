import { MagnifyingGlassIcon, UserCircleIcon, Cog8ToothIcon } from "@heroicons/react/16/solid";



export default function Dashboard() {
    const handleReuseClick = () => {

    }
    const handleMakeAListingClick = () => {

    }
    const handleUserCircleClick = () => {

    }
    const handleCogClick = () => {

    }
    return (
        <div className="flex items-center fixed top-0 left-0 w-full h-1/16 bg-green-500 z-50">
            <div className="pl-5 h-full flex items-center">
                <div 
                className="cursor-pointer outline-solid rounded-lg h-3/4 w-full"
                onClick = {handleReuseClick} >ReuseU</div>
            </div>
            <div className="relative w-3/4 pl-5 flex-grow">
                <input 
                className="w-full pl-5 pr-10 rounded-lg bg-white focus:border-indigo-600"
                type="text" 
                placeholder="Search for a Listing"/>
                <MagnifyingGlassIcon className="right-3 top-[2px] flex items-center absolute h-5 w-5 outline-offset-[-2px] [outline-right:none] [outline-top:none] [outline-bottom:none] outline outline-2" />
            </div>
            <div className="pl-5 h-full flex items-center">
                <div 
                className="cursor-pointer outline-solid rounded-lg h-3/4 w-full"
                onClick={handleMakeAListingClick} >Make a Listing</div>
            </div>
            <div className="pl-5 h-full flex items-center">
                <UserCircleIcon 
                className="cursor-pointer right-3 top-[2px] flex items-center h-full w-10"
                onClick={handleUserCircleClick} />
            </div>
            <div 
            className="pl-5 pr-5 h-full flex items-center">
                <Cog8ToothIcon 
                className="cursor-pointer right-3 top-[2px] flex items-center h-full w-10"
                onClick={handleCogClick} />
            </div>
        </div>
    );
  }
  