import { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

// Simplified boot sequence for debugging
const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  // Simple progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        // When progress reaches 100, trigger completion
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200); // Fast progress for debugging
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center flex-col">
      <div className="terminal-container max-w-lg w-full p-6 glassmorphic rounded-md border-neon-teal border-2">
        <h2 className="text-neon-teal text-2xl mb-4 font-space text-center">Diwanshu Portfolio OS</h2>
        
        <div className="bg-dark-charcoal p-4 rounded-md mb-4">
          <p className="terminal-text">
            boot@DiwanshuOS:~$ System initializing...
            <span className="cursor"></span>
          </p>
        </div>
        
        <div className="mb-2 text-xs font-mono text-white">System boot progress:</div>
        <div className="w-full h-4 bg-dark-charcoal rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon-teal"
            style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}
          ></div>
        </div>
        
        <div className="mt-4 text-center text-white">
          {progress}% complete
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
