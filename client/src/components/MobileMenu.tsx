import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!menuRef.current) return;
    
    if (isOpen) {
      // Animate menu opening
      gsap.to(menuRef.current, {
        x: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      // Animate menu closing
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);
  
  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-40 bg-charcoal transform translate-x-full transition-transform duration-300"
    >
      <div className="flex justify-end p-6">
        <button 
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#00FFC2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center space-y-8 p-6">
        <a 
          href="#about" 
          className="font-space text-2xl hover:text-neon-teal transition-colors"
          onClick={onClose}
        >
          About
        </a>
        <a 
          href="#skills" 
          className="font-space text-2xl hover:text-neon-teal transition-colors"
          onClick={onClose}
        >
          Skills
        </a>
        <a 
          href="#projects" 
          className="font-space text-2xl hover:text-neon-teal transition-colors"
          onClick={onClose}
        >
          Projects
        </a>
        <a 
          href="#contact" 
          className="font-space text-2xl hover:text-neon-teal transition-colors"
          onClick={onClose}
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
