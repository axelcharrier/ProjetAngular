# Translation module
For the translation part of the project, we use the Angular translation module

## Translation in code
To translate a label, a text or anything, you just need to add the tag ```i18n``` in your. html. 

*exemple :*
```html
<p i18n>Hello World !</p>
```

## Configure translation
To configure the translation you first need to extract the translated files with this command :
```bash
ng extract-i18n --output-path src/locale --format "json"
```

Here we define the "outpout-path" that is were the translation file will be save. We also define the file's format, here "json".

Next you need to enter the translation in relation to your wanted language.

You have to duplicate your auto-generated file ```message.json``` and rename it ```message.{LanguageCode}.json```. 

*Language code format is fr, en, es, etc.*

Next you just have to tanslate the generated values.

*note: create your entire app in English, it will be easier to translated it next.*

## Configure in Angular

**In Angular.json**
```json
"projects": {
    "ProjetAngular": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "fr-FR" : {
            "translation": "src/locale/messages.fr.json",
            "subPath": "fr"
          },
          "es-ES" : {
            "translation": "src/locale/messages.es.json",
            "subPath": "es"
          }
        }
      },
      ...
```

Here we define the default language in "sourceLocale", an the different targeted languages in "locales".

**Always in Angular.json**
```json 

	"architect": {
	...
		"build": {
		...
	        "configurations": {
				"development-fr": {
					"optimization": false,
					"extractLicenses": false,
					"sourceMap": true,
					"localize" : ["fr-FR"]
				},
				"development-es": {
					"optimization": false,
					"extractLicenses": false,
					"sourceMap": true,
					"localize" : ["es-ES"]
	            }
			}
		}
```

Here we define the different build configuration, you need to create a configuration for each language you've created.