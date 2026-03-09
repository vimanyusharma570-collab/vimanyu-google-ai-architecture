# PBA-1 Project Architect

A collaborative AI system architecture project designed for high-performance model development and deployment.

## Project Overview
PBA-1 is a modular architecture designed to handle complex AI tasks by dividing responsibilities among four specialized roles. This project integrates a robust Express/SQLite backend with advanced deep learning models including Transformers and LSTMs.

## Project Objectives
- **Scalability**: Provide a modular framework where backend and ML components can scale independently.
- **Collaboration**: Clearly define roles and responsibilities for Backend, Deep Learning, LSTM, and Transformer specialists.
- **Data Integrity**: Standardize data handling with CSV-based datasets and automated preprocessing.
- **Performance**: Optimize attention mechanisms and sequential data processing for state-of-the-art results.

## Architecture Layers
For a detailed breakdown of our multi-layered design, see [ARCHITECTURE.md](./ARCHITECTURE.md) and our [DATA_PIPELINE.md](./DATA_PIPELINE.md).

- **AI Layer**: Transformer and LSTM model implementations integrated with **Vertex AI**, **Agentic AI** workflows, and an automated **MLOps** pipeline.
- **Data Layer**: SQLite persistence and **BigQuery** for large-scale analytics.
- **API Layer**: Express.js RESTful communication and **Cloud Functions** for serverless tasks and **AIOps** monitoring.
- **DevOps Layer**: **CI/CD** pipeline with **Docker**, **Kubernetes (GKE)**, and **Terraform** for automated deployment.

## Architecture Roles

### 1. Backend (System Infrastructure)
- **Tech Stack**: Node.js, Express, SQLite, TypeScript, Google Cloud Functions, BigQuery.
- **Focus**: API Layer, data persistence, and serverless automation.

### 2. Training & Testing (DL & Transformer)
- **Tech Stack**: Python, PyTorch, HuggingFace, Vertex AI.
- **Focus**: Core training loops, model deployment, and Vertex AI orchestration.

### 3. LSTM (Sequential Data)
- **Tech Stack**: Keras, TensorFlow, NumPy.
- **Focus**: Time-series analysis and long-term dependency handling.

### 4. Transformer (Attention Architect)
- **Tech Stack**: Transformers, JAX, CUDA.
- **Focus**: Multi-head attention optimization and parallel processing.

## Getting Started
1. **Explore the Dashboard**: Use the web interface to view detailed role responsibilities.
2. **Export Dataset**: Use the "Export Dataset (CSV)" button to generate sample data for training.
3. **AI Studio Integration**: Copy the provided prompt to continue development of specific modules within Google AI Studio.

## Dataset Structure
The project uses a standardized CSV format. A sample dataset is provided in `/data/sample_dataset.csv`.
- `id`: Unique identifier
- `timestamp`: Record creation time
- `feature_a`: Normalized feature value
- `feature_b`: Normalized feature value
- `label`: Binary classification target
