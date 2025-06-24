FROM python:3.9-slim-buster

WORKDIR /app

COPY db-migrator/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY db-migrator/models.py .
COPY db-migrator/initial_data.py .

CMD ["python", "initial_data.py"] 