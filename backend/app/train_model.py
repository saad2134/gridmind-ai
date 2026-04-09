import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import os

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def generate_synthetic_data(n_samples: int = 10000) -> pd.DataFrame:
    np.random.seed(42)
    
    hours = np.random.randint(0, 24, n_samples)
    days = np.random.randint(0, 7, n_samples)
    temperatures = np.random.uniform(15, 40, n_samples)
    solar_outputs = np.random.uniform(0, 5, n_samples)
    base_load = 8 + 2 * np.sin((hours - 6) * np.pi / 12)
    
    seasonal_factor = 1 + 0.3 * np.sin((days - 1) * np.pi / 3.5)
    temp_factor = 0.05 * (temperatures - 25) ** 2
    solar_factor = -0.3 * solar_outputs
    
    loads = base_load * seasonal_factor + temp_factor + solar_factor + np.random.normal(0, 1, n_samples)
    loads = np.clip(loads, 3, 20)
    
    df = pd.DataFrame({
        'hour': hours,
        'day_of_week': days,
        'temperature': temperatures,
        'solar_output': solar_outputs,
        'current_load': loads,
        'next_hour_load': loads * (1 + np.random.uniform(-0.1, 0.1, n_samples))
    })
    
    return df

def train_model(data: pd.DataFrame) -> tuple:
    features = ['hour', 'day_of_week', 'temperature', 'solar_output', 'current_load']
    target = 'next_hour_load'
    
    X = data[features]
    y = data[target]
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_scaled, y)
    
    return model, scaler, features

def save_model(model, scaler, features):
    import os
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_dir = os.path.join(base_dir, 'models')
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(model, os.path.join(model_dir, 'energy_model.pkl'))
    joblib.dump(scaler, os.path.join(model_dir, 'scaler.pkl'))
    joblib.dump(features, os.path.join(model_dir, 'features.pkl'))

if __name__ == '__main__':
    print('Generating synthetic data...')
    data = generate_synthetic_data()
    data.to_csv(os.path.join(base_dir, 'data', 'energy_data.csv'), index=False)
    print(f'Generated {len(data)} samples')
    
    print('Training model...')
    model, scaler, features = train_model(data)
    save_model(model, scaler, features)
    print('Model trained and saved!')