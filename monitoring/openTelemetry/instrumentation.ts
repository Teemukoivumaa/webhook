/*instrumentation.ts*/
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-node";
import {
  AggregationTemporality,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";

const traceExporter = new OTLPTraceExporter();
const spanProcessor = new BatchSpanProcessor(traceExporter);

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "webhook-app",
    [ATTR_SERVICE_VERSION]: "1.0",
  }),

  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      temporalityPreference: AggregationTemporality.DELTA,
    }),
  }),

  spanProcessor,
  traceExporter,
});

sdk.start();
