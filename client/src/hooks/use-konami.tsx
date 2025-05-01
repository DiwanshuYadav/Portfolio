import { useState, useEffect } from 'react';

export function useKonami() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
  
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);
        
        if (nextIndex === konamiCode.length) {
          // Konami code completed
          setEasterEggUnlocked(true);
          setKonamiIndex(0);
        }
      } else {
        // Reset progress on wrong key
        setKonamiIndex(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konamiIndex, konamiCode]);
  
  // Function to display the easter egg content
  const showEasterEgg = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <div className="glassmorphic p-8 rounded-lg max-w-md text-center">
          <h3 className="font-space text-2xl font-bold text-neon-teal mb-4">🥷 Secret Project Unlocked!</h3>
          <p className="mb-6">You've discovered my stealth project: A quantum computing simulator with visual programming interface. Coming soon!</p>
          <div className="h-48 bg-dark-charcoal relative mb-6">
            <img 
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80" 
              alt="Quantum Computing Project" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal opacity-60"></div>
          </div>
          <button 
            onClick={() => setEasterEggUnlocked(false)}
            className="px-6 py-2 bg-neon-magenta text-white font-space font-medium rounded-md hover:bg-opacity-80 transition-all"
          >
            Awesome, Got it!
          </button>
        </div>
      </div>
    );
  };
  
  return { easterEggUnlocked, showEasterEgg };
}
