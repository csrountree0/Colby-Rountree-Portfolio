import { useState, useEffect } from 'react'

import './App.css'

function App() {

    return (
        <div className="bg-gray-800 flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-white text-3xl font-bold animate-fade-in">Hello,</div>
            <div className="text-white text-3xl mb-3 animate-fade-in-delayed">Welcome to my portfolio</div>
            <div className="text-white mb-4 animate-fade-in-delayed">
                Don't like the view? 
                <button className="text-blue-400 hover:text-blue-300 ml-1">
                    Click here
                </button> to change
            </div>

            {/* Phone View */}
            <div className="w-72 h-[600px] bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-black-800 relative animate-fade-in-delayed">
                {/* Phone Notch */}
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
                </div>

                {/* Screen Container */}
                <div className="w-full h-full bg-gradient-to-b from-blue-400 to-purple-500 pt-7 px-3 pb-3 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-white text-xs mb-2">
                        <Clock/>
                        <div className="flex space-x-1">

                            <div className="flex items-center">
                                <div className="h-2 w-px bg-white"></div>
                                <div className="h-2.5 w-px bg-white mx-px"></div>
                                <div className="h-3 w-px bg-white"></div>
                                <div className="h-2.5 w-px bg-white mx-px"></div>
                                <div className="h-2 w-px bg-white"></div>
                            </div>
                            <div>100%</div>
                        </div>
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {/* Apps */}
                        <AppIcon name="Clock" color="bg-red-400" letter="C" />
                        <AppIcon name="Weather" color="bg-blue-400" letter="W"/>


                    </div>

                    {/* Spacer */}
                    <div className="flex-grow"></div>

                    {/* Dock */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex justify-around">
                        <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-md">
                            <div className="text-white text-lg">P</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                            <div className="text-white text-lg">M</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
                            <div className="text-white text-lg">S</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-md">
                            <div className="text-white text-lg">C</div>
                        </div>
                    </div>

                    {/* Home Bar */}
                    <div className="flex justify-center mt-3">
                        <div className="w-32 h-1 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// create app icon
function AppIcon({name,color,letter, showLabel=true, onClick=() => {}}){
    return(
        <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-md cursor-pointer`} onClick={onClick}>
                <div className="text-white text-lg">{letter}</div>
            </div>
            {showLabel && <div className="text-white text-xs mt-1 cursor-default">{name}</div>}
        </div>

    )
}

// update the time every second
function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date()); // triggers re-render every second
        }, 1000);

        return () => clearInterval(timer); // cleanup
    }, []);

    return <div>{currentTime.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true })}</div>
}



export default App;


