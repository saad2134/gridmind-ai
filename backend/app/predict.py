import joblib
import numpy as np
import os
from typing import Dict

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_model = None
_scaler = None
_features = None

def load_model():
    global _model, _scaler, _features
    _model = joblib.load(os.path.join(base_dir, 'models', 'energy_model.pkl'))
    _scaler = joblib.load(os.path.join(base_dir, 'models', 'scaler.pkl'))
    _features = joblib.load(os.path.join(base_dir, 'models', 'features.pkl'))

def get_model():
    global _model, _scaler, _features
    if _model is None:
        load_model()
    return _model, _scaler, _features

def predict_demand(input_data: Dict) -> float:
    model, scaler, _ = get_model()
    
    X = np.array([[
        input_data.get('hour', 12),
        input_data.get('day_of_week', 0),
        input_data.get('temperature', 25),
        input_data.get('solar_output', 0),
        input_data.get('current_load', 10)
    ]])
    
    X_scaled = scaler.transform(X)
    prediction = model.predict(X_scaled)[0]
    return round(prediction, 2)

def get_feature_importance() -> Dict[str, float]:
    model, _, features = get_model()
    
    importance = model.feature_importances_
    result = {features[i]: round(float(importance[i]), 3) for i in range(len(features))}
    return dict(sorted(result.items(), key=lambda x: x[1], reverse=True))