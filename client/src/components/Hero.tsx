import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Initialize three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 20;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Colors: teal, magenta, blue
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Teal
        particleColors[i3] = 0;
        particleColors[i3 + 1] = 1;
        particleColors[i3 + 2] = 0.76;
      } else if (colorChoice < 0.66) {
        // Magenta
        particleColors[i3] = 1;
        particleColors[i3 + 1] = 0;
        particleColors[i3 + 2] = 0.67;
      } else {
        // Blue
        particleColors[i3] = 0;
        particleColors[i3 + 1] = 0.67;
        particleColors[i3 + 2] = 1;
      }
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.rotation.x += 0.0003;
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && rendererRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  // Trigger animations after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleResumeDownload = () => {
    // In a production environment, this would generate a PDF using jsPDF
    // For this demo, we'll just show an alert
    alert('Resume download functionality would be implemented using jsPDF in a production environment.');
  };
  
  return (
    <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={canvasRef} className="absolute inset-0 z-0"></div>
      
      <div className="text-center z-10 px-4">
        <h1 
          className={`font-space font-bold text-4xl md:text-6xl mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}
          data-text="Diwanshu Yadav"
        >
          <span className="glitch-text" data-text="Diwanshu Yadav">Diwanshu Yadav</span>
        </h1>
        
        <p 
          className={`text-xl md:text-2xl mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}
        >
          <span className="text-neon-teal">AI Architect</span> · 
          <span className="text-neon-magenta">Full-Stack Alchemist</span> · 
          <span className="text-neon-blue">Creative Technologist</span>
        </p>
        
        <div 
          className={`flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}
        >
          <a 
            href="#about" 
            className="px-8 py-3 bg-neon-teal text-charcoal font-space font-medium rounded-md hover:bg-opacity-80 transition-all transform hover:scale-105"
          >
            Enter Lab
          </a>
          <button 
            onClick={handleResumeDownload}
            className="px-8 py-3 bg-transparent border-2 border-neon-magenta text-neon-magenta font-space font-medium rounded-md hover:bg-neon-magenta hover:bg-opacity-20 transition-all transform hover:scale-105"
          >
            Download Dossier
          </button>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#00FFC2">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
