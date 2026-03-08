# PBA-1 System Architecture Design

This document outlines the multi-layered architecture of the PBA-1 project, focusing on the integration of AI models, data persistence, and the API communication layer.

## 1. AI Layer (Model Intelligence)
The AI layer is divided into specialized modules to handle different data types and tasks.

### 1.1 Transformer Module (Anomaly Detection)
- **Purpose**: High-performance parallel processing and attention-based feature extraction for identifying outliers in sequential data.
- **Design**: 
  - **Encoder-only Architecture**: Leveraging the encoder stack to learn robust representations of "normal" behavior.
  - **Reconstruction Error**: Anomaly scores are calculated based on the model's ability to reconstruct input sequences.
  - **Self-Attention**: Captures complex dependencies across long time windows to detect subtle pattern shifts.
- **Components**: Multi-head attention, positional encoding, and layer normalization.
- **Optimization**: CUDA-accelerated inference for real-time anomaly scoring.

### 1.2 LSTM Module
- **Purpose**: Handling long-term dependencies in sequential and time-series data.
- **Components**: Bi-directional LSTM layers with dropout for regularization.
- **Data Flow**: Preprocessed sequences are fed into the LSTM to capture temporal patterns.

### 1.3 Deep Learning Pipeline
- **Purpose**: Standardized training and testing loops.
- **Metrics**: Accuracy, F1-score, Confusion Matrix, and Loss curves.

## 2. Data Layer (Persistence & Format)
The data layer ensures consistency and reliability across the system.

### 2.1 Database Schema (SQLite)
- **Engine**: `better-sqlite3` for high-performance synchronous operations.
- **Tables**:
  - `users`: Authentication and role management.
  - `datasets`: Metadata for uploaded CSV files.
  - `predictions`: History of model outputs and confidence scores.

### 2.2 Data Format (CSV)
- **Standard**: RFC 4180 compliant.
- **Fields**: `id`, `timestamp`, `feature_a`, `feature_b`, `label`.
- **Sample Dataset**: A local sample dataset is available at `/data/sample_dataset.csv` for initial model validation and testing.
- **Export**: Automated CSV generation for inter-module data transfer.

## 3. API Layer (Communication & Integration)
The API layer acts as the bridge between the frontend, backend, and AI models.

### 3.1 RESTful Endpoints (Express.js)
- `GET /api/architecture`: Fetch role-based architecture details.
- `POST /api/dataset/upload`: Handle CSV uploads with validation.
- `GET /api/dataset/export`: Trigger CSV generation and download.
- `POST /api/predict`: Proxy request to the AI inference service.

### 3.2 Middleware
- **Validation**: Ensures incoming data matches the expected schema.
- **Error Handling**: Standardized JSON error responses for all layers.
- **CORS**: Configured for secure cross-origin communication between the dashboard and model services.

## 4. Google Cloud Integration (Cloud-Native Intelligence)
The system leverages Google Cloud Platform for scalability and advanced AI capabilities.

### 4.1 Vertex AI
- **Purpose**: Managed machine learning platform for training and deploying models.
- **Integration**: Training pipelines are orchestrated via Vertex AI Pipelines, and models are served through Vertex AI Endpoints for high availability.

### 4.2 BigQuery
- **Purpose**: Serverless, highly scalable data warehouse for analytics.
- **Integration**: Historical prediction data and large-scale datasets are stored in BigQuery for trend analysis and model performance monitoring.

### 4.3 Cloud Functions
- **Purpose**: Event-driven serverless functions.
- **Integration**: Used for asynchronous tasks such as data preprocessing upon CSV upload, sending notifications, and triggering model retraining.

## 5. Agentic AI & AIOps (Autonomous Operations)
The system incorporates autonomous decision-making and self-monitoring capabilities.

### 5.1 Agentic AI Workflow
- **Purpose**: Automated decision-making based on model predictions and system state.
- **Orchestration**: Uses an agentic framework to chain model outputs, validate results, and trigger downstream actions (e.g., automated trading, resource scaling).
- **Feedback Loop**: Agents continuously learn from action outcomes to refine decision logic.

### 5.2 AIOps Monitoring Pipeline
- **Purpose**: Real-time analysis of system logs and performance metrics to ensure reliability.
- **Log Analysis**: Uses the Transformer-based anomaly detection module to identify unusual patterns in system logs.
- **Alerting**: Automated incident response via Cloud Functions when anomalies are detected in the AIOps pipeline.

## 6. MLOps Pipeline (Lifecycle Management)
The system implements a robust MLOps pipeline to automate the end-to-end machine learning lifecycle.

### 6.1 Data Preprocessing Stage
- **Automation**: Triggered by Cloud Functions upon CSV upload to BigQuery.
- **Tasks**: Data cleaning, normalization, feature engineering, and train/test splitting.
- **Versioning**: Datasets are versioned in BigQuery to ensure reproducibility.

### 6.2 Model Training Stage
- **Orchestration**: Vertex AI Pipelines manage the training workflow.
- **Hyperparameter Tuning**: Automated tuning using Vertex AI Vizier.
- **Hardware**: GPU-accelerated training for Transformer and LSTM models.

### 6.3 Evaluation & Validation Stage
- **Metrics**: Automated generation of performance reports (Accuracy, Precision, Recall, F1).
- **Model Registry**: Successful models are stored in the Vertex AI Model Registry with metadata.
- **Deployment**: Automated canary deployment to Vertex AI Endpoints after passing validation gates.

## 7. DevOps CI/CD Pipeline (Infrastructure & Deployment)
The system implements a modern DevOps pipeline for automated building, testing, and deployment.

### 7.1 Containerization (Docker)
- **Purpose**: Ensuring consistent environments across development, testing, and production.
- **Implementation**: Multi-stage Dockerfiles for both the Express backend and Python-based AI services to minimize image size and maximize security.

### 7.2 Orchestration (Kubernetes / GKE)
- **Purpose**: High availability, scalability, and automated management of containerized applications.
- **Implementation**: Deployment manifests and Helm charts for managing services on Google Kubernetes Engine (GKE).
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA) configured based on CPU and memory metrics.

### 7.3 CI/CD Workflow (Cloud Build / GitHub Actions)
- **Continuous Integration**: Automated linting, unit testing, and Docker image building on every push.
- **Continuous Deployment**: Automated deployment to GKE staging and production environments after successful CI and manual approval gates.
- **Infrastructure as Code (IaC)**: Terraform scripts for managing Google Cloud resources (GKE, BigQuery, Cloud Functions).

## 8. System Integration Flow
1. **Frontend**: User interacts with the dashboard to trigger actions.
2. **API Layer**: Receives requests, validates them, and interacts with the Data Layer.
3. **Data Layer**: Persists or retrieves data from SQLite.
4. **AI Layer**: Processes data from the Data Layer and returns predictions via the API Layer.
