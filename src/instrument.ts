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
import { environment } from './environments/environment.development';
import { propagation } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { v4 as uuidv4 } from 'uuid';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
propagation.setGlobalPropagator(new W3CTraceContextPropagator());

const defaultConfig = {
  serviceName: 'angular-app',
  collectorUrl: 'https://localhost:21060/v1/traces',
  corsUrls: [new RegExp("h.*")],
};

const provider = new WebTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: defaultConfig.serviceName,
    'session.id': uuidv4(),
  }),
  spanProcessors: [new SimpleSpanProcessor(new OTLPTraceExporter({
    url: defaultConfig.collectorUrl, // OTLP endpoint
    headers: {
      // mettre dans les envs
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
        ignoreUrls: ['https://localhost:21060/v1/traces'],
      }),
    ],
  });

