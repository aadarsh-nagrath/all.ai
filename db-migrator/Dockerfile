FROM python:3.9-slim-buster

WORKDIR /app

COPY db-migrator/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY db-migrator/models.py .
COPY db-migrator/agents_data.py .
COPY db-migrator/initial_data.py .
COPY db-migrator/db_migrations/ ./db_migrations/

CMD ["python", "initial_data.py"] 