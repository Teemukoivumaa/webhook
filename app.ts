import express, { Express } from "express";
import { metrics, trace, ValueType } from "@opentelemetry/api";
import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "/var/log/webhook.log" }), // Log file for Promtail
  ],
  format: winston.format.json(),
});

const meter = metrics.getMeter("webhook");
const counter = meter.createCounter("webhook.counter", {
  description: "Count of received webhook requests",
  unit: "Count",
  valueType: ValueType.INT,
});

const tracer = trace.getTracer("webhook-service");

const app: Express = express();
const port = 3001;

// Middleware to parse JSON body
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.status(200).send("Hello, World!");
});

// Handle incoming webhook requests
app.post("/webhook", (req: any, res: any) => {
  const span = tracer.startSpan("webhook_received");

  console.log("Webhook received:", req?.body ?? "");

  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: req.ip || req.socket.remoteAddress,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    queryParams: req.query,
    body: req.body,
  };

  logger.info(logEntry);

  // Increment received webhooks
  counter.add(1, {
    method: req.method,
    endpoint: req.originalUrl,
    status: res.statusCode,
  });

  // Add request details as attributes (structured key-value pairs)
  span.setAttributes({
    "http.method": req.method,
    "http.url": req.originalUrl,
    "http.client_ip": req.ip || req.socket.remoteAddress,
    "http.headers": JSON.stringify(req.headers), // Be careful with sensitive data!
    "http.query_params": JSON.stringify(req.query),
    "http.body": JSON.stringify(req.body),
    "event.timestamp": new Date().toISOString(),
  });

  console.log("Responding to sender");

  // End the span after processing the request
  span.end();
  res.status(200).send("Webhook received");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
