const Footer = () => {
  return (
    <footer className="py-8 px-4 md:px-10 text-center glassmorphic mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-sm opacity-70 mb-4">
          © {new Date().getFullYear()} DiwanshuOS | <span className="text-neon-teal">v1.0.2</span>
        </div>
        <div className="text-xs opacity-50">
          Built with React, Tailwind CSS, Three.js, and GSAP • All systems operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;
