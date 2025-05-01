import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectData } from '@/lib/data';
import { useMobile } from '@/hooks/use-mobile';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  onSelectProject: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create GSAP timeline for animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none none'
      }
    });
    
    // Animate heading
    if (headingRef.current) {
      timeline.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
    
    // Animate project pods
    if (projectsRef.current) {
      timeline.fromTo(
        projectsRef.current.querySelectorAll('.project-pod'),
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          stagger: 0.15
        },
        '-=0.5'
      );
    }
    
    // Add tilt effect to project pods (non-mobile only)
    if (!isMobile && projectsRef.current) {
      const projectPods = projectsRef.current.querySelectorAll('.project-pod');
      
      projectPods.forEach(pod => {
        pod.addEventListener('mousemove', (e) => {
          if (document.body.classList.contains('reduced-motion')) return;
          
          const rect = pod.getBoundingClientRect();
          const x = (e as MouseEvent).clientX - rect.left;
          const y = (e as MouseEvent).clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const tiltX = (y - centerY) / 20;
          const tiltY = (centerX - x) / 20;
          
          (pod as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        pod.addEventListener('mouseleave', () => {
          (pod as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
      });
    }
    
    return () => {
      // Clean up ScrollTrigger
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
    };
  }, [isMobile]);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-10 lg:px-20 relative"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={headingRef}
          className="font-space text-3xl md:text-4xl font-bold mb-12 text-neon-blue"
        >
          Live Experiments <span className="text-white opacity-50">// Projects</span>
        </h2>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.entries(projectData).map(([id, project]) => (
            <div 
              key={id}
              className="project-pod glassmorphic rounded-lg overflow-hidden cursor-pointer"
              data-project-id={id}
              onClick={() => onSelectProject(id)}
            >
              <div className="h-48 bg-dark-charcoal relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="font-space text-xl font-bold text-neon-teal mb-2">{project.title}</h3>
                <p className="text-sm mb-4 opacity-80">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index}
                      className={`text-xs py-1 px-2 rounded-full bg-light-charcoal ${
                        index % 3 === 0 ? 'text-neon-teal' : 
                        index % 3 === 1 ? 'text-neon-magenta' : 
                        'text-neon-blue'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
