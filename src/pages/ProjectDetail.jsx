import { useState } from 'react';
import Technology from '../components/Technology';

// Project data
const projects = {
    pathfinder: {
        title: "Maze Generation and Pathfinder",
        description: "A maze generation and pathfinding visualization tool that demonstrates various algorithms in action.",
        longDescription: "This project demonstrates different maze generation algorithms (like Recursive Backtracking, Kruskal's, and Prim's) and pathfinding algorithms (including A*, Dijkstra's, and Breadth-First Search). Users can watch the algorithms work in real-time, and create their own mazes.",
        technologies: [
            { name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
            { name: "HTML5", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
            { name: "CSS3", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" }
        ],
        images: [
            { src: "/maze.svg", alt: "Maze Generation" },
            { src: "/Prims.gif", alt: "Pathfinding Visualization" },
            { src: "/AStar.gif", alt: "Algorithm Selection" }
        ],
        link: "https://csrountree0.github.io/Maze-Generation-and-Pathfinding/",
        github: "https://github.com/csrountree0/Maze-Generation-and-Pathfinding"
    },
    
    sortvisualizer:{
        title: "Sorting Visualizer",
        description: "A sorting visualization tool that demonstrates various sorting algorithms in action.",
        longDescription: "This was the first javascript project I created. This project demonstrates different sorting algorithms (like Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort). Users can watch the algorithms work in real-time.",
        technologies: [
            { name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
            { name: "HTML5", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
            { name: "CSS3", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" }
        ],
        images: [
            { src: "/sort.svg", alt: "sort" },
            { src: "/merge.gif", alt: "Merge Sort" },
            { src: "/quick.gif", alt: "Quick Sort" },
        ],
        link: "https://csrountree0.github.io/sort-visualizer/",
        github: "https://github.com/csrountree0/sort-visualizer"
    },

    cameraPixelator: {
        title: "Camera Pixelator",
        description: "This project allows users to pixelate or ASCII-ify their webcam input.",
        longDescription: "A camera pixelator tool that allows users to pixelate or ASCII-ify their webcam input that can then be used in other applications.",
        technologies: [
            { name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
            { name: "OpenCV", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg" },
            { name: "Tkinter", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" }
        ],
        images: [
            { src: "/pixel_me.png", alt: "Pixelator" }
        ],
        github: "https://github.com/csrountree0/Camera-Modifier"
    }
};

function ProjectDetail({ projectId, onBack }) {
    const project = projects[projectId];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={onBack}
                        className="mb-8 text-blue-400 hover:text-blue-300 flex items-center"
                    >
                        <span className="material-icons mr-2">arrow_back</span>
                        Back to Projects
                    </button>
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                </div>
            </div>
        );
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={onBack}
                    className="mb-8 text-blue-400 hover:text-blue-300 flex items-center group"
                >
                    <span className="material-icons mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    Back to Projects
                </button>

                <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center space-y-6">
                        {/* Project Image with Navigation */}
                        <div className="relative w-full max-w-[350px]">
                            <div className="w-full aspect-square overflow-hidden rounded-xl shadow-2xl flex items-center justify-center bg-gray-700">
                                <img 
                                    src={project.images[currentImageIndex].src} 
                                    alt={project.images[currentImageIndex].alt}
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>
                            
                            {/* Navigation Buttons */}
                            <button 
                                onClick={prevImage}
                                className="absolute w-10 h-10 left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors active:bg-gray-600/80"
                            >
                                <span className="material-icons mt-1">chevron_left</span>
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute w-10 h-10 right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors active:bg-gray-600/80"
                            >
                                <span className="material-icons mt-1">chevron_right</span>
                            </button>
                        </div>

                        {/* Image Counter */}
                        <div className="flex gap-3">
                            {project.images.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentImageIndex 
                                            ? 'bg-blue-500' 
                                            : 'bg-gray-500'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Project Title */}
                        <h1 className="text-3xl font-bold text-center">{project.title}</h1>

                        {/* Technologies */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {project.technologies.map((tech, index) => (
                                <Technology key={index} tech={tech} size="md" />
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-base text-gray-300 text-center max-w-xl leading-relaxed">
                            {project.longDescription}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            {project.link && (
                                <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <span className="material-icons">visibility</span>
                                    View Live
                                </a>
                            )}
                            <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <span className="material-icons">code</span>
                                View Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
export { projects }; 