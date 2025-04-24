function Technology({ tech, size = 'md' }) {
    const sizeClasses = {
        sm: {
            container: 'px-2 py-1 gap-1',
            text: 'text-xs',
            image: 'w-4 h-4'
        },
        md: {
            container: 'px-3 py-1.5 gap-2',
            text: 'text-sm',
            image: 'w-5 h-5'
        },
        lg: {
            container: 'px-4 py-2 gap-2',
            text: 'text-base',
            image: 'w-6 h-6'
        }
    };

    const currentSize = sizeClasses[size];

    return (
        <div 
            className={`flex items-center bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${currentSize.container}`}
        >
            <img 
                src={tech.logo} 
                alt={`${tech.name} logo`}
                className={currentSize.image}
            />
            <span className={`font-medium ${currentSize.text}`}>{tech.name}</span>
        </div>
    );
}

export default Technology; 