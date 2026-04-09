from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

from predict import predict_demand, get_feature_importance, load_model
from decision_engine import get_decision, simulate_scenario

app = FastAPI(title="GridMind AI API", description="AI Decision Intelligence for Smart Energy Networks")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    hour: int = 12
    day_of_week: int = 0
    temperature: float = 25.0
    solar_output: float = 2.0
    current_load: float = 10.0

class SimulationInput(BaseModel):
    temperature: float = 30.0
    solar_output: float = 1.5
    current_load: float = 12.0
    hour: int = 18
    day_of_week: int = 3

@app.on_event("startup")
async def startup_event():
    load_model()

@app.get("/")
def root():
    return {
        "name": "GridMind AI API",
        "version": "1.0.0",
        "description": "AI Decision Intelligence for Smart Energy Networks",
        "endpoints": ["/predict", "/decision", "/explain", "/simulate", "/status"]
    }

@app.get("/status")
def status():
    return {
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "service": "GridMind AI"
    }

@app.post("/predict")
def predict(input_data: PredictionInput):
    result = predict_demand(input_data.dict())
    return {
        "predicted_demand": result,
        "unit": "MW",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/decision")
def decision(input_data: PredictionInput):
    pred = predict_demand(input_data.dict())
    decision = get_decision(pred, input_data.solar_output, input_data.temperature, input_data.hour)
    return {
        "predicted_demand": pred,
        "decision": decision,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/explain")
def explain() -> Dict:
    importance = get_feature_importance()
    total = sum(importance.values())
    percentages = {k: round(v / total * 100, 1) for k, v in importance.items()}
    
    explanations = {
        "temperature": "Temperature affects energy demand through heating/cooling needs.",
        "hour": "Time of day determines typical consumption patterns.",
        "solar_output": "Solar generation offsets grid demand.",
        "current_load": "Current load indicates immediate demand state.",
        "day_of_week": "Weekend vs weekday patterns differ significantly."
    }
    
    return {
        "feature_importance": percentages,
        "explanations": {k: explanations.get(k, "") for k in importance.keys()},
        "timestamp": datetime.now().isoformat()
    }

@app.post("/simulate")
def simulate(input_data: SimulationInput):
    scenario = input_data.dict()
    result = simulate_scenario(scenario)
    return result

@app.get("/data/sample")
def get_sample_data():
    return {
        "current": {
            "temperature": 28,
            "hour": 18,
            "solar_output": 2.4,
            "current_load": 9.5,
            "day_of_week": 3
        },
        "predictions": [
            {"hour": 18, "demand": 11.2},
            {"hour": 19, "demand": 12.5},
            {"hour": 20, "demand": 13.1},
            {"hour": 21, "demand": 12.8},
            {"hour": 22, "demand": 11.5}
        ],
        "renewable": {
            "solar": 2.4,
            "wind": 1.8
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)