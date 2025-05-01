import { useState, useEffect } from 'react';

interface NavbarProps {
  toggleTheme: () => void;
  theme: string;
  openMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme, openMobileMenu }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Fade in navbar after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-40 glassmorphic px-6 py-4 flex justify-between items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-neon-teal flex items-center justify-center mr-3">
          <span className="font-space font-bold text-charcoal">DY</span>
        </div>
        <span className="font-space text-neon-teal text-xl">DiwanshuOS</span>
      </div>
      
      <div className="hidden md:flex space-x-6 items-center">
        <a href="#about" className="hover:text-neon-teal transition-colors">About</a>
        <a href="#skills" className="hover:text-neon-teal transition-colors">Skills</a>
        <a href="#projects" className="hover:text-neon-teal transition-colors">Projects</a>
        <a href="#contact" className="hover:text-neon-teal transition-colors">Contact</a>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-light-charcoal hover:bg-glass transition-colors" 
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#00FFC2">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#121212">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      <button 
        className="md:hidden"
        onClick={openMobileMenu}
        aria-label="Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#00FFC2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
