interface Project {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
}

export const projectData: Record<string, Project> = {
  "1": {
    title: "Neural Vision System",
    shortDescription: "Computer vision platform for real-time object detection and tracking",
    description: "A state-of-the-art computer vision platform enabling real-time object detection, tracking, and analysis. The system utilizes deep learning neural networks to process visual information with unprecedented accuracy.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
    technologies: ["Python", "TensorFlow", "OpenCV", "CUDA", "Docker"],
    features: [
      "Real-time processing at 60fps", 
      "Multi-object tracking", 
      "Custom neural network architecture", 
      "Edge device compatibility", 
      "Cloud integration for data storage"
    ]
  },
  "2": {
    title: "DataSphere Explorer",
    shortDescription: "3D interactive data visualization platform with real-time analysis",
    description: "An immersive 3D data visualization platform that transforms complex datasets into navigable virtual environments. Users can explore relationships, patterns, and anomalies in their data through intuitive spatial interfaces.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
    technologies: ["JavaScript", "Three.js", "D3.js", "WebGL", "React"],
    features: [
      "Interactive 3D visualizations", 
      "Real-time data streaming", 
      "Customizable visualization templates", 
      "VR/AR compatibility", 
      "Data filtering and search"
    ]
  },
  "3": {
    title: "Autonomous Agent Framework",
    shortDescription: "Multi-agent system for automated decision making and task orchestration",
    description: "A sophisticated multi-agent system for automated decision making and task orchestration. This framework enables the development of collaborative AI agents that can solve complex problems through emergent intelligence.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1650&q=80",
    technologies: ["C++", "Rust", "Reinforcement Learning", "Distributed Systems", "Message Passing Interface"],
    features: [
      "Decentralized agent architecture", 
      "Self-healing network topology", 
      "Adaptive learning algorithms", 
      "Real-time constraint satisfaction", 
      "Hierarchical planning systems"
    ]
  }
};
