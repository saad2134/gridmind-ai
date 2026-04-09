from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

try:
    from .predict import predict_demand, get_feature_importance, load_model
    from .decision_engine import get_decision, simulate_scenario
except ImportError:
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
        },
        "power_sources": {
            "solar": {"name": "Solar", "capacity": 5.0, "current_output": 2.4, "unit": "MW", "type": "renewable", "color": "#F59E0B"},
            "wind": {"name": "Wind", "capacity": 4.0, "current_output": 1.8, "unit": "MW", "type": "renewable", "color": "#3B82F6"},
            "hydro": {"name": "Hydro", "capacity": 8.0, "current_output": 5.2, "unit": "MW", "type": "renewable", "color": "#06B6D4"},
            "nuclear": {"name": "Nuclear", "capacity": 12.0, "current_output": 10.5, "unit": "MW", "type": "non_renewable", "color": "#8B5CF6"},
            "coal": {"name": "Coal", "capacity": 6.0, "current_output": 3.8, "unit": "MW", "type": "non_renewable", "color": "#374151"},
            "gas": {"name": "Natural Gas", "capacity": 4.0, "current_output": 2.1, "unit": "MW", "type": "non_renewable", "color": "#EF4444"}
        },
        "grid_stats": {
            "total_demand": 25.8,
            "total_supply": 26.0,
            "renewable_percentage": 36.5,
            "grid_frequency": 60.0,
            "grid_voltage": 230.0
        }
    }

@app.get("/data/power-sources")
def get_power_sources():
    return {
        "power_sources": {
            "solar": {"name": "Solar", "capacity": 5.0, "current_output": 2.4, "unit": "MW", "type": "renewable", "color": "#F59E0B"},
            "wind": {"name": "Wind", "capacity": 4.0, "current_output": 1.8, "unit": "MW", "type": "renewable", "color": "#3B82F6"},
            "hydro": {"name": "Hydro", "capacity": 8.0, "current_output": 5.2, "unit": "MW", "type": "renewable", "color": "#06B6D4"},
            "nuclear": {"name": "Nuclear", "capacity": 12.0, "current_output": 10.5, "unit": "MW", "type": "non_renewable", "color": "#8B5CF6"},
            "coal": {"name": "Coal", "capacity": 6.0, "current_output": 3.8, "unit": "MW", "type": "non_renewable", "color": "#374151"},
            "gas": {"name": "Natural Gas", "capacity": 4.0, "current_output": 2.1, "unit": "MW", "type": "non_renewable", "color": "#EF4444"}
        },
        "summary": {
            "total_renewable_capacity": 17.0,
            "total_non_renewable_capacity": 22.0,
            "total_capacity": 39.0,
            "current_renewable_output": 9.4,
            "current_non_renewable_output": 16.4,
            "current_total_output": 25.8,
            "renewable_percentage": 36.5
        }
    }

@app.get("/data/executive")
def get_executive_data():
    return {
        "kpis": {
            "total_demand": 25.8,
            "operational_cost": 1250,
            "grid_efficiency": 94,
            "consumers_served": 125000
        },
        "demand_trend": [
            {"month": "Jan", "forecast": 22.5, "actual": 23.1},
            {"month": "Feb", "forecast": 21.8, "actual": 22.4},
            {"month": "Mar", "forecast": 23.2, "actual": 24.1},
            {"month": "Apr", "forecast": 24.5, "actual": 25.2},
            {"month": "May", "forecast": 26.1, "actual": 27.0},
            {"month": "Jun", "forecast": 28.3, "actual": 29.1}
        ],
        "renewable_trend": [
            {"month": "Jan", "solar": 1.8, "wind": 2.1},
            {"month": "Feb", "solar": 2.0, "wind": 1.9},
            {"month": "Mar", "solar": 2.3, "wind": 2.2},
            {"month": "Apr", "solar": 2.5, "wind": 2.0},
            {"month": "May", "solar": 2.8, "wind": 1.8},
            {"month": "Jun", "solar": 3.0, "wind": 1.7}
        ],
        "cost_breakdown": [
            {"category": "Generation", "amount": 450, "percentage": 36},
            {"category": "Transmission", "amount": 280, "percentage": 22},
            {"category": "Distribution", "amount": 320, "percentage": 26},
            {"category": "Operations", "amount": 200, "percentage": 16}
        ]
    }

@app.get("/data/operator")
def get_operator_data():
    return {
        "demand_forecast": [
            {"hour": 18, "demand": 11.2},
            {"hour": 19, "demand": 12.5},
            {"hour": 20, "demand": 13.1},
            {"hour": 21, "demand": 12.8},
            {"hour": 22, "demand": 11.5}
        ],
        "grid_status": {
            "frequency": 60.0,
            "voltage": 230.0,
            "battery_level": 85,
            "ai_status": "online"
        },
        "recent_decisions": [
            {"action": "battery_discharge", "timestamp": datetime.now().isoformat(), "result": "success"},
            {"action": "reduce_load", "timestamp": datetime.now().isoformat(), "result": "success"}
        ]
    }

@app.get("/data/consumer")
def get_consumer_data():
    return {
        "current_usage": {"power": 1.2, "cost": 0.15},
        "monthly_cost": {"total": 142, "kwh": 485},
        "savings": {"amount": 28, "percentage": 16},
        "green_energy": {"percentage": 42, "solar": 32, "wind": 10},
        "daily_usage": [
            {"day": "Mon", "usage": 12.5},
            {"day": "Tue", "usage": 11.8},
            {"day": "Wed", "usage": 13.2},
            {"day": "Thu", "usage": 12.1},
            {"day": "Fri", "usage": 11.5},
            {"day": "Sat", "usage": 14.2},
            {"day": "Sun", "usage": 13.8}
        ],
        "appliance_breakdown": [
            {"appliance": "HVAC", "usage": 35},
            {"appliance": "Lighting", "usage": 20},
            {"appliance": "Appliances", "usage": 25},
            {"appliance": "Electronics", "usage": 15},
            {"appliance": "Other", "usage": 5}
        ],
        "peak_hours": [
            {"time": "6 PM - 9 PM", "usage": 4.2},
            {"time": "7 AM - 9 AM", "usage": 3.1},
            {"time": "12 PM - 2 PM", "usage": 2.3}
        ],
        "billing": {"current_balance": 142, "due_date": "2026-04-25"}
    }

@app.get("/data/regulator")
def get_regulator_data():
    return {
        "compliance": {"score": 96, "status": "compliant"},
        "reliability": {"uptime": 99.8},
        "safety": {
            "incidents": 0,
            "score": 98,
            "days_without_incident": 156,
            "inspections_passed": 12,
            "inspections_total": 12
        },
        "reports": {"due": 2},
        "compliance_trend": [
            {"month": "Jan", "score": 94},
            {"month": "Feb", "score": 95},
            {"month": "Mar", "score": 94},
            {"month": "Apr", "score": 96}
        ],
        "reliability_metrics": [
            {"name": "SAIDI", "value": "2.4 min", "target": "< 5 min", "status": "good"},
            {"name": "SAIFI", "value": "0.8", "target": "< 1.0", "status": "good"},
            {"name": "CAIDI", "value": "3.0 min", "target": "< 5 min", "status": "good"},
            {"name": "ASAI", "value": "99.95%", "target": "> 99.9%", "status": "good"}
        ],
        "compliance_standards": [
            {"name": "Safety Standards", "compliant": True},
            {"name": "Environmental", "compliant": True},
            {"name": "Grid Reliability", "compliant": True},
            {"name": "Data Privacy", "compliant": True},
            {"name": "Reporting", "compliant": True}
        ],
        "alerts": [
            {"title": "Q1 Compliance Report Due", "time": "5 days", "severity": "medium"},
            {"title": "All safety checks passed", "time": "2 hours", "severity": "low"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)