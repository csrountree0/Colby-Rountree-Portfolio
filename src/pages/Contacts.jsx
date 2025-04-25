import { useState } from 'react';
import AnimatedEnvelope from '../components/AnimatedEnvelope';
import '../App.css';

function ContactsPage() {
    const [profile] = useState({
        name: 'Colby Rountree',
        title: 'Student',
        location: 'Auburndale, FL',
        email: 'colbyr416@gmail.com',
        phone: '(863)-514-8524',
        bio: 'I\'m a full-stack developer who is passionate about what I do. I love solving tough challenges and use every project as a chance to learn and grow. Development is more than a job to me; it\'s something I love and constantly strive to improve at.',
        avatar: 'person'
    });

    const [socialLinks] = useState([
        { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg', url: 'https://www.linkedin.com/in/colby-rountree-aa2a7b2a5/' },
        { name: 'GitHub', image: 'https://img.icons8.com/?size=100&id=62856&format=png&color=FFFFFF', url: 'https://github.com/csrountree0' }
    ]);

    return (
        <div className="flex-1 flex flex-col">
            <style>
                {`
                    .pin-container:hover .pin-icon {
                        animation: ring 1s ease-in-out;
                    }
                `}
            </style>
            {/* Profile Header */}
            <div className="flex items-center pr-4 pl-4 pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <img src="/Colby-Rountree-Portfolio/me.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
                 </div>
                <div>
                    <div className="text-white text-xl font-medium">{profile.name}</div>
                    <div className="text-white/70 text-sm">{profile.title}</div>
                </div>
            </div>

            {/* Bio Section */}
            <div className="px-4 mb-4">
                <div className="text-white/50 text-sm mb-1">ABOUT</div>
                <div className="text-white text-sm">{profile.bio}</div>
            </div>

            {/* Contact Info */}
            <div className="px-4 mb-4 select-text">
                <div className="text-white/50 text-sm mb-2">CONTACT INFO</div>
                <div className="space-y-2">
                    <div className="flex items-center group">
                        <div className="mr-3 flex items-center justify-center w-6 h-6">
                            <AnimatedEnvelope />
                        </div>
                        <div className="text-white text-sm">{profile.email}</div>
                    </div>
                    <div className="pin-container flex items-center">
                        <span className="pin-icon select-none material-icons text-white/70 mr-3">location_on</span>
                        <div className="text-white text-sm">{profile.location}</div>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="px-4">
                <div className="text-white/50 text-sm mb-2">CONNECT</div>
                <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((link, index) => (
                        <a 
                            key={index}
                            href={link.url}
                            className="flex items-center justify-start p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img 
                                src={link.image} 
                                alt={link.name}
                                className="w-6 h-6 mr-2 object-contain"
                            />
                            <div className="text-white text-sm truncate">{link.name}</div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContactsPage; 