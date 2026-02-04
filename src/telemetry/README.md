# Télémétrie

## Comment ça marche ?

**Opentelemetry** est une boite à outils permettant de récupérer des différentes données de télémétrie sur les applications (traces, métriques, logs)

> [!infos] Notes
> Ici, opentelemetry est utilisé uniquement à des fins de traçage de requête, nous n'utilisons pas les options de métriques et de logs.

### Récupération et envoi des traces

Une trace (Span) est un objets qui décrit une actions (un click, une requête api, etc.), Opentelemetry nous permet de créer et d'envoyer à notre système de récupération ces fameuses traces (ici Aspire).

Pour extraire les traces, on utilise `WebtracerProvider`

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

Dans ce code on :

- Défini un **WebTracerProvider**
  - **resource** : défini les variable de la trace : nom du service, id de la trace
  - **spanProcessors** : configuration du spanExporter, ici on utilise un OTLPTraceExporter afin d'envoyer les traces à un serveur de traitement de télémétrie externe, pour du développement ou du test, on peut utiliser un `consoleTraceExporter()` afin d'afficher les traces directement dans la console du devtools.
    - Afin de pouvoir envoyer les données au Dashboard d'aspire, il faut renseigner le "x-otlp-api-key" dans le headers de la requête, sans ça risque de CORS

### Choix du type de traces à envoyer

La dernière partie du code permet de choisir quelles traces on envoie

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

Dans ce code, on défini quelles traces est ce qu'on souhaite envoyer,

- **UserInteractionInstrumentation :** les interactions de l'utilisateur, click, scroll etc.
- **XMLHttpRequestInstrumentation :** Instrumentation en utilisant les "opentelemtry-semantics"
- **FetchInstrumentation :** Renvoie une trace pour chaque réseau, on ignore les requête provenant du service de récupération de traces car beaucoup de spam inutile pour le développeur.
