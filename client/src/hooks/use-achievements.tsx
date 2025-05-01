import { useState, useCallback } from 'react';

interface Achievement {
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
  const [unlockedAchievements, setUnlockedAchievements] = useState<Record<string, boolean>>({});
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  
  const triggerAchievement = useCallback((achievementId: string) => {
    // Check if achievement exists and has not been unlocked yet
    if (achievements[achievementId] && !unlockedAchievements[achievementId]) {
      // Mark achievement as unlocked
      setUnlockedAchievements(prev => ({
        ...prev,
        [achievementId]: true
      }));
      
      // Show achievement notification
      setCurrentAchievement(achievements[achievementId]);
      
      // Clear achievement notification after 3 seconds
      setTimeout(() => {
        setCurrentAchievement(null);
      }, 3000);
    }
  }, [unlockedAchievements]);
  
  return { 
    currentAchievement, 
    triggerAchievement,
    unlockedAchievements
  };
}
