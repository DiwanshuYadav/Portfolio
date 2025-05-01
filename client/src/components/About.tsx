import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
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
    
    // Animate terminal
    if (terminalRef.current) {
      timeline.fromTo(
        terminalRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 },
        '-=0.5'
      );
    }
    
    // Animate stats
    if (statsRef.current) {
      timeline.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          stagger: 0.15
        },
        '-=0.3'
      );
    }
    
    return () => {
      // Clean up ScrollTrigger
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-10 lg:px-20 relative"
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          ref={headingRef}
          className="font-space text-3xl md:text-4xl font-bold mb-12 text-neon-teal"
        >
          Mission Briefing <span className="text-white opacity-50">// About</span>
        </h2>
        
        <div 
          ref={terminalRef}
          className="glassmorphic p-6 md:p-8 rounded-lg mb-10"
        >
          <div className="flex items-center mb-4">
            <div className="h-3 w-3 rounded-full bg-neon-teal mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-neon-magenta mr-2"></div>
            <div className="h-3 w-3 rounded-full bg-neon-blue"></div>
          </div>
          
          <div className="terminal-text font-space text-sm md:text-base">
            <p className="mb-3">&gt; <span className="text-white">name</span> = <span className="text-neon-magenta">"Diwanshu Yadav"</span></p>
            <p className="mb-3">&gt; <span className="text-white">role</span> = [<span className="text-neon-magenta">"AI Architect"</span>, <span className="text-neon-magenta">"Full-Stack Alchemist"</span>, <span className="text-neon-magenta">"Creative Technologist"</span>]</p>
            <p className="mb-3">&gt; <span className="text-white">status</span> = <span className="text-neon-magenta">"Building the future."</span></p>
            <p className="mb-3">&gt; <span className="text-white">mission</span> = <span className="text-neon-magenta">"Creating intelligent, immersive experiences that push technological boundaries while remaining accessible and human-centered."</span></p>
          </div>
        </div>
        
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="stat-item glassmorphic p-6 rounded-lg text-center">
            <div className="text-4xl text-neon-teal font-bold mb-2 font-space">12+</div>
            <div className="text-sm uppercase tracking-wide">Projects Completed</div>
          </div>
          <div className="stat-item glassmorphic p-6 rounded-lg text-center">
            <div className="text-4xl text-neon-magenta font-bold mb-2 font-space">8</div>
            <div className="text-sm uppercase tracking-wide">Certifications</div>
          </div>
          <div className="stat-item glassmorphic p-6 rounded-lg text-center">
            <div className="text-4xl text-neon-blue font-bold mb-2 font-space">5+</div>
            <div className="text-sm uppercase tracking-wide">Programming Languages</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
