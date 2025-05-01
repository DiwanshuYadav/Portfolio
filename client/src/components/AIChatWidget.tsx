import { useState, useRef, useEffect } from 'react';

interface AIChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! How can I assist you today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      sender: 'user',
      text: input,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm currently working on several AI projects. Would you like to know more about any specific one?",
        "My expertise includes machine learning, computer vision, and full-stack development.",
        "The best way to contact me is through the form on this website or via email.",
        "I've worked with Python, C++, JavaScript, and several other programming languages.",
        "I'm always open to discussing new project opportunities and collaborations.",
        "Thanks for your interest! Let me know if you have any other questions."
      ];
      
      const aiMessage: ChatMessage = {
        sender: 'ai',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <button 
        id="toggle-chat" 
        onClick={onToggle}
        className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-neon-teal flex items-center justify-center shadow-lg hover:bg-opacity-80 transition-colors"
        aria-label="Toggle chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#121212">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Chat widget */}
      <div id="ai-chat-widget" className={`fixed bottom-5 right-5 z-40 transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="glassmorphic rounded-lg w-72 md:w-80 overflow-hidden">
          <div className="bg-dark-charcoal p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-neon-teal mr-2 animate-pulse"></div>
              <span className="font-space text-neon-teal text-sm">Ask DiwanshuOS</span>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-neon-teal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div id="chat-messages" className="h-80 overflow-y-auto p-4 space-y-4 bg-charcoal">
            {messages.map((msg, index) => (
              <div key={msg.timestamp + index} className="flex items-start">
                {msg.sender === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-neon-teal flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="font-space font-bold text-charcoal text-xs">DY</span>
                  </div>
                )}
                <div className={`glassmorphic p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'ml-auto' : ''}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-neon-teal flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="font-space font-bold text-charcoal text-xs">DY</span>
                </div>
                <div className="glassmorphic p-3 rounded-lg">
                  <p className="text-sm flex space-x-1">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse delay-150">.</span>
                    <span className="animate-pulse delay-300">.</span>
                  </p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-dark-charcoal border-t border-gray-800">
            <form id="chat-form" className="flex" onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="chat-input" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..." 
                className="flex-grow p-2 bg-light-charcoal border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-neon-teal"
              />
              <button 
                type="submit" 
                className="px-4 bg-neon-teal text-charcoal rounded-r-md hover:bg-opacity-80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
