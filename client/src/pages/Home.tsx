import { useState } from 'react';
import BootSequence from '@/components/BootSequence';
import { useTheme } from '@/hooks/use-theme';

// Minimalist Home component to identify rendering issues
const Home = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const { theme } = useTheme();
  
  // Simplified boot sequence handler
  const handleBootComplete = () => {
    console.log('Boot sequence completed');
    setBootComplete(true);
  };

  return (
    <div className={`min-h-screen ${theme}`}>
      {!bootComplete ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div className="flex items-center justify-center h-screen bg-charcoal text-white">
          <div className="text-center p-10 glassmorphic">
            <h1 className="text-4xl text-neon-teal font-space mb-4">Diwanshu Yadav</h1>
            <p className="text-xl mb-8">Welcome to my portfolio</p>
            <p className="text-sm animate-pulse">
              Site temporarily simplified for debugging purposes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
