import { useState, useEffect } from 'react'

import './App.css'
import ClockPage from './pages/Clock'
import WeatherPage from './pages/Weather'
import ContactsPage from './pages/Contacts'
import TraditionalPortfolio from './pages/TraditionalPortfolio'
import WIPPage from './pages/WIP'
import { getTimeBasedBackground } from './pages/Clock'
import CalculatorPage from './pages/Calculator';

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [openFolder, setOpenFolder] = useState(null);
    const [isTraditionalView, setIsTraditionalView] = useState(false);
    const [traditionPage, setTraditionPage] = useState("about");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toggleFolder = (folderName) => {
        setOpenFolder(prev => prev === folderName ? null : folderName);
    };

    const isAnyFolderOpen = openFolder !== null;

    if (isTraditionalView) {
        return <TraditionalPortfolio onReturnToPhone={() => setIsTraditionalView(false)} initialSection={traditionPage} />;
    }

    return (
        <div className="select-none bg-gray-900 flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-white text-2xl font-bold animate-fade-in">Hello,</div>
            <div className="text-white text-2xl animate-fade-in-delayed">Welcome to my portfolio.</div>
            <div className="text-white text-xs mb-5 animate-fade-in-delayed">(Work in progress)</div>

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
                        currentPage === "Soon" ? "animate-app-load bg-orange-600" :
                        currentPage === "Calculator" ? "animate-app-load bg-gray-500" :
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
                                        <AppIcon name="Calculator" color="bg-orange-400" letter="calculate" icon={true} onClick={() => setCurrentPage("Calculator")}/>
                                        <AppIcon name="Soon" color="bg-orange-400" letter="build" icon={true} onClick={() => setCurrentPage("Soon")}/>
                                     </div>

                                    {/* Folder Contents */}
                                    {openFolder && (
                                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center animate-fade-in" onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFolder(openFolder);
                                        }}>
                                            <div className="text-white text-2xl font-bold mb-4">{openFolder}</div>
                                            <div className="grid grid-cols-3 gap-4 p-4 mb-26" onClick={(e) => e.stopPropagation()}>
                                                {openFolder === "Projects" && (
                                                    <>
                                                        <AppIcon name="Pathfinder" color="bg-gray-400" image="/Colby-Rountree-Portfolio/maze.svg" onClick={(e) => {e.stopPropagation(); window.open("https://csrountree0.github.io/Maze-Generation-and-Pathfinding/", "_blank");}}/>
                                                        <AppIcon name ="vScrobbler" color="bg-white" image="/Colby-Rountree-Portfolio/vScrobblerLogo.svg"   onClick={(e) => {e.stopPropagation(); window.open("https://csrountree0.github.io/vscrobbler/", "_blank");}}/>
                                                        <AppIcon name="Visual Sort" color="bg-black rotate-270" letter="sort" icon={true} onClick={(e) => {e.stopPropagation(); window.open("https://csrountree0.github.io/sort-visualizer/", "_blank");}}/>
                                                        <AppIcon name="More Details" color="bg-blue-400" letter="info" icon={true} onClick={(e) => {e.stopPropagation(); setIsTraditionalView(true); setTraditionPage("projects");}}/>
                                                    </>
                                                )}
                                                {openFolder === "Games" && (
                                                    <>
                                                        <AppIcon name="Sudoku" color="bg-gray-300" image="https://www.svgrepo.com/show/519514/sudoku.svg" onClick={(e) => {e.stopPropagation(); window.open("https://csrountree0.github.io/Sudoku/", "_blank");} }/>
                                                        <AppIcon name="More" color="bg-gray-400" letter="sports_esports" icon={true} onClick={(e) => e.stopPropagation()}/>
                                                        <AppIcon name="Soon" color="bg-gray-400" letter="sports_esports" icon={true} onClick={(e) => e.stopPropagation()}/>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Spacer */}
                                    <div className="flex-grow"></div>

                                    {/* Dock */}
                                    <div className={`${isAnyFolderOpen ? 'bg-black/40' : 'bg-white/20'} backdrop-blur-sm rounded-xl p-3 flex justify-around`}>
                                        <AppIcon name="Contacts" color="bg-cyan-400" letter="person" showLabel={false} icon={true} onClick={() => setCurrentPage("Contacts")} isDark={isAnyFolderOpen}/>
                                        <Folder name="Projects" color="bg-indigo-500" letter="terminal" icon={true} showLabel={false} isOpen={openFolder === "Projects"} isDark={isAnyFolderOpen && openFolder !== "Projects"} onClick={() => toggleFolder("Projects")}/>
                                        <Folder name="Games" color="bg-green-500" letter="sports_esports" icon={true} showLabel={false} isOpen={openFolder === "Games"} isDark={isAnyFolderOpen && openFolder !== "Games"} onClick={() => toggleFolder("Games")}/>
                                    </div>
                                </>
                            ) : currentPage === "Weather" ? (
                                <WeatherPage />
                            ) : currentPage === "Clock" ? (
                                <ClockPage currentTime={currentTime} />
                            ) : currentPage === "Contacts" ? (
                                <ContactsPage />
                            ) : currentPage === "Soon" ? (
                                <WIPPage />
                            ) : currentPage === "Calculator" ? (
                                <CalculatorPage />
                            ) : null}
                        </div>

                        <HomeBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </div>

            <div className="text-white mt-2 animate-fade-in-more-delayed">
                Don't like the view? Click
                <button 
                    className="text-blue-400 hover:text-blue-300 ml-1 cursor-pointer"
                    onClick={() => {setIsTraditionalView(true); setTraditionPage("about");}}
                >
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
function AppIcon({name, color, letter, icon=false, showLabel=true, image=null, onClick = () => {}, isDark=false}){
    return(
        <div className="flex flex-col items-center">
            <div className={`w-12.5 h-12 rounded-xl ${color} flex items-center align-middle justify-center shadow-md ${!isDark ? 'cursor-pointer' : ''} overflow-hidden ${isDark ? 'opacity-50' : ''}`} onClick={!isDark ? onClick : undefined}>
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-contain p-2"/>
                ) : (
                    <div className={`${icon ? "material-icons" : ""} text-white text-lg text-center`}>{letter}</div>
                )}
            </div>
            {showLabel && <div className="text-center text-white text-xs mt-1 cursor-default">{name}</div>}
        </div>
    );
}

// create folder component
function Folder({name, color, letter, icon=false, showLabel=true, isOpen=false, isDark=false, onClick = () => {}}){
    return(
        <div className="flex flex-col items-center">
            <div className={`w-12.5 h-12 rounded-xl ${color} flex items-center align-middle justify-center shadow-md ${!isDark ? 'cursor-pointer' : ''} ${isOpen ? 'ring-2 ring-white' : ''} ${isDark ? 'opacity-50' : ''}`} onClick={!isDark ? onClick : undefined}>
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


