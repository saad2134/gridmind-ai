# GridMind AI - Autonomous Decision Engine for Smart Energy Grids

An AI-powered platform that predicts energy demand, optimizes grid decisions, and explains AI reasoning in real time.

## Features

- **Demand Forecasting** - Predicts next-hour energy demand using Random Forest ML model
- **AI Decision Engine** - Recommends optimal grid actions (battery discharge/charge, load reduction)
- **Explainable AI** - Feature importance visualization showing what influences predictions
- **Scenario Simulator** - Interactive controls to simulate different conditions (temperature, solar output, load)

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS, Recharts
- **Backend**: Python, FastAPI, scikit-learn, Random Forest
- **Data**: Synthetic energy dataset (10,000 samples)

## Project Structure

```
smart-energy-grids/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI server
│   │   ├── predict.py       # ML prediction model
│   │   ├── decision_engine.py  # AI decision logic
│   │   └── train_model.py  # Model training
│   ├── data/
│   │   └── energy_data.csv  # Training data
│   └── models/
│       ├── energy_model.pkl
│       ├── scaler.pkl
│       └── features.pkl
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx     # Dashboard
│   │   ├── components/ui/   # UI components
│   │   └── lib/
│   │       ├── api.ts       # API client
│   │       └── utils.ts     # Utilities
│   └── package.json
└── README.md
```

## Setup & Running

### Prerequisites

- Python 3.12+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cd app
python train_model.py      # Train the ML model
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Usage

1. Start the backend server (port 8000)
2. Start the frontend (port 3000)
3. Open http://localhost:3000

The dashboard displays:
- Current energy stats (load, solar, wind)
- Demand forecast chart (next 5 hours)
- AI decision recommendation with reasoning
- Feature importance bar chart
- Scenario simulator with sliders

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Predict energy demand |
| `/decision` | POST | Get AI decision recommendation |
| `/explain` | GET | Get feature importance |
| `/simulate` | POST | Run scenario simulation |
| `/data/sample` | GET | Get sample energy data |
| `/status` | GET | API status |

## Example Request

```json
POST /decision
{
  "hour": 18,
  "day_of_week": 3,
  "temperature": 28,
  "solar_output": 2.5,
  "current_load": 10
}
```

## Example Response

```json
{
  "predicted_demand": 12.7,
  "decision": {
    "action": "battery_discharge",
    "amount": 2.1,
    "unit": "MW",
    "reason": "High demand predicted (12.7 MW). Activate battery storage..."
  }
}
```