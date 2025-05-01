import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to add tilt effect to an element
 */
export function addTiltEffect(element: HTMLElement, intensity: number = 20) {
  const handleMouseMove = (e: MouseEvent) => {
    if (document.body.classList.contains('reduced-motion')) return;
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / intensity;
    const tiltY = (centerX - x) / intensity;
    
    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  const handleMouseLeave = () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Utility to generate PDF resume
 */
export function generateResume() {
  // This function would use jsPDF to generate a resume
  // In a real implementation, this would be more complex
  alert('Resume download functionality would be implemented using jsPDF in a production environment.');
}
