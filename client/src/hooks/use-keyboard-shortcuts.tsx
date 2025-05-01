import { useEffect, useState } from 'react';

interface ShortcutAction {
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutAction[]) {
  const [activeShortcuts, setActiveShortcuts] = useState<ShortcutAction[]>([]);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  
  useEffect(() => {
    setActiveShortcuts(shortcuts);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is typing in an input, textarea or contentEditable element, don't trigger shortcuts
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement || 
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }
      
      // Special case for help modal ('?' key)
      if (e.key === '?' && !e.altKey && !e.ctrlKey) {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
        return;
      }
      
      // Check if the pressed key combination matches any registered shortcut
      for (const shortcut of shortcuts) {
        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!e.altKey === !!shortcut.altKey &&
          !!e.ctrlKey === !!shortcut.ctrlKey &&
          !!e.shiftKey === !!shortcut.shiftKey
        ) {
          e.preventDefault();
          shortcut.action();
          break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
  
  // Component for displaying available shortcuts
  const ShortcutsModal = () => {
    if (!showShortcutsModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="glassmorphic rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-space text-xl text-neon-teal">Keyboard Shortcuts</h3>
            <button 
              onClick={() => setShowShortcutsModal(false)}
              className="text-white hover:text-neon-teal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Help shortcut - always available */}
            <div className="flex justify-between items-center">
              <span>Show this help dialog</span>
              <span className="kbd">?</span>
            </div>
            
            {/* Registered shortcuts */}
            {activeShortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{shortcut.description}</span>
                <div className="key-combo">
                  {shortcut.ctrlKey && <span className="kbd">Ctrl</span>}
                  {shortcut.altKey && <span className="kbd">Alt</span>}
                  {shortcut.shiftKey && <span className="kbd">Shift</span>}
                  <span className="kbd">{shortcut.key.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-white opacity-60">
            Press <span className="kbd">?</span> anytime to show/hide this dialog
          </div>
        </div>
      </div>
    );
  };
  
  return { ShortcutsModal, setShowShortcutsModal };
}