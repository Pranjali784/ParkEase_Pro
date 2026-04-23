FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Generate a synthetic model at build time for simplicity
RUN python generate_model.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
