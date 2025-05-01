import { useState, useEffect, useRef } from 'react';
import BootSequence from '@/components/BootSequence';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIChatWidget from '@/components/AIChatWidget';
import AudioToggle from '@/components/AudioToggle';
import AccessibilityControls from '@/components/AccessibilityControls';
import ScrollAchievement from '@/components/ScrollAchievement';
import MobileMenu from '@/components/MobileMenu';
import { useTheme } from '@/hooks/use-theme';
import { useKonami } from '@/hooks/use-konami';
import { useAchievements } from '@/hooks/use-achievements';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import ProjectModal from '@/components/ProjectModal';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const Home = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showWelcomeInfo, setShowWelcomeInfo] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { showEasterEgg, easterEggUnlocked } = useKonami();
  const { currentAchievement, triggerAchievement } = useAchievements();
  
  // Section refs for smooth scrolling
  const aboutRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  
  // Handle boot sequence completion
  const handleBootComplete = () => {
    setBootComplete(true);
    // Trigger first achievement on page load
    setTimeout(() => {
      triggerAchievement('boot_complete');
      setShowWelcomeInfo(true);
      
      // Auto-hide welcome info after 5 seconds
      setTimeout(() => {
        setShowWelcomeInfo(false);
      }, 5000);
    }, 1000);
  };

  // Track scroll position for achievements
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Explorer I: First Scroll (300px)
      if (scrollPosition > 300) {
        triggerAchievement('explorer1');
      }
      
      // Explorer II: Halfway There
      if (scrollPosition > (scrollHeight / 2) - windowHeight) {
        triggerAchievement('explorer2');
      }
      
      // Scroll Master: Complete Journey
      if (scrollPosition > scrollHeight - windowHeight - 100) {
        triggerAchievement('master');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerAchievement]);
  
  // Set up refs after mount
  useEffect(() => {
    if (bootComplete) {
      aboutRef.current = document.getElementById('about') as HTMLElement;
      skillsRef.current = document.getElementById('skills') as HTMLElement;
      projectsRef.current = document.getElementById('projects') as HTMLElement;
      contactRef.current = document.getElementById('contact') as HTMLElement;
    }
  }, [bootComplete]);
  
  // Smooth scroll function
  const scrollToSection = (section: HTMLElement | null) => {
    if (!section) return;
    
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: section, offsetY: 80 },
      ease: "power2.inOut"
    });
  };
  
  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: 'h',
      description: 'Go to Hero section',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      key: 'a',
      description: 'Go to About section',
      action: () => scrollToSection(aboutRef.current)
    },
    {
      key: 's',
      description: 'Go to Skills section',
      action: () => scrollToSection(skillsRef.current)
    },
    {
      key: 'p',
      description: 'Go to Projects section',
      action: () => scrollToSection(projectsRef.current)
    },
    {
      key: 'c',
      description: 'Go to Contact section',
      action: () => scrollToSection(contactRef.current)
    },
    {
      key: 't',
      description: 'Toggle theme (dark/light)',
      action: toggleTheme
    },
    {
      key: 'ESC',
      description: 'Close any open modal',
      action: () => {
        if (selectedProject) setSelectedProject(null);
        if (showAIChat) setShowAIChat(false);
        if (showMobileMenu) setShowMobileMenu(false);
      }
    },
    {
      key: 'i',
      description: 'Toggle AI chat assistant',
      action: () => setShowAIChat(!showAIChat)
    },
    {
      key: 'm',
      description: 'Toggle audio',
      action: () => setAudioEnabled(!audioEnabled)
    }
  ];
  
  // Initialize keyboard shortcuts
  const { ShortcutsModal } = useKeyboardShortcuts(shortcuts);

  return (
    <div className={`min-h-screen ${theme}`}>
      {!bootComplete ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <>
          <Navbar 
            toggleTheme={toggleTheme} 
            theme={theme}
            openMobileMenu={() => setShowMobileMenu(true)} 
          />
          
          <MobileMenu 
            isOpen={showMobileMenu} 
            onClose={() => setShowMobileMenu(false)} 
          />
          
          <main className="flex-grow">
            <Hero />
            <About />
            <Skills />
            <Projects onSelectProject={setSelectedProject} />
            <Contact />
          </main>
          
          <Footer />
          
          {/* Keyboard shortcuts modal */}
          <ShortcutsModal />
          
          {/* Welcome info tooltip */}
          {showWelcomeInfo && (
            <div className="fixed bottom-24 right-5 z-30 glassmorphic p-3 rounded-lg max-w-xs animate-fadeIn">
              <p className="text-sm">
                <span className="text-neon-teal font-medium">Pro Tip:</span> Press <span className="kbd">?</span> anytime to see keyboard shortcuts
              </p>
              <button 
                onClick={() => setShowWelcomeInfo(false)}
                className="absolute top-1 right-1 text-white hover:text-neon-teal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Floating UI Elements */}
          <AIChatWidget 
            isOpen={showAIChat} 
            onToggle={() => setShowAIChat(!showAIChat)} 
            onClose={() => setShowAIChat(false)} 
          />
          
          <AudioToggle 
            isEnabled={audioEnabled} 
            onToggle={() => setAudioEnabled(!audioEnabled)} 
          />
          
          <AccessibilityControls />
          
          {currentAchievement && (
            <ScrollAchievement achievement={currentAchievement} />
          )}
          
          {selectedProject && (
            <ProjectModal 
              projectId={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
          
          {easterEggUnlocked && showEasterEgg()}
        </>
      )}
    </div>
  );
};

export default Home;
