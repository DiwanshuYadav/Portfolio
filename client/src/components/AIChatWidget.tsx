import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AIChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  type?: 'text' | 'command' | 'response' | 'error' | 'suggestion';
}

// Knowledge base for AI responses
const aiKnowledge = {
  greetings: [
    "Hello! How can I assist you with DiwanshuOS today?",
    "Welcome to DiwanshuOS! How may I help you?",
    "Greetings! I'm the DiwanshuOS assistant. What would you like to know?"
  ],
  projects: [
    "I've worked on several cutting-edge projects including Neural Vision System, DataSphere Explorer, and Autonomous Agent Framework.",
    "My portfolio includes work in computer vision, 3D data visualization, and multi-agent AI systems.",
    "I specialize in projects that combine AI with immersive user experiences."
  ],
  skills: [
    "My core skills include Python, C++, Machine Learning, Web Development, Databases, and Version Control systems.",
    "I'm proficient in AI development with expertise in neural networks, computer vision, and NLP.",
    "My technical toolkit includes full-stack development, with a focus on React, Three.js, and TensorFlow."
  ],
  contact: [
    "You can reach me through the contact form on this site or via email at diwanshu.yadav@example.com.",
    "Feel free to connect with me on LinkedIn or Twitter. Links are in the contact section.",
    "For professional inquiries, the contact form provides the fastest response time."
  ],
  help: [
    "Try asking about my projects, skills, or how to get in touch. You can also ask for a demonstration of my work.",
    "I can provide information about my background, technical skills, or project portfolio. What are you curious about?",
    "Need assistance navigating the site? Ask about specific sections or features you'd like to explore."
  ],
  commands: [
    "Try these commands: /projects, /skills, /contact, /help, /clear, /theme, /demo"
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase or try a command like /help?",
    "I don't have information on that yet. Try asking about my projects or skills instead.",
    "That's beyond my current knowledge base. Feel free to ask about something else or use /help for suggestions."
  ]
};

// Terminal commands that the chat supports
const commands = {
  '/help': 'Show available commands',
  '/projects': 'List my projects',
  '/skills': 'Show my technical skills',
  '/contact': 'How to contact me',
  '/clear': 'Clear chat history',
  '/theme': 'Toggle dark/light theme',
  '/demo': 'Show a quick demo of my work'
};

// Function to process commands
const processCommand = (cmd: string): ChatMessage => {
  const command = cmd.toLowerCase().trim();
  
  let response: string;
  let type: 'command' | 'response' | 'error' = 'response';
  
  switch (command) {
    case '/help':
      response = "Available commands:\n" + Object.entries(commands)
        .map(([cmd, desc]) => `${cmd} - ${desc}`)
        .join("\n");
      break;
    case '/projects':
      response = "🚀 Projects:\n\n1. Neural Vision System - Computer vision platform with real-time object detection\n2. DataSphere Explorer - 3D data visualization platform\n3. Autonomous Agent Framework - Multi-agent system for decision making";
      break;
    case '/skills':
      response = "💻 Skills:\n\n• AI/ML: TensorFlow, PyTorch, Computer Vision, NLP\n• Languages: Python, C++, JavaScript, TypeScript\n• Web: React, Three.js, Next.js, Node.js\n• Other: Databases, Cloud platforms, DevOps";
      break;
    case '/contact':
      response = "📬 Contact:\n\nEmail: diwanshu.yadav@example.com\nLinkedIn: /in/diwanshuyadav\nUse the contact form for project inquiries";
      break;
    case '/clear':
      response = "Chat history cleared.";
      type = 'command';
      break;
    case '/theme':
      response = "Theme toggled. The website will switch between dark and light mode.";
      type = 'command';
      break;
    case '/demo':
      response = "Demo mode activated. Try moving your mouse over the particle system in the hero section for an interactive experience.";
      break;
    default:
      response = "Command not recognized. Type /help to see available commands.";
      type = 'error';
  }
  
  return {
    sender: 'ai',
    text: response,
    timestamp: Date.now(),
    type
  };
};

// Function to generate AI responses based on user input
const generateResponse = (input: string): ChatMessage => {
  // Check if it's a command
  if (input.startsWith('/')) {
    return processCommand(input);
  }
  
  // Process regular message
  const lowerInput = input.toLowerCase();
  let responseText: string;
  let responseType: 'text' | 'suggestion' = 'text';
  
  // Simple keyword matching
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    responseText = aiKnowledge.greetings[Math.floor(Math.random() * aiKnowledge.greetings.length)];
  } 
  else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
    responseText = aiKnowledge.projects[Math.floor(Math.random() * aiKnowledge.projects.length)];
  }
  else if (lowerInput.includes('skill') || lowerInput.includes('know') || lowerInput.includes('do')) {
    responseText = aiKnowledge.skills[Math.floor(Math.random() * aiKnowledge.skills.length)];
  }
  else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
    responseText = aiKnowledge.contact[Math.floor(Math.random() * aiKnowledge.contact.length)];
  }
  else if (lowerInput.includes('help') || lowerInput.includes('command') || lowerInput.includes('what')) {
    responseText = aiKnowledge.help[Math.floor(Math.random() * aiKnowledge.help.length)];
    responseType = 'suggestion';
  }
  else if (lowerInput.length < 5) {
    responseText = "Could you elaborate? Try asking something more specific or use /help to see what I can do.";
    responseType = 'suggestion';
  }
  else {
    responseText = aiKnowledge.fallback[Math.floor(Math.random() * aiKnowledge.fallback.length)];
  }
  
  return {
    sender: 'ai',
    text: responseText,
    timestamp: Date.now(),
    type: responseType
  };
};

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Welcome to DiwanshuOS Assistant! I can help you discover more about my work and skills. Try asking a question or use /help to see available commands.",
      timestamp: Date.now(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Animation for chat widget opening
  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);
  
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
    
    // Get appropriate AI response with variable timing for realism
    const typingTime = 500 + (input.length * 30); // Longer input = longer "typing" time
    
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      
      // Handle special commands
      if (aiResponse.text === "Chat history cleared." && aiResponse.type === 'command') {
        setMessages([{
          sender: 'ai',
          text: "Chat history cleared.",
          timestamp: Date.now(),
          type: 'command'
        }]);
      } else if (aiResponse.text.includes("Theme toggled") && aiResponse.type === 'command') {
        // We'd call a theme toggle function here in a real implementation
        setMessages(prev => [...prev, aiResponse]);
      } else {
        setMessages(prev => [...prev, aiResponse]);
      }
      
      setIsTyping(false);
    }, typingTime);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  // Function to handle suggested commands 
  const handleSuggestionClick = (command: string) => {
    // Add as user message
    const userMessage: ChatMessage = {
      sender: 'user',
      text: command,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Process command 
    setTimeout(() => {
      const aiResponse = processCommand(command);
      
      if (aiResponse.text === "Chat history cleared." && aiResponse.type === 'command') {
        setMessages([{
          sender: 'ai',
          text: "Chat history cleared.",
          timestamp: Date.now(),
          type: 'command'
        }]);
      } else {
        setMessages(prev => [...prev, aiResponse]);
      }
      
      setIsTyping(false);
    }, 700);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <button 
        id="toggle-chat" 
        onClick={onToggle}
        className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-neon-teal flex items-center justify-center shadow-lg hover:bg-opacity-80 transition-colors hover:shadow-glow-teal"
        aria-label="Toggle chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#121212">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Chat widget */}
      <div 
        id="ai-chat-widget" 
        ref={chatContainerRef}
        className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-95'}`}
      >
        <div className="glassmorphic rounded-lg w-72 md:w-96 overflow-hidden border-2 border-neon-teal border-opacity-30">
          <div className="bg-dark-charcoal p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-neon-teal mr-2 animate-pulse"></div>
              <span className="font-space text-neon-teal text-sm">DiwanshuOS Assistant</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={toggleMinimize}
                className="text-white hover:text-neon-teal"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <button 
                onClick={onClose}
                className="text-white hover:text-neon-teal"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div 
            id="chat-messages" 
            className={`overflow-y-auto p-4 space-y-4 bg-charcoal transition-all duration-300 bg-opacity-80 ${isMinimized ? 'h-0' : 'h-96'}`}
          >
            {messages.map((msg, index) => (
              <div key={msg.timestamp + index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-neon-teal flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="font-space font-bold text-charcoal text-xs">DY</span>
                  </div>
                )}
                
                <div 
                  className={`glassmorphic p-3 rounded-lg max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-neon-magenta bg-opacity-20 border border-neon-magenta border-opacity-30' 
                      : msg.type === 'error'
                        ? 'border border-red-500 border-opacity-50'
                        : msg.type === 'command' 
                          ? 'border border-neon-blue border-opacity-50'
                          : msg.type === 'suggestion'
                            ? 'border border-neon-teal border-opacity-50'
                            : ''
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Command suggestions */}
            {messages.length > 0 && 
             messages[messages.length - 1].sender === 'ai' && 
             messages[messages.length - 1].type === 'suggestion' && (
              <div className="flex flex-wrap gap-2 mt-2">
                <button 
                  onClick={() => handleSuggestionClick('/projects')}
                  className="px-2 py-1 text-xs bg-dark-charcoal text-neon-teal rounded-md hover:bg-light-charcoal transition-colors"
                >
                  /projects
                </button>
                <button 
                  onClick={() => handleSuggestionClick('/skills')}
                  className="px-2 py-1 text-xs bg-dark-charcoal text-neon-magenta rounded-md hover:bg-light-charcoal transition-colors"
                >
                  /skills
                </button>
                <button 
                  onClick={() => handleSuggestionClick('/contact')}
                  className="px-2 py-1 text-xs bg-dark-charcoal text-neon-blue rounded-md hover:bg-light-charcoal transition-colors"
                >
                  /contact
                </button>
                <button 
                  onClick={() => handleSuggestionClick('/help')}
                  className="px-2 py-1 text-xs bg-dark-charcoal text-white rounded-md hover:bg-light-charcoal transition-colors"
                >
                  /help
                </button>
              </div>
            )}
            
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
          
          {!isMinimized && (
            <div className="p-3 bg-dark-charcoal border-t border-gray-800">
              <form id="chat-form" className="flex" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  id="chat-input" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something or type /help..." 
                  className="flex-grow p-2 bg-light-charcoal border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-neon-teal"
                />
                <button 
                  type="submit" 
                  className="px-4 bg-neon-teal text-charcoal rounded-r-md hover:bg-opacity-80 transition-colors"
                  disabled={isTyping}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
              
              <div className="mt-2 text-xs text-gray-400">
                Type <span className="kbd">/help</span> to see available commands
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
