import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { generateResume } from '@/lib/utils';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const waveGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({
      x: (clientX / window.innerWidth) * 2 - 1,
      y: -(clientY / window.innerHeight) * 2 + 1
    });
  }, []);
  
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
    const particleCount = 2500;
    
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create a galaxy-like spiral distribution
      const radius = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      particlePositions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      particlePositions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      particlePositions[i3 + 2] = radius * Math.cos(theta);
      
      // Vary particle sizes for depth effect
      particleSizes[i] = Math.random() * 0.05 + 0.03;
      
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
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;
    
    // Create wave effect
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);
    waveGroupRef.current = waveGroup;
    
    // Create several rings in different colors
    const createRing = (radius: number, color: number, segments = 64) => {
      const ringGeometry = new THREE.RingGeometry(radius, radius + 0.05, segments);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      waveGroup.add(ring);
      return ring;
    };
    
    // Create rings with different colors
    const tealRing = createRing(2, 0x00ffc2);
    const magentaRing = createRing(3, 0xff00aa);
    const blueRing = createRing(4, 0x00aaff);
    
    // Animate rings with GSAP
    gsap.to(tealRing.scale, {
      x: 1.5, y: 1.5, z: 1.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    gsap.to(magentaRing.scale, {
      x: 1.3, y: 1.3, z: 1.3,
      duration: 5,
      repeat: -1,
      yoyo: true,
      delay: 0.5,
      ease: "power1.inOut"
    });
    
    gsap.to(blueRing.scale, {
      x: 1.2, y: 1.2, z: 1.2,
      duration: 6,
      repeat: -1,
      yoyo: true,
      delay: 1,
      ease: "power1.inOut"
    });
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      animationFrameId.current = requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        // Basic rotation
        particlesRef.current.rotation.x += 0.0003;
        particlesRef.current.rotation.y += 0.0005;
        
        // Respond to mouse movement
        gsap.to(particlesRef.current.rotation, {
          x: particlesRef.current.rotation.x + mousePosition.y * 0.05,
          y: particlesRef.current.rotation.y + mousePosition.x * 0.05,
          duration: 2,
          ease: "power2.out"
        });
      }
      
      if (waveGroupRef.current) {
        waveGroupRef.current.rotation.z += 0.002;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
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
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      if (canvasRef.current && rendererRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
      
      scene.clear();
      renderer.dispose();
    };
  }, [handleMouseMove]);
  
  // Trigger animations after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle resume download using our utility function
  const handleResumeDownload = () => {
    generateResume();
  };
  
  return (
    <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={canvasRef} className="absolute inset-0 z-0"></div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-charcoal opacity-60 z-0"></div>
      
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
            className="px-8 py-3 bg-neon-teal text-charcoal font-space font-medium rounded-md hover:bg-opacity-80 transition-all transform hover:scale-105 hover:shadow-glow-teal"
          >
            Enter Lab
          </a>
          <button 
            onClick={handleResumeDownload}
            className="px-8 py-3 bg-transparent border-2 border-neon-magenta text-neon-magenta font-space font-medium rounded-md hover:bg-neon-magenta hover:bg-opacity-20 transition-all transform hover:scale-105 hover:shadow-glow-magenta"
          >
            Download Dossier
          </button>
        </div>
        
        <p 
          className={`text-sm mt-6 text-white opacity-60 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
        >
          Try moving your mouse to interact with the particle system
        </p>
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
