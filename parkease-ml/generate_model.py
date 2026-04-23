import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib

# Synthetic Data For Dynamic Pricing
# Let's say we have 1000 data points of previous parking prices based on some factors.
np.random.seed(42)

# Features:
# latitude, longitude: roughly in some urban area
lats = np.random.uniform(40.6, 40.9, 1000)
lons = np.random.uniform(-74.1, -73.8, 1000)

# time of day (0-24)
hours = np.random.uniform(0, 24, 1000)

# day of week (0 to 6, where 5 and 6 represent weekend = higher demand)
days = np.random.randint(0, 7, 1000)

# event_multiplier (random spikes representing events near location)
events = np.random.choice([1.0, 1.2, 1.5, 2.0], 1000, p=[0.7, 0.15, 0.1, 0.05])

# Calculate "Base Price"
base_prices = 5.0 + (hours * 0.1) # base rate plus hour correlation
weekend_bump = np.where(days >= 5, 3.0, 0.0) # extra $3 on weekends
location_bump = (lats - 40.6) * 10 + (lons + 74.1) * 10 # dummy spatial correlation

# Target: Price Per Hour
prices = (base_prices + weekend_bump + location_bump) * events + np.random.normal(0, 1.0, 1000)
prices = np.clip(prices, 2.0, 50.0) # bound prices

X = pd.DataFrame({'lat': lats, 'lon': lons, 'hour': hours, 'day': days, 'event_multiplier': events})
y = prices

model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
model.fit(X, y)

joblib.dump(model, 'pricing_model.pkl')
print("Model saved as pricing_model.pkl")
