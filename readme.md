# Webhook Service

This is a simple webhook service built with Node.js and Express. It listens for incoming HTTP POST requests and logs the received data.

The service is integrated with OpenTelemetry for tracing and metrics. Everything is forwarded to Grafana for monitoring and visualization.

## Features

- Accepts and logs incoming webhook requests.
- Uses Grafana for monitoring.
- Uses OpenTelemetry to trace requests and generate metrics.
- Sends logs to Grafana Loki.
- Supports Docker for easy deployment.

## Requirements

- Node.js (>=16)
- Yarn (Package Manager)
- Docker & Docker Compose

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Teemukoivumaa/webhook
cd webhook-service
```

### 2. Start with Docker Compose

```sh
docker-compose up -d --build
```

### 3. Run webhookGenerator.sh to generate mock data

```sh
./webhookGenerator.sh
```

### 4. Visit Grafana to see that the metrics are coming thru

By default, the Grafana runs on [http://localhost:3000](http://localhost:3000) and uses the following login information:

- Username: **admin**
- Password: **grafana**

By default, the Webhook service runs on [http://localhost:3001](http://localhost:3001)

## API Endpoints

### **Check that service is running**

```http
GET /
```

**Response**:

```txt
"Webhook received"
```

**Example Curl**:

```sh
curl --request GET --url http://localhost:3001/
```

### **Receive Webhook**

```http
POST /webhook
```

**Request Body (JSON)**:

```json
{
  "text": "Hello"
}
```

**Response**:

```txt
"Webhook received"
```

**Example Curl**:

```sh
curl --request POST --url http://localhost:3001/webhook \
  --data '{
    "text": "Hello",
    "type": "Testing"
}'
```

## Logging & Monitoring

- **OpenTelemetry**: Generate traces and metrics.
- **Promtail**: Forwards logs to Loki from the webhook service.
- **Grafana Loki**: Stores logs from webhook requests and forwards them to Grafana.
- **Prometheus**: Collects metrics from OpenTelemetry and forwards them to Grafana.
- **Tempo**: Collects traces from OpenTelemetry and forwards them to Grafana.

## Development

### Running Locally

Required environment variables:

- OTEL_EXPORTER_OTLP_ENDPOINT=<http://otel-collector:4317> # Address where to send metrics & traces

#### Run without monitoring enabled

```sh
yarn start
```

#### Run with monitoring enabled

```sh
yarn start:analytics
```

## Meta

Made by Teemu Koivumaa

Distributed under the MIT license. See `LICENSE` for more information.

[My GitHub page](https://github.com/Teemukoivumaa)

[My LinkedIn page](https://www.linkedin.com/in/teemukoivumaa)
