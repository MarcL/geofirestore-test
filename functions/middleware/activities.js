const { GeoFirestore } = require('geofirestore');
const admin = require('firebase-admin');
const slugify = require('slugify');
const firestore = require('../services/firestore');
const activities = require('../data/testActivities.json'); // Test data

const logEvent = eventName => (key, document, distance) => {
    console.log({
        eventName,
        key,
        document,
        distance,
    });
};

const sortByNearestDistance = (locationA, locationB) => locationA.distance > locationB.distance;

const query = (request, response) => {
    const geoRef = firestore.collection('geo-activities');
    const geoFirestore = new GeoFirestore(geoRef);

    // TEST : Arbitrary point near to locations
    const center = new admin.firestore.GeoPoint(45.448357, 7.005497);
    const radius = 40;
    const geoQuery = geoFirestore.query({
        center,
        radius,
    });

    // eslint-disable-next-line prefer-const
    let nearbyLocations = [];

    geoQuery.on('ready', () => {
        console.log('ready fired');
        const sortedLocations = nearbyLocations.sort(sortByNearestDistance);
        geoQuery.cancel();

        return response.json({ status: true, locations: sortedLocations });
    });

    geoQuery.on('key_exited', logEvent('key_exited'));
    geoQuery.on('key_moved', logEvent('key_moved'));
    geoQuery.on('key_modified', logEvent('key_modified'));

    geoQuery.on('key_entered', (key, document, distance) => {
        logEvent('key_entered');

        nearbyLocations.push({
            key,
            document,
            distance,
        });
    });
};

const update = (request, response) => {
    const geoRef = firestore.collection('geo-activities');
    const geoFirestore = new GeoFirestore(geoRef);

    // Parse data into Firestore friendly objects
    const activitiesForFirestore = Object.keys(activities).map((keyName) => {
        const activity = activities[keyName];
        return {
            coordinates: new admin.firestore.GeoPoint(
                activity.coordinates[0],
                activity.coordinates[1],
            ),
            location: activity.location,
            name: activity.name,
            price: activity.price,
            tags: activity.tags,
            type: activity.type,
        };
    });

    // Create keys based on slug version of name
    const firestoreData = activitiesForFirestore.reduce((accumulator, activity) => {
        const keyName = slugify(activity.name, { remove: /[*+~.()'"!:@]/g, lower: true });
        accumulator[keyName] = activity;

        return accumulator;
    }, {});

    // Update all data in Firestore
    geoFirestore
        .set(firestoreData)
        .then(() => {
            response.json({ status: true });
        })
        .catch((error) => {
            response.json({ status: false, error: error.message });
        });
};

module.exports = { query, update };
