import { useState } from 'react';

const AccessibilityControls = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    
    if (!reducedMotion) {
      // Add reduced motion class to body
      document.body.classList.add('reduced-motion');
    } else {
      // Remove reduced motion class from body
      document.body.classList.remove('reduced-motion');
    }
  };
  
  return (
    <div className="fixed top-5 left-5 z-30">
      <button 
        className="w-12 h-12 rounded-full bg-dark-charcoal border border-neon-magenta flex items-center justify-center shadow-lg hover:bg-light-charcoal transition-colors" 
        onClick={toggleReducedMotion}
        aria-label={`${reducedMotion ? 'Enable' : 'Reduce'} motion`}
      >
        {reducedMotion ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#FF00AA">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#FF00AA">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656zm1.414 1.414a2 2 0 000 2.828l6.414 6.414 6.414-6.414a2 2 0 00-2.828-2.828L10 10.172 5.586 5.757a2 2 0 00-1 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AccessibilityControls;
