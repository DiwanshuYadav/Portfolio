import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { useMobile } from '@/hooks/use-mobile';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'AI' | 'Web' | 'Programming' | 'DevOps' | 'Database' | 'Tools';
  color: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  
  const skills: Skill[] = [
    {
      id: 'python',
      name: 'Python',
      icon: 'Py',
      description: 'Machine Learning, Data Science, Backend',
      category: 'Programming',
      color: 'text-neon-teal'
    },
    {
      id: 'cpp',
      name: 'C++',
      icon: 'C++',
      description: 'Performance-critical applications, Game Dev',
      category: 'Programming',
      color: 'text-neon-magenta'
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: 'ML',
      description: 'Neural Networks, NLP, Computer Vision',
      category: 'AI',
      color: 'text-neon-blue'
    },
    {
      id: 'web',
      name: 'Web Development',
      icon: 'Web',
      description: 'React, Next.js, Three.js, GSAP',
      category: 'Web',
      color: 'text-neon-teal'
    },
    {
      id: 'db',
      name: 'Databases',
      icon: 'DB',
      description: 'SQL, MongoDB, Firebase, Redis',
      category: 'Database',
      color: 'text-neon-magenta'
    },
    {
      id: 'git',
      name: 'Version Control',
      icon: 'Git',
      description: 'Git, GitHub, CI/CD Pipelines',
      category: 'DevOps',
      color: 'text-neon-blue'
    }
  ];

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
    
    // Animate skills container
    if (containerRef.current) {
      timeline.fromTo(
        containerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }
    
    // For desktop, create a 3D force-directed graph with Three.js
    if (!isMobile && containerRef.current) {
      // Code for 3D force-directed graph would go here
      // This would be a complex implementation involving Three.js physics
      // For now, we'll use our grid layout as a fallback
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
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-10 lg:px-20 relative"
    >
      <div className="max-w-5xl mx-auto">
        <h2 
          ref={headingRef}
          className="font-space text-3xl md:text-4xl font-bold mb-12 text-neon-magenta"
        >
          Skill Cosmos <span className="text-white opacity-50">// Expertise</span>
        </h2>
        
        <div 
          ref={containerRef}
          className="h-[600px] w-full glassmorphic rounded-lg flex items-center justify-center relative overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10 w-full h-full">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`skill-node glassmorphic rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-${skill.color.replace('text-', '')} border-2 border-transparent transition-all cursor-pointer`}
                onMouseEnter={() => setActiveSkill(skill.id)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className="w-16 h-16 rounded-full bg-light-charcoal flex items-center justify-center mb-3">
                  <span className={`${skill.color} text-2xl`}>{skill.icon}</span>
                </div>
                <h4 className={`font-space ${skill.color} font-medium`}>{skill.name}</h4>
                <p className="text-sm mt-2 opacity-70">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
