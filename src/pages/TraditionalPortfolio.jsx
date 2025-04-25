import { useState, useEffect } from 'react';
import ProjectDetail, { projects } from './ProjectDetail';
import AnimatedEnvelope from '../components/AnimatedEnvelope';
import Technology from '../components/Technology';

function TraditionalPortfolio({ onReturnToPhone, initialSection = 'about' }) {
    const [currentSection, setCurrentSection] = useState(initialSection);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        setCurrentSection(initialSection);
    }, [initialSection]);

    const [socialLinks] = useState([
        { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg', url: 'https://www.linkedin.com/in/colby-rountree-aa2a7b2a5/' },
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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4 sm:gap-0">
                <div className="w-full sm:w-1/3 text-center sm:text-left">
                    <h1 className="text-2xl font-bold select-none">Colby Rountree</h1>
                </div>
                <nav className="w-full sm:w-1/3 flex justify-center space-x-4 sm:space-x-8 relative">
                    <button 
                        className={`text-base sm:text-lg px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                            currentSection === 'about' 
                                ? 'text-blue-400 bg-blue-400/10' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                        onClick={() => setCurrentSection('about')}
                    >
                        About
                    </button>
                    <button 
                        className={`text-base sm:text-lg px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                            currentSection === 'projects' 
                                ? 'text-blue-400 bg-blue-400/10' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                        onClick={() => setCurrentSection('projects')}
                    >
                        Projects
                    </button>
                    <button 
                        className={`text-base sm:text-lg px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                            currentSection === 'contact' 
                                ? 'text-blue-400 bg-blue-400/10' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                        onClick={() => setCurrentSection('contact')}
                    >
                        Contact
                    </button>
                </nav>
                <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
                    <button 
                        onClick={onReturnToPhone}
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                        title="Return to phone view"
                    >
                        <span className="material-icons align-middle">phone_iphone</span>
                    </button>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto">
                {currentSection === 'about' && (
                    <div className="space-y-8">
                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                                <img 
                                    src="/Colby-Rountree-Portfolio/me.jpg" 
                                    alt="Colby Rountree" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-4xl font-bold mb-2">Colby Rountree</h1>
                                <p className="text-xl text-blue-400 mb-2">Computer Science Student</p>
                                <p className="text-gray-300">Auburndale, FL</p>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">About Me</h2>
                            <p className="text-gray-300 leading-relaxed">
                            I'm a hardworking student with a deep passion for building and problem-solving through code. Development is more than a job to me, it is something I genuinely enjoy and feel driven to improve at every day. I use every project as an opportunity for growth, whether it's through learning a new framework, working through a tough bug, or trying to find the most efficient solution to a problem. I'm always looking to improve my skills, both technically and personally.
                            </p>
                        </div>

                            {/* Skills Section */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">Skills</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            <Technology tech={{ name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" }} size="md" />
                                <Technology tech={{ name: "React", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" }} size="md" />
                                <Technology tech={{ name: "HTML5", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" }} size="md" />
                                <Technology tech={{ name: "CSS3", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" }} size="md" />
                                <Technology tech={{ name: "Tailwind", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" }} size="md" />
                                <Technology tech={{ name: "C++", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" }} size="md" />
                                <Technology tech={{ name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" }} size="md" />
                                <Technology tech={{ name: "SQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" }} size="md" />
                                <Technology tech={{ name: "Git", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" }} size="md" />
                                <Technology tech={{ name: "RESTful API", logo: "/Colby-Rountree-Portfolio/rest-api-icon.svg" }} size="md" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Soft Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full">Problem Solving</span>
                                    <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full">Teamwork</span>
                                    <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full">Leadership</span>
                                </div>
                            </div>
                        </div>


                        {/* Experience Section */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                            <div className="space-y-6">
                                <div className="border-l-4 border-blue-400 pl-4">
                                    <h3 className="text-xl font-semibold">Student Education Assistant - Computer Science</h3>
                                    <p className="text-gray-400">2024 - Present</p>
                                    <p className="text-gray-300 mt-2">
                                        • Working with assigned professor to ensure assignments are error-free and ready for distribution<br/>
                                        • Grading assignments to verify accurate responses and provide feedback<br/>
                                        • Assisted in the development of a Linux Ubuntu virtual machine to create an environment that supports MongoDB and PostgreSQL using Robo3T and pgAdmin III
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-2xl font-bold mb-4">Education</h2>
                            <div className="border-l-4 border-blue-400 pl-4">
                                <h3 className="text-xl font-semibold">Florida Polytechnic University</h3>
                                <p className="text-gray-400">August 2022 - May 2026</p>
                                <p className="text-gray-300 mt-2">
                                    Bachelor of Science in Computer Science<br/>
                                    GPA: 3.77<br/>
                                    President's List 2022 - Present
                                </p>
                            </div>
                        </div>

                        


                        
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
                                            src={project.images[0].src} 
                                            alt={project.title}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-gray-300 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <Technology key={index} tech={tech} size="sm" />
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