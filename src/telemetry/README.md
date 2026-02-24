# Télémétrie

## How it work ?

**Opentelemetry** is a tools box that permitted us to claim some telemetry datas on the app (traces, metrics, logs).

> [!infos] Notes
> Here, opentelemetry is used only for request tracking, we didn't metrics options.

### Traces collection and sending 

A trace (Span) is an object that describe an action (a click, a API request, etc.), OpenTelemetry enabled us to create and send traces to our collecting système (here Aspire).

To extract traces, we used `WebtracerProvider`

```typescript
const provider = new WebTracerProvider({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: defaultConfig.serviceName,
    'session.id': uuidv4(),
  }),
  spanProcessors: [
    new SimpleSpanProcessor(
      new OTLPTraceExporter({
        url: 'https://exemple/v1/traces', // OTLP endpoint
        headers: {
          'x-otlp-api-key': '1654exemple6e5f46rze5sfd41c', //Id define by aspire in this case
        },
      }),
    ),
  ],
});
```

In this code we :

- define a **WebTracerProvider**
  - **resource** : defines trace's variables : service's name, trace's id
  - **spanProcessors** : configuration of spanExporter, here we use an OTLPTraceExporter to send traces to a telemetry treatment server, for development or testing, we must use ```consoleTraceExporter()``` to display traces directly in the console.
    - To send data to the Aspire Dashboard, we need to inform the "x-otlp-api-key" field in the header and in the request, without it, we must be blocked by CORS errors.

### traces type choice

The last part of this code is here to choose the trace type to send.

```typescript
// Registering instrumentations
registerInstrumentations({
  instrumentations: [
    new UserInteractionInstrumentation({
      eventNames: [
        'click',
        'dblclick',
        'mousedown',
        'mouseup',
        'keydown',
        'keyup',
        'touchstart',
        'touchend',
      ],
    }),
    new XMLHttpRequestInstrumentation(),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: defaultConfig.corsUrls || [new RegExp('h.*')],
      clearTimingResources: false,
      ignoreUrls: ['https://exemple/v1/traces'],
    }),
  ],
});
```

In this code, we define which traces we want to send,

- **UserInteractionInstrumentation :** User interaction, click, scroll etc.
- **XMLHttpRequestInstrumentation :** Instrumentation by using the "opentelemetry-semantics"
- **FetchInstrumentation :** Resend a trace for each network, we ignore request from collection service because of a lot of spam for the developper