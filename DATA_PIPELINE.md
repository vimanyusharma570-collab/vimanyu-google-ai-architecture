# PBA-1 Data Pipeline Documentation

This document describes the end-to-end data pipeline for the PBA-1 project, from raw data collection to model-ready features.

## 1. Data Collection
- **Source**: Raw CSV files uploaded via the dashboard or ingested from external sources.
- **Format**: Standardized CSV with `id`, `timestamp`, `feature_a`, `feature_b`, and `label`.
- **Storage**: Raw files are stored in the `/data` directory and metadata is persisted in SQLite.

## 2. Ingestion & Storage (BigQuery)
- **Trigger**: Cloud Functions are triggered upon file upload.
- **Action**: Data is streamed into BigQuery for long-term storage and large-scale analytics.
- **Versioning**: Each upload is assigned a version ID for reproducibility.

## 3. Preprocessing (MLOps)
- **Script**: `/scripts/preprocess.py`
- **Operations**:
    - **Cleaning**: Removal of null values and outliers.
    - **Normalization**: Standard scaling of features `feature_a` and `feature_b`.
    - **Splitting**: 80/20 split for training and testing sets.
- **Output**: Processed `.npy` files stored in `/data/processed/` for high-performance loading during training.

## 4. Feature Engineering
- **Temporal Features**: Extraction of hour, day of week, and lag features from the `timestamp` field (handled in the LSTM module).
- **Attention-based Features**: Self-attention representations learned by the Transformer module.

## 5. Model Training & Evaluation
- **Input**: Processed training data from `/data/processed/`.
- **Validation**: Cross-validation performed during the training loop.
- **Metrics**: Accuracy, F1-score, and Reconstruction Error (for anomaly detection).

## 6. Inference & Feedback
- **Serving**: Models deployed to Vertex AI Endpoints.
- **Monitoring**: AIOps pipeline monitors prediction latency and drift.
- **Feedback**: Agents collect action outcomes to refine future preprocessing and training cycles.
