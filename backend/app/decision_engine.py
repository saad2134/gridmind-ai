from typing import Dict

def get_decision(predicted_demand: float, solar_output: float, temperature: float, hour: int) -> Dict:
    threshold_high = 14
    threshold_low = 8
    solar_threshold = 3
    
    if predicted_demand > threshold_high:
        action = "battery_discharge"
        amount = round((predicted_demand - threshold_high) * 0.8, 1)
        reason = f"High demand predicted ({predicted_demand} MW). Activate battery storage to reduce grid load."
    elif predicted_demand < threshold_low:
        action = "charge_storage"
        amount = round((threshold_low - predicted_demand) * 0.5, 1)
        reason = f"Low demand predicted ({predicted_demand} MW). Charge battery storage with excess energy."
    elif solar_output > solar_threshold and hour < 18:
        action = "charge_storage"
        amount = round(solar_output * 0.3, 1)
        reason = f"High solar output ({solar_output} MW). Store excess renewable energy."
    else:
        action = "maintain"
        amount = 0
        reason = "Grid conditions normal. Maintain current operational state."
    
    if hour >= 17 and hour <= 21:
        action = "reduce_noncritical_load"
        amount = round(predicted_demand * 0.15, 1)
        reason = f"Peak evening hours ({hour}:00). Reduce non-critical loads to manage demand."
    
    return {
        "action": action,
        "amount": amount,
        "unit": "MW",
        "reason": reason
    }

def simulate_scenario(scenario: Dict) -> Dict:
    temp = scenario.get('temperature', 25)
    solar = scenario.get('solar_output', 2)
    load = scenario.get('current_load', 10)
    hour = scenario.get('hour', 12)
    day = scenario.get('day_of_week', 0)
    
    from predict import predict_demand
    predicted = predict_demand({
        'hour': hour,
        'day_of_week': day,
        'temperature': temp,
        'solar_output': solar,
        'current_load': load
    })
    
    decision = get_decision(predicted, solar, temp, hour)
    
    return {
        "predicted_demand": predicted,
        "decision": decision,
        "scenario": scenario
    }