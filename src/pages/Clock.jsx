import { useState, useEffect } from 'react';

export function getTimeBasedBackground(hours) {
    if (hours >= 5 && hours < 10) {
        return 'from-orange-400 to-blue-400'; // Morning
    } else if (hours >= 10 && hours < 17) {
        return 'from-blue-300 to-blue-700'; // Afternoon
    } else if (hours >= 17 && hours < 20) {
        return 'from-purple-500 to-orange-500'; // Evening
    } else {
        return 'from-indigo-900 to-black'; // Night
    }
};

function ClockPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const seconds = currentTime.getSeconds();
    const minutes = currentTime.getMinutes();
    const hours = currentTime.getHours();
    const displayHours = hours % 12;

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (displayHours / 12) * 360 + (minutes / 60) * 30;

   

    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className={`relative w-64 h-64 rounded-full border-4 border-white shadow-lg bg-black/30`}>
                {/* Clock face */}
                <div className="absolute w-full h-full rounded-full bg-black/30">
                    {/* Hour marks */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-4 bg-white left-30"
                            style={{
                                transform: `rotate(${i * 30}deg)`,
                                transformOrigin: '50% 100px',
                                top: '20px'
                            }}
                        />
                    ))}
                    
                    {/* Hour hand */}
                    <div
                        className="absolute w-1 h-16 bg-white rounded-sm"
                        style={{
                            transform: `rotate(${hourDegrees}deg)`,
                            transformOrigin: 'bottom center',
                            bottom: '50%',
                            left: '50%',
                            marginLeft: '-0.5px'
                        }}
                    />
                    
                    {/* Minute hand */}
                    <div
                        className="absolute w-1 h-24 bg-white rounded-sm"
                        style={{
                            transform: `rotate(${minuteDegrees}deg)`,
                            transformOrigin: 'bottom center',
                            bottom: '50%',
                            left: '50%',
                            marginLeft: '-0.5px'
                        }}
                    />
                    
                    {/* Second hand */}
                    <div
                        className="absolute w-0.5 h-28 bg-red-500 rounded-sm"
                        style={{
                            transform: `rotate(${secondDegrees}deg)`,
                            transformOrigin: 'bottom center',
                            bottom: '50%',
                            left: '50%',
                            marginLeft: '-0.25px'
                        }}
                    />
                    
                    {/* Center dot */}
                    <div className="absolute w-3 h-3 bg-white rounded-full"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </div>
            </div>
            
            {/* Digital time below the clock */}
            <div className="text-white text-2xl mt-4">
                {currentTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })}
            </div>
        </div>
    );
}

export default ClockPage; 