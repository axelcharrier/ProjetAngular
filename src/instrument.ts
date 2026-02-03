import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
import {
    WebTracerProvider,
    BatchSpanProcessor,
    SimpleSpanProcessor,
    ConsoleSpanExporter,
    
  } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';

const provider = new WebTracerProvider({
  resource: resourceFromAttributes({
    'service.name': 'FrontEnd',
  }),
  spanProcessors: [
    new SimpleSpanProcessor(new ConsoleSpanExporter()),
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: 'https://localhost:21060/v1/traces',
        headers: {
          // a mettre dans les env
          'x-otlp-api-key': 'da3238b19de17fb3589f85eeb20f8fb8',
        },
      }),
    ),
  ],
});

provider.register();

registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
            // not needed to add the following, but it better shows the intention
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {},
            '@opentelemetry/instrumentation-xml-http-request': {},
        }),
    ],
});