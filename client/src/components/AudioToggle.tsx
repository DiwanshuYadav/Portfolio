interface AudioToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <button 
      className="fixed bottom-5 left-5 z-30 w-12 h-12 rounded-full bg-dark-charcoal border border-neon-teal flex items-center justify-center shadow-lg hover:bg-light-charcoal transition-colors"
      onClick={onToggle}
      aria-label={`${isEnabled ? 'Disable' : 'Enable'} audio`}
    >
      {isEnabled ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#00FFC2">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#00FFC2">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM18.073 4.223a1 1 0 010 1.414L16.414 7l1.659 1.659a1 1 0 11-1.414 1.414L15 8.414l-1.659 1.659a1 1 0 11-1.414-1.414L13.586 7l-1.659-1.659a1 1 0 011.414-1.414L15 5.586l1.659-1.659a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
};

export default AudioToggle;
