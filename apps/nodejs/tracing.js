

'use strict';

const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const otelSDK = new opentelemetry.NodeSDK({
  traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()]
});

// sdk.start()

module.exports = otelSDK

// const { Resource } = require("@opentelemetry/resources");
// const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
// const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
// const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
// const { trace } = require("@opentelemetry/api");
// //instrumentations
// const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify');
// const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
// const { registerInstrumentations } = require("@opentelemetry/instrumentation");

// //Exporter
// module.exports = (serviceName) => {
//   const exporter = new PrometheusExporter({ endpoint: "/metrics" });
//   const provider = new NodeTracerProvider({
//     resource: new Resource({
//       [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
//     }),
//   });
//   provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
//   provider.register();
//   registerInstrumentations({
//     instrumentations: [
//       new HttpInstrumentation(),
//       new FastifyInstrumentation(),
//     ],
//     tracerProvider: provider,
//   });
//   let tracer = trace.getTracer(serviceName);

//   return tracer
// };






// const {
//   CompositePropagator,
//   W3CTraceContextPropagator,
//   W3CBaggagePropagator,
// } = require('@opentelemetry/core');
// // const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
// const { B3InjectEncoding, B3Propagator } = require('@opentelemetry/propagator-b3');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { AsyncLocalStorageContextManager } = require('@opentelemetry/context-async-hooks');
// const process = require('process');
// const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify');
// const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");





// const otelSDK = new NodeSDK({
//   metricExporter: new PrometheusExporter({
//     port: 8081,
//   }),
//   metricInterval: 1000,
//   // spanProcessor: new BatchSpanProcessor(new JaegerExporter()),
//   contextManager: new AsyncLocalStorageContextManager(),
//   textMapPropagator: new CompositePropagator({
//     propagators: [
//       new W3CTraceContextPropagator(),
//       new W3CBaggagePropagator(),
//       new B3Propagator(),
//       new B3Propagator({
//         injectEncoding: B3InjectEncoding.MULTI_HEADER,
//       }),
//     ],
//   }),
//   instrumentations: [
//     new HttpInstrumentation(),
//     new FastifyInstrumentation(),
//   ],
// });

// module.exports = otelSDK

// // You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// // or on some operating system signal.
// process.on('SIGTERM', () => {
//   otelSDK
//     .shutdown()
//     .then(
//       () => console.log('SDK shut down successfully'),
//       err => console.log('Error shutting down SDK', err)
//     )
//     .finally(() => process.exit(0));
// });