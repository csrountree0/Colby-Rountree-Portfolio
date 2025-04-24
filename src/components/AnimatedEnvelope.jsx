import React from 'react';

function AnimatedEnvelope() {
    return (
        <div className="h-4 w-5 bg-white/70 relative flex justify-center z-0">
            {/* First lid */}
            <div className="absolute h-full w-full top-0 left-0 
                border-r-[10px] border-b-[8px] border-l-[10px] border-transparent
                border-t-[8px] border-t-gray-400
                transform-gpu origin-top transition-transform duration-300 ease-linear
                group-hover:rotate-x-90 group-hover:delay-0
                rotate-x-0 delay-300 z-30"></div>
            
            {/* Second lid */}
            <div className="absolute h-full w-full top-0 left-0 
                border-r-[10px] border-b-[8px] border-l-[10px] border-transparent
                border-t-[8px] border-t-gray-400
                transform-gpu origin-top transition-transform duration-300 ease-linear
                group-hover:rotate-x-180 group-hover:delay-75
                rotate-x-90 delay-150 z-10"></div>
            
            {/* Envelope body */}
            <div className="absolute h-full w-full top-0 left-0 
                border-t-[8px] border-transparent
                border-r-[10px] border-r-white/70
                border-b-[8px] border-b-white/70
                border-l-[10px] border-l-white/70
                z-30"></div>
        </div>
    );
}

export default AnimatedEnvelope; 