/* document-load.ts|js file - the code snippet is the same for both the languages */
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { environment } from '../app/environments/environment.development';
import { propagation } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { v4 as uuidv4 } from 'uuid';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
propagation.setGlobalPropagator(new W3CTraceContextPropagator());

// For more informations about telemetry configuration, see the README file

// Default configuration - can be extended to accept dynamic values
const defaultConfig = {
  serviceName: 'angular-app',
  collectorUrl: environment.OTLPEndpoint,
  corsUrls: [new RegExp("h.*")],
};

// Initializing the OpenTelemetry Web Tracer Provider
const provider = new WebTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: defaultConfig.serviceName,
    'session.id': uuidv4(),
  }),
  spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
    url: defaultConfig.collectorUrl, // OTLP endpoint
    headers: {
      'x-otlp-api-key': environment.TraceApiKey,
    },
  }
  ))],
});

provider.register({
  // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
  contextManager: new ZoneContextManager(),
});

// Registering instrumentations
registerInstrumentations({
  instrumentations: [
  new UserInteractionInstrumentation(
    {
      eventNames: ['click', 'dblclick', 'mousedown', 'mouseup', 'keydown', 'keyup', 'touchstart', 'touchend'],
    }
    ),
    new XMLHttpRequestInstrumentation(),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: defaultConfig.corsUrls || [new RegExp("h.*")],
      clearTimingResources: false,
      ignoreUrls: [environment.OTLPEndpoint],
    }),
  ],
});