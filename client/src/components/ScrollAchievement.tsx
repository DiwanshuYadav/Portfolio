import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Achievement } from '@/hooks/use-achievements';

interface ScrollAchievementProps {
  achievement: Achievement;
}

const ScrollAchievement: React.FC<ScrollAchievementProps> = ({ achievement }) => {
  const achievementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!achievementRef.current) return;
    
    // Animate achievement appearance
    const timeline = gsap.timeline();
    
    timeline
      .fromTo(
        achievementRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
      .to(
        achievementRef.current,
        { opacity: 0, y: -20, duration: 0.5, ease: 'power3.in', delay: 2.5 }
      );
    
    return () => {
      timeline.kill();
    };
  }, [achievement]);
  
  return (
    <div 
      ref={achievementRef}
      className="scroll-achievement glassmorphic py-2 px-4 rounded-lg fixed bottom-20 left-5 z-100 pointer-events-none"
    >
      <div className="flex items-center">
        <div className="h-6 w-6 rounded-full bg-neon-teal flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#121212">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium font-space">{achievement.name}</span>
      </div>
    </div>
  );
};

export default ScrollAchievement;
