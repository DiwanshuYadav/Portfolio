import { useState, useCallback, useRef } from 'react';

export interface Achievement {
  id: string;
  name: string;
}

const achievements: Record<string, Achievement> = {
  boot_complete: {
    id: 'boot_complete',
    name: 'System Initialized: Welcome Aboard'
  },
  explorer1: {
    id: 'explorer1',
    name: 'Explorer I: First Scroll'
  },
  explorer2: {
    id: 'explorer2',
    name: 'Explorer II: Halfway There'
  },
  master: {
    id: 'master',
    name: 'Scroll Master: Complete Journey'
  },
  konami: {
    id: 'konami',
    name: 'Secret Agent: Konami Master'
  }
};

export function useAchievements() {
  // Use refs for internal state to avoid dependency cycles
  const unlockedRef = useRef<Record<string, boolean>>({});
  const [unlockedAchievements, setUnlockedAchievements] = useState<Record<string, boolean>>({});
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  
  // Notification timer reference to clear on unmount
  const timerRef = useRef<number | null>(null);
  
  const triggerAchievement = useCallback((achievementId: string) => {
    // Only process if this is a valid achievement
    if (!achievements[achievementId]) return;
    
    // Check if achievement has already been unlocked
    if (unlockedRef.current[achievementId]) return;
    
    console.log(`Unlocking achievement: ${achievementId}`);
    
    // Mark as unlocked in ref (for internal checks)
    unlockedRef.current = {
      ...unlockedRef.current,
      [achievementId]: true
    };
    
    // Update state for UI
    setUnlockedAchievements(prev => ({
      ...prev,
      [achievementId]: true
    }));
    
    // Show achievement notification
    setCurrentAchievement(achievements[achievementId]);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Clear achievement notification after 3 seconds
    timerRef.current = window.setTimeout(() => {
      setCurrentAchievement(null);
      timerRef.current = null;
    }, 3000);
  }, []); // No dependencies needed
  
  return { 
    currentAchievement, 
    triggerAchievement,
    unlockedAchievements
  };
}
