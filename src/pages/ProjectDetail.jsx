import { useState } from 'react';

// Project data
const projects = {
    pathfinder: {
        title: "Maze Generation and Pathfinder",
        description: "A maze generation and pathfinding visualization tool that demonstrates various algorithms in action.",
        longDescription: "This project demonstrates different maze generation algorithms (like Recursive Backtracking, Kruskal's, and Prim's) and pathfinding algorithms (including A*, Dijkstra's, and Breadth-First Search). Users can watch the algorithms work in real-time, and create their own mazes.",
        technologies: ["JavaScript", "HTML5 Canvas", "CSS"],
        image: "/maze.svg",
        link: "https://csrountree0.github.io/Maze-Generation-and-Pathfinding/",
        github: "https://github.com/csrountree0/Maze-Generation-and-Pathfinding"
    },
   
};

function ProjectDetail({ projectId, onBack }) {
    const project = projects[projectId];

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

                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="md:w-1/2 space-y-4">
                            <h1 className="text-4xl font-bold">{project.title}</h1>
                            <p className="text-lg text-gray-300">{project.longDescription}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-4">
                                <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                    View Live
                                </a>
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    View Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
export { projects }; 