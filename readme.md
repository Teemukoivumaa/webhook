# Webhook app

## Build & run with docker compose

docker compose up --build -d

## Build with docker

docker build -t webhook-app .

## Run with docker

docker run -p 3000:3000 webhook-app
