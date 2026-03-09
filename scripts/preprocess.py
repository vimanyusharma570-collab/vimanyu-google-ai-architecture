import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import os

def preprocess_dataset(input_path, output_dir):
    """
    Preprocesses the raw CSV dataset for AI model training.
    - Loads data
    - Normalizes features
    - Splits into train/test sets
    - Saves processed files
    """
    print(f"Loading dataset from {input_path}...")
    df = pd.read_csv(input_path)
    
    # Feature selection (excluding id and timestamp for model input)
    features = ['feature_a', 'feature_b']
    X = df[features].values
    y = df['label'].values
    
    # Normalization
    print("Normalizing features...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Train/Test Split
    print("Splitting data into train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    
    # Ensure output directory exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    # Save processed data
    print(f"Saving processed data to {output_dir}...")
    np.save(os.path.join(output_dir, 'X_train.npy'), X_train)
    np.save(os.path.join(output_dir, 'X_test.npy'), X_test)
    np.save(os.path.join(output_dir, 'y_train.npy'), y_train)
    np.save(os.path.join(output_dir, 'y_test.npy'), y_test)
    
    print("Preprocessing complete!")

if __name__ == "__main__":
    # Default paths for the PBA-1 project structure
    RAW_DATA_PATH = 'data/sample_dataset.csv'
    PROCESSED_DATA_DIR = 'data/processed'
    
    if os.path.exists(RAW_DATA_PATH):
        preprocess_dataset(RAW_DATA_PATH, PROCESSED_DATA_DIR)
    else:
        print(f"Error: Raw dataset not found at {RAW_DATA_PATH}")
