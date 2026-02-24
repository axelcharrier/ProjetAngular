# General
We decided to split the different parts of the app for a better organisation and for good practices.

## Structure
### Components
Globaly, we created a component for each page because it's not a really big app, for a bigger one we must create some reusable components.

### Helpers
Helpers are used to ease the modifications inside the app, for example, we used an helper to configure routes informations if a route changes, we only have to modify it in the helper, not in all the app.

### Interceptors
Interceptor are used to intercept http requests. We can configure it to do some actions when we receive HTTP errors etc. Here we mainly use it to personalize HTTP error message and to display tosters.

### Services
Services can be seen as method collection that will be used by the components, all these methods are reusable.
For exemple, here we mainly use it to send requests to the API.