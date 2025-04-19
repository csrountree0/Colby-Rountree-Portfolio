import { useState, useEffect } from 'react'

import './App.css'
import ClockPage from './pages/Clock'
import WeatherPage from './pages/Weather'
import ContactsPage from './pages/Contacts'
import { getTimeBasedBackground } from './pages/Clock'

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-800 flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-white text-3xl font-bold animate-fade-in">Hello,</div>
            <div className="text-white text-3xl mb-5 animate-fade-in-delayed">Welcome to my portfolio.</div>

            {/* Phone View */}
            <div className="w-72 h-[600px] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-black-800 relative animate-fade-in-more-delayed">
                {/* Phone Notch */}
                <div className="cursor-default z-10 absolute top-0 left-0 right-0 flex justify-center text-white text-xs text-center">
                    {/* clock */}
                    <div className={`w-20 h-6 flex items-center justify-center rounded-lg ${getTimeBasedBackground(currentTime.getHours())}`}>
                        <Clock currentTime={currentTime}/>
                    </div>
                    {/* notch */}
                    <div className="w-32 h-6 bg-black rounded-b-2xl mr-1 ml-1"></div>
                    {/* battery */}
                    <div className={`w-20 h-6 flex items-center justify-center rounded-lg ${getTimeBasedBackground(currentTime.getHours())}`}>
                        <div className="flex items-center">
                            <div>100%</div>
                            <div className="w-6 material-icons rotate-90">battery_full_alt</div>
                        </div>
                    </div>
                </div>

                {/* Home Container */}
                <div className="w-full h-full">
                    {/* Screen Container */}
                    <div className={`w-full h-full pt-7 px-3 pb-3 flex flex-col ${
                        currentPage === "home" ? "bg-gradient-to-b from-blue-600 to-purple-500" :
                        currentPage === "Clock" ? `animate-app-load bg-gradient-to-b ${getTimeBasedBackground(currentTime.getHours())}` :
                        currentPage === "Weather" ? "animate-app-load bg-gradient-to-b from-sky-900 to-blue-900" :
                        currentPage === "Contacts" ? "animate-app-load bg-gradient-to-b from-indigo-900 to-purple-900" :
                        "bg-gradient-to-b from-blue-600 to-purple-500"
                    }`}>
                        <div className="flex-1 flex flex-col">
                            <div className="h-12"></div> {/* Spacer for notch */}
                            {currentPage === "home" ? (
                                <>
                                    {/* App Grid */}
                                    <div className="grid grid-cols-4 gap-4">
                                        {/* Apps */}
                                        <AppIcon name="Clock" color="bg-red-400" letter="schedule" icon={true} onClick={() => setCurrentPage("Clock")}/>
                                        <AppIcon name="Weather" color="bg-blue-400" letter="cloud" icon={true} onClick={() => setCurrentPage("Weather")}/>
                                     </div>

                                    {/* Folder Contents */}
                                    {isFolderOpen && (
                                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center animate-fade-in">
                                            <div className="grid grid-cols-4 gap-4 p-4">
                                                <AppIcon name="Example" color="bg-gray-400" letter="a" icon={true} onClick={() => setCurrentPage("Contacts")}/>
                                                <AppIcon name="Example" color="bg-gray-400" letter="a" icon={true}/>
                                                <AppIcon name="Example" color="bg-gray-400" letter="a" icon={true}/>
                                                <AppIcon name="Example" color="bg-gray-400" letter="a" icon={true}/>
                                            </div>
                                            <button 
                                                className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-white"
                                                onClick={() => setIsFolderOpen(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    )}

                                    {/* Spacer */}
                                    <div className="flex-grow"></div>

                                    {/* Dock */}
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex justify-around">
                                        <AppIcon name="Person" color="bg-green-400" letter="person" showLabel={false} icon={true} onClick={() => setCurrentPage("Contacts")}/>
                                        <Folder name="Apps" color="bg-indigo-400" letter="terminal" icon={true} showLabel={false} isOpen={isFolderOpen} onClick={() => setIsFolderOpen(!isFolderOpen)}/>
                                        <AppIcon name="Weather" color="bg-blue-400" letter="cloud" showLabel={false}/>
                                        <AppIcon name="Weather" color="bg-blue-400" letter="cloud" showLabel={false}/>
                                    </div>
                                </>
                            ) : currentPage === "Weather" ? (
                                <WeatherPage />
                            ) : currentPage === "Clock" ? (
                                <ClockPage />
                            ) : currentPage === "Contacts" ? (
                                <ContactsPage />
                            ) : null}
                        </div>

                        <HomeBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </div>

            <div className="text-white mt-2 animate-fade-in-more-delayed">
                Don't like the view? Click
                <button className="text-blue-400 hover:text-blue-300 ml-1 cursor-pointer">
                     here
                </button> to change
            </div>
        </div>
    );
}

function HomeBar({currentPage, setCurrentPage}){
    return(
        <div className="flex justify-center mt-3">
            <div className={`w-32 h-1.5 bg-white rounded-full ${currentPage !== "home" ? "cursor-pointer" : ""}`} onClick={() => setCurrentPage("home")}></div>
        </div>
    )
}

// create app icon
function AppIcon({name,color,letter, icon=false, showLabel=true,onClick = () => {}}){
    return(
        <div className="flex flex-col items-center">
            <div className={`w-12.5 h-12 rounded-xl ${color} flex items-center align-middle justify-center shadow-md cursor-pointer`} onClick={onClick}>
                <div className={`${icon ? "material-icons" : ""} text-white text-lg text-center`}>{letter}</div>
            </div>
            {showLabel && <div className="text-center text-white text-xs mt-1 cursor-default">{name}</div>}

        </div>

    )
}

// create folder component
function Folder({name, color, letter, icon=false, showLabel=true, isOpen=false, onClick = () => {}}){
    return(
        <div className="flex flex-col items-center">
            <div className={`w-12.5 h-12 rounded-xl ${color} flex items-center align-middle justify-center shadow-md cursor-pointer ${isOpen ? 'ring-2 ring-white' : ''}`} onClick={onClick}>
                <div className={`${icon ? "material-icons" : ""} text-white text-lg text-center`}>{letter}</div>
            </div>
            {showLabel && <div className="text-center text-white text-xs mt-1 cursor-default">{name}</div>}
        </div>
    )
}

// update the time every second
function Clock({currentTime}) {
    return <div className="flex items-center justify-center">{currentTime.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true })}</div>
}

// function StatusBar(){
// return(
//         <div className="flex justify-between items-center text-white text-xs mb-2">
//                 <Clock/>
//                 <div className="flex space-x-1">
//                     <div className="flex items-center">
//                         <div>100%</div>
//                         <div className="w-6 material-icons rotate-90">battery_full_alt</div>
//                     </div>
//                 </div>
//         </div>
//     )
// }

export default App;


