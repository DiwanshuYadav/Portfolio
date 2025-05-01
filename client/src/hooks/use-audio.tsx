import { useState, useEffect, useCallback, useRef } from 'react';

// Types of sound effects available
export type SoundEffect = 
  | 'boot-complete' 
  | 'button-click' 
  | 'hover' 
  | 'achievement' 
  | 'modal-open'
  | 'modal-close'
  | 'toggle-on'
  | 'toggle-off'
  | 'error'
  | 'success';

// Base64 encoded small audio files 
// These are placeholder values - in production, you would use actual base64 encoded audio files
const soundEffects: Record<SoundEffect, string> = {
  'boot-complete': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'button-click': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'hover': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'achievement': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'modal-open': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'modal-close': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'toggle-on': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'toggle-off': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'error': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA',
  'success': 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADiAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABSAJAJAQgAAgAAAA4hy4X3mAAAAAAAAAAAAAAAAAAAA'
};

// Adjust volume levels for different sound effects
const volumeLevels: Record<SoundEffect, number> = {
  'boot-complete': 0.5,
  'button-click': 0.2,
  'hover': 0.1,
  'achievement': 0.6,
  'modal-open': 0.3,
  'modal-close': 0.3,
  'toggle-on': 0.3,
  'toggle-off': 0.3,
  'error': 0.4,
  'success': 0.4
};

export function useAudio() {
  // Use refs to avoid dependency cycles in useEffect/useCallback
  const isEnabledRef = useRef(false);
  const isLoadedRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(false); // Keep this state for UI updates
  const audioElements = useRef<Record<SoundEffect, HTMLAudioElement | null>>({} as Record<SoundEffect, HTMLAudioElement | null>);

  // Initialize audio elements only once when hook is mounted
  useEffect(() => {
    // Check if already initialized
    if (isLoadedRef.current) return;
    
    console.log('Initializing audio system...');
    
    // Load saved audio state first
    const savedAudioState = localStorage.getItem('audioEnabled');
    const initialState = savedAudioState === 'true';
    isEnabledRef.current = initialState;
    setIsEnabled(initialState);
    
    // Create audio elements for each sound effect
    Object.entries(soundEffects).forEach(([key, src]) => {
      try {
        const audio = new Audio(src);
        audio.volume = volumeLevels[key as SoundEffect];
        audio.preload = 'auto';
        
        audioElements.current[key as SoundEffect] = audio;
      } catch (err) {
        console.error(`Failed to load audio for ${key}:`, err);
      }
    });
    
    // Mark as loaded
    isLoadedRef.current = true;
    
    // Clean up audio elements
    return () => {
      Object.values(audioElements.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      isLoadedRef.current = false;
    };
  }, []); // Empty dependency array - only run once on mount
  
  // Toggle audio on/off without dependencies
  const toggleAudio = useCallback(() => {
    const newState = !isEnabledRef.current;
    
    // Update ref first
    isEnabledRef.current = newState;
    
    // Then update state for UI
    setIsEnabled(newState);
    
    // Save preference
    localStorage.setItem('audioEnabled', newState.toString());
    
    console.log('Audio toggled:', newState ? 'ON' : 'OFF');
    
    // Play the toggle sound
    if (newState && isLoadedRef.current) {
      const audio = audioElements.current['toggle-on'];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error('Error playing audio:', e));
      }
    }
  }, []); // No dependencies
  
  // Play sound effect without dependencies on state
  const playSound = useCallback((effect: SoundEffect) => {
    // Check the ref values, not the state
    if (!isEnabledRef.current || !isLoadedRef.current) return;
    
    const audio = audioElements.current[effect];
    if (audio) {
      // Stop and reset audio to beginning
      audio.currentTime = 0;
      audio.play().catch(e => console.error('Error playing audio:', e));
    }
  }, []); // No dependencies
  
  return { isEnabled, toggleAudio, playSound };
}