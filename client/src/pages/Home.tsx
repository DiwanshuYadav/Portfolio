import { useState, useEffect } from 'react';
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
import ProjectModal from '@/components/ProjectModal';

const Home = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { showEasterEgg, easterEggUnlocked } = useKonami();
  const { currentAchievement, triggerAchievement } = useAchievements();
  
  // Handle boot sequence completion
  const handleBootComplete = () => {
    setBootComplete(true);
    // Trigger first achievement on page load
    setTimeout(() => {
      triggerAchievement('boot_complete');
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
