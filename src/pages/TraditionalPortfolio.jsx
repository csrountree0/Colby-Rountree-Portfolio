import { useState, useEffect } from 'react';
import ProjectDetail, { projects } from './ProjectDetail';
import AnimatedEnvelope from '../components/AnimatedEnvelope';

function TraditionalPortfolio({ onReturnToPhone, initialSection = 'about' }) {
    const [currentSection, setCurrentSection] = useState(initialSection);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        setCurrentSection(initialSection);
    }, [initialSection]);

    const [socialLinks] = useState([
        { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg', url: '#' },
        { name: 'GitHub', image: 'https://img.icons8.com/?size=100&id=62856&format=png&color=FFFFFF', url: 'https://github.com/csrountree0' }
     ]);

    const handleProjectClick = (projectId) => {
        setSelectedProject(projectId);
    };

    if (selectedProject) {
        return <ProjectDetail projectId={selectedProject} onBack={() => setSelectedProject(null)} />;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Header with Phone Icon */}
            <div className="flex justify-between items-center mb-12">
                <h1 className="w-[20%] text-2xl font-bold">Colby Rountree</h1>
                <nav className="flex space-x-8">
                    <button 
                        className={`text-lg ${currentSection === 'about' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setCurrentSection('about')}
                    >
                        About
                    </button>
                    <button 
                        className={`text-lg ${currentSection === 'projects' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setCurrentSection('projects')}
                    >
                        Projects
                    </button>
                    <button 
                        className={`text-lg ${currentSection === 'contact' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setCurrentSection('contact')}
                    >
                        Contact
                    </button>
                </nav>
                <div className="w-[20%]">
                <button 
                    onClick={onReturnToPhone}
                    className="w-[20%] p-1 rounded-full hover:bg-gray-800 transition-colors"
                    title="Return to phone view"
                >
                    <span className="mt-1 material-icons">phone_iphone</span>
                </button>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto">
                {currentSection === 'about' && (
                    <div className="space-y-6 text-center">
                        <h1 className="text-4xl font-bold mb-4">About Me</h1>
                        <p className="text-lg text-gray-300">
                          add later 
                        </p>
                    </div>
                )}

                {currentSection === 'projects' && (
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(projects).map(([id, project]) => (
                                <div 
                                    key={id}
                                    className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                                    onClick={() => handleProjectClick(id)}
                                >
                                    <div className="relative h-48 mb-4">
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-300 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentSection === 'contact' && (
                    <div className="max-w-md mx-auto">
                        <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
                        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                            <div className="flex items-center space-x-4 group">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <AnimatedEnvelope />
                                </div>
                                <a 
                                    href="mailto:colbyr416@gmail.com" 
                                    className="text-lg text-gray-300 hover:text-blue-400"
                                >
                                    colbyr416@gmail.com
                                </a>
                            </div>
                            {socialLinks.map((link, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <img 
                                            src={link.image} 
                                            alt={link.name} 
                                            className="w-8 h-8"
                                        />
                                    </div>
                                    <a 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-lg text-gray-300 hover:text-blue-400"
                                    >
                                        {link.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TraditionalPortfolio; 