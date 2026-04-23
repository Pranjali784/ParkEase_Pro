from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from datetime import datetime
import pytz

app = FastAPI(title="ParkEase ML Pricing Service")

try:
    model = joblib.load("pricing_model.pkl")
except Exception as e:
    model = None
    print("Warning: Model not found. Fallback logic will be used.", e)

class PricingRequest(BaseModel):
    latitude: float
    longitude: float
    available_from: str = None

class PricingResponse(BaseModel):
    suggested_price_per_hour: float

@app.post("/predict-price", response_model=PricingResponse)
def predict_price(req: PricingRequest):
    # Using current time and day in UTC (or could be local timezone)
    now = datetime.now(tz=pytz.utc)
    hour = now.hour
    day = now.weekday()
    
    if req.available_from:
        try:
            # Parse 'HH:MM:SS' or 'HH:MM', or datetime string
            if 'T' in req.available_from or '-' in req.available_from:
                dt = datetime.fromisoformat(req.available_from.replace('Z', '+00:00'))
                hour = dt.hour
                day = dt.weekday()
            else:
                time_parts = req.available_from.split(':')
                hour = int(time_parts[0])
        except Exception:
            pass

    # We'll randomly assign event_multiplier for simulation purposes, 
    # but in a real system we'd check an event API based on lat/lon
    import random
    event_multiplier = random.choices([1.0, 1.2, 1.5], weights=[0.8, 0.15, 0.05])[0]
    
    if model is not None:
        import pandas as pd
        X = pd.DataFrame([{
            'lat': req.latitude,
            'lon': req.longitude,
            'hour': hour,
            'day': day,
            'event_multiplier': event_multiplier
        }])
        pred = model.predict(X)[0]
        # ensure it's formatted nicely (e.g. 5.50)
        price = round(float(pred), 2)
    else:
        # Fallback rule-based
        base = 5.0
        if day >= 5: # weekend
            base += 3.0
        price = round(base * event_multiplier, 2)
        
    return PricingResponse(suggested_price_per_hour=price)
