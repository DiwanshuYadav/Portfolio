import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projectData } from '@/lib/data';

interface ProjectModalProps {
  projectId: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ projectId, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const project = projectData[projectId];
  
  useEffect(() => {
    // Animate modal entrance
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
    
    // Add escape key listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);
  
  const handleClose = () => {
    // Animate modal exit
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };
  
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={handleClose}
      ></div>
      <div 
        ref={modalRef}
        className="glassmorphic rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 m-4"
      >
        <button 
          className="absolute top-4 right-4 text-white hover:text-neon-teal"
          onClick={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6 md:p-8">
          <div className="h-64 md:h-80 bg-dark-charcoal relative mb-6">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal opacity-60"></div>
          </div>
          
          <h3 className="font-space text-2xl md:text-3xl font-bold text-neon-teal mb-4">{project.title}</h3>
          
          <p className="mb-6 opacity-90">{project.description}</p>
          
          <div className="mb-6">
            <h4 className="font-space text-lg font-medium mb-3 text-neon-magenta">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="text-sm py-1 px-3 rounded-full bg-light-charcoal text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-space text-lg font-medium mb-3 text-neon-blue">Key Features</h4>
            <ul className="list-disc pl-5 space-y-1 opacity-90">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="px-6 py-2 bg-neon-teal text-charcoal font-space font-medium rounded-md hover:bg-opacity-80 transition-all"
            >
              Live Demo
            </a>
            <a 
              href="#" 
              className="px-6 py-2 bg-transparent border border-neon-magenta text-neon-magenta font-space font-medium rounded-md hover:bg-neon-magenta hover:bg-opacity-10 transition-all"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
