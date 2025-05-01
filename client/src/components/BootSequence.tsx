import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [terminalText, setTerminalText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [bootStage, setBootStage] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const bootMessages = [
    "init DiwanshuOS v2.5.3...",
    "loading core system components...",
    "initializing neural interface subsystems...",
    "calibrating quantum processors...",
    "mounting filesystems...",
    "establishing secure connections...",
    "running integrity checks...",
    "configuring environmental parameters...",
    "preparing workspace...",
    "welcome to DiwanshuOS - neural interface ready"
  ];

  // Visual glitch effect
  useEffect(() => {
    if (!terminalRef.current) return;
    
    // Random glitchy movements
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6 && terminalRef.current) {
        const glitchX = (Math.random() - 0.5) * 10;
        const glitchY = (Math.random() - 0.5) * 10;
        
        gsap.to(terminalRef.current, {
          x: glitchX,
          y: glitchY,
          duration: 0.1,
          onComplete: () => {
            if (terminalRef.current) {
              gsap.to(terminalRef.current, {
                x: 0,
                y: 0,
                duration: 0.1
              });
            }
          }
        });
      }
    }, 1000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Update progress bar
  useEffect(() => {
    const progress = (messageIndex / bootMessages.length) * 100;
    setProgressPercent(progress);
    
    // Update boot stage for the changing UI
    if (messageIndex > bootMessages.length * 0.7) {
      setBootStage(3); // Final stage
    } else if (messageIndex > bootMessages.length * 0.4) {
      setBootStage(2); // Middle stage
    } else if (messageIndex > bootMessages.length * 0.1) {
      setBootStage(1); // Early stage
    }
  }, [messageIndex, bootMessages.length]);
  
  // Typing effect logic
  const typeNextChar = useCallback(() => {
    if (messageIndex < bootMessages.length) {
      const currentMessage = bootMessages[messageIndex];
      
      if (charIndex < currentMessage.length) {
        setTerminalText(prev => prev + currentMessage.charAt(charIndex));
        setCharIndex(prev => prev + 1);
      } else {
        // Message complete, prepare for next message
        setTimeout(() => {
          setTerminalText('');
          setCharIndex(0);
          setMessageIndex(prev => prev + 1);
        }, 800);
      }
    } else {
      // All messages complete, trigger fade out
      setFadeOut(true);
      setTimeout(onComplete, 1500);
    }
  }, [messageIndex, charIndex, bootMessages, onComplete]);
  
  // Run typing effect with variable speed
  useEffect(() => {
    // Typing speed varies slightly for more natural feel
    const typingSpeed = Math.random() * 20 + 30; // 30-50ms
    const typingTimer = setTimeout(typeNextChar, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [terminalText, typeNextChar]);
  
  return (
    <div 
      className={`fixed inset-0 bg-charcoal z-50 flex items-center justify-center transition-opacity duration-1500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div 
        ref={terminalRef} 
        className={`terminal-container max-w-lg w-full p-6 glassmorphic rounded-md 
                   ${bootStage === 0 ? 'border-gray-700' : 
                     bootStage === 1 ? 'border-neon-blue' : 
                     bootStage === 2 ? 'border-neon-magenta' : 
                     'border-neon-teal'} border-2`}
      >
        <div className="flex items-center mb-4">
          <div className={`h-3 w-3 rounded-full mr-2 ${bootStage >= 1 ? 'bg-neon-teal' : 'bg-gray-600'}`}></div>
          <div className={`h-3 w-3 rounded-full mr-2 ${bootStage >= 2 ? 'bg-neon-magenta' : 'bg-gray-600'}`}></div>
          <div className={`h-3 w-3 rounded-full ${bootStage >= 3 ? 'bg-neon-blue' : 'bg-gray-600'}`}></div>
          <div className="ml-auto text-xs opacity-70 font-mono">
            {Math.round(progressPercent)}% complete
          </div>
        </div>
        
        <div className="bg-dark-charcoal p-4 rounded-md mb-4">
          <p className="terminal-text text-lg">
            boot@DiwanshuOS:~$ {terminalText}
            <span className="cursor"></span>
          </p>
        </div>
        
        <div className="mb-2 text-xs opacity-70 font-mono">System boot progress:</div>
        <div className="w-full h-2 bg-dark-charcoal rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              bootStage === 0 ? 'bg-gray-500' : 
              bootStage === 1 ? 'bg-neon-blue' : 
              bootStage === 2 ? 'bg-neon-magenta' : 
              'bg-neon-teal'}`}
            style={{ width: `${progressPercent}%`, transition: 'width 0.3s ease-in-out' }}
          ></div>
        </div>
        
        {bootStage >= 3 && (
          <div className="mt-4 text-xs text-neon-teal animate-pulse">
            Neural interface synchronization complete...
          </div>
        )}
      </div>
    </div>
  );
};

export default BootSequence;
