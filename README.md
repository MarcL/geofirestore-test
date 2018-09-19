# GeoFirestore Test

Simple test for [Michael Solati](https://github.com/MichaelSolati) to test geohashing with [GeoFirestore](https://github.com/MichaelSolati/geofirestore)

## To test

-   Add Firebase project id to `.firebaserc`
-   Run `cd functions && yarn install` to install dependencies in the functions directory
-   Install Firebase tools `yarn global add firebase-tools` (if not installed already)
-   Run locally with `yarn local` or deploy to Firebase with `yarn deploy`
-   Make a POST request to root endpoint to add/update all data in `./data/testActivities.json`. This is test data based upon some real restaurants in a ski resort in France. ;)
-   Make multiple GET requests to the root endpoint to retrieve data
-   Thanks Michael! :)

## Expected result

The same data should be returned each time as below.

```javascript
{
    "status": true,
    "locations": [
        {
            "key": "latelier-dedmond",
            "document": {
                "price": 3,
                "location": "Val D'Isere",
                "name": "L'Atelier d'Edmond",
                "coordinates": {
                    "_latitude": 45.4508061,
                    "_longitude": 7.0106802
                },
                "type": "restaurant",
                "tags": {
                    "french": true,
                    "european": true
                }
            },
            "distance": 0.4874864102914622
        },
        {
            "key": "ledelweiss",
            "document": {
                "name": "L'Edelweiss",
                "coordinates": {
                    "_latitude": 45.4495378,
                    "_longitude": 7.0171777
                },
                "type": "restaurant",
                "tags": {
                    "european": true,
                    "vegetarian": true,
                    "french": true
                },
                "price": 2.5,
                "location": "Val D'Isere"
            },
            "distance": 0.9206015110011021
        },
        {
            "key": "moris-pub",
            "document": {
                "price": 3,
                "location": "Val D'Isere",
                "name": "Moris Pub",
                "coordinates": {
                    "_latitude": 45.4485509,
                    "_longitude": 6.9794408
                },
                "type": "bar",
                "tags": {
                    "bar": true,
                    "pub": true
                }
            },
            "distance": 2.032729152170103
        },
        {
            "key": "dicks-tea-bar",
            "document": {
                "name": "Dick's Tea Bar",
                "coordinates": {
                    "_latitude": 45.4489207,
                    "_longitude": 6.9746443
                },
                "type": "bar",
                "tags": {
                    "club": true,
                    "nightlife": true,
                    "bar": true
                },
                "price": 2,
                "location": "Val D'Isere"
            },
            "distance": 2.4075925397448374
        },
        {
            "key": "flash-pizza",
            "document": {
                "price": 1,
                "location": "Val D'Isere",
                "name": "Flash Pizza",
                "coordinates": {
                    "_latitude": 45.4510946,
                    "_longitude": 6.9745267
                },
                "type": "restaurant",
                "tags": {
                    "italian": true,
                    "vegetarian": true,
                    "pizza": true
                }
            },
            "distance": 2.4350060740948907
        },
        {
            "key": "la-folie-douce",
            "document": {
                "price": 2,
                "location": "Val D'Isere",
                "name": "La Folie Douce",
                "coordinates": {
                    "_latitude": 45.3810053,
                    "_longitude": 6.6250813
                },
                "type": "restaurant",
                "tags": {
                    "bar": true,
                    "vegetarian": true,
                    "french": true
                }
            },
            "distance": 30.62341060200018
        }
    ]
}
```

Instead, even though the user position is stationary, and none of the locations move at all, it sometimes returns no results in addition to sometimes returning the correct ordered data.

```javascript
{
    "status": true,
    "locations": []
}
```
