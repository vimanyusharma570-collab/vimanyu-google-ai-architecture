export type Role = 'Backend' | 'DL & Transformer' | 'LSTM' | 'Transformer';

export interface ArchitectureDetail {
  role: Role;
  title: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
  architecture: string;
}

export const PROJECT_ARCHITECTURE: ArchitectureDetail[] = [
  {
    role: 'Backend',
    title: 'System Infrastructure & API Layer',
    description: 'Responsible for data persistence, authentication, and serving model predictions via RESTful APIs.',
    responsibilities: [
      'Design and implement SQLite database schema using better-sqlite3.',
      'Develop Express.js middleware for request validation and error handling.',
      'Deploy and manage Cloud Functions for event-driven backend tasks.',
      'Integrate BigQuery for large-scale data analytics and reporting.',
      'Implement AIOps monitoring pipeline for real-time system log analysis.',
      'Design and manage DevOps CI/CD pipelines with Docker and Kubernetes.',
      'Create endpoints for dataset upload and CSV export.'
    ],
    techStack: ['Node.js', 'Express', 'SQLite', 'TypeScript', 'Google Cloud Functions', 'BigQuery', 'ELK Stack', 'Docker', 'Kubernetes', 'Terraform'],
    architecture: 'Microservices-ready monolithic core with event-driven hooks for model processing.'
  },
  {
    role: 'DL & Transformer',
    title: 'Training & Testing Pipeline',
    description: 'Focuses on the core deep learning training loops and evaluation metrics for Transformer-based models.',
    responsibilities: [
      'Implement automated MLOps pipelines for data preprocessing and model training.',
      'Leverage Vertex AI for model training, deployment, and monitoring.',
      'Design and implement Agentic AI workflows for automated decision making.',
      'Design cross-validation strategies for model robustness.',
      'Optimize hyperparameters for Transformer architectures.',
      'Generate comprehensive testing reports and confusion matrices.'
    ],
    techStack: ['Python', 'PyTorch', 'HuggingFace', 'Scikit-learn', 'Vertex AI', 'LangChain', 'Kubeflow'],
    architecture: 'Modular training pipeline with automated checkpointing and evaluation hooks.'
  },
  {
    role: 'LSTM',
    title: 'Sequential Data Specialist',
    description: 'Handles long-term dependencies in time-series or sequential data using Long Short-Term Memory networks.',
    responsibilities: [
      'Preprocess sequential data for LSTM input.',
      'Implement multi-layered LSTM architectures.',
      'Handle vanishing gradient problems in long sequences.',
      'Feature engineering for temporal patterns.'
    ],
    techStack: ['Keras', 'TensorFlow', 'NumPy', 'Pandas'],
    architecture: 'Bi-directional LSTM layers with dropout for regularization and sequence-to-sequence mapping.'
  },
  {
    role: 'Transformer',
    title: 'Anomaly Detection Architect',
    description: 'Specializes in self-attention mechanisms for identifying patterns and outliers in complex datasets.',
    responsibilities: [
      'Implement multi-head attention layers for anomaly detection.',
      'Design positional encoding schemes for time-series sequences.',
      'Develop reconstruction-based anomaly scoring algorithms.',
      'Optimize Transformer blocks for real-time inference speed.',
      'Integrate pre-trained models for domain-specific transfer learning.'
    ],
    techStack: ['Transformers', 'JAX', 'CUDA', 'Python', 'PyTorch'],
    architecture: 'Encoder-only Transformer architecture optimized for reconstruction-based anomaly detection.'
  }
];
