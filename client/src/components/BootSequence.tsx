import { useState, useEffect, useCallback } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [terminalText, setTerminalText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  
  const bootMessages = [
    "init sequence...",
    "loading system components...",
    "initializing neural interface...",
    "calibrating quantum processors...",
    "welcome to DiwanshuOS"
  ];
  
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
        }, 1000);
      }
    } else {
      // All messages complete, trigger fade out
      setFadeOut(true);
      setTimeout(onComplete, 1000);
    }
  }, [messageIndex, charIndex, bootMessages, onComplete]);
  
  // Run typing effect
  useEffect(() => {
    const typingTimer = setTimeout(typeNextChar, 50);
    return () => clearTimeout(typingTimer);
  }, [terminalText, typeNextChar]);
  
  return (
    <div 
      className={`fixed inset-0 bg-charcoal z-50 flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="terminal-container max-w-lg w-full p-4">
        <p className="terminal-text text-xl mb-2">
          boot@DiwanshuOS:~$ {terminalText}
          <span className="cursor"></span>
        </p>
      </div>
    </div>
  );
};

export default BootSequence;
