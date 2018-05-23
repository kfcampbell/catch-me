const rp = require('request-promise');
const { API_KEY } = require('../Keys');

const getStopsPerRoute = async routeId => {
    try {
        const query = `http://api.pugetsound.onebusaway.org/api/where/stops-for-route/${routeId}.json?key=${API_KEY}`;

        const options = {
            method: 'GET',
            uri: query,
            resolveWithFullResponse: true,
            json: true
        };
        const response = await rp(options);
        if (response.statusCode < 300) {
            console.log('stops to iterate through', JSON.stringify(response.body.data.references.stops));
            return response.body.data.references.stops;
        }
        return 'Yeah uhh Keegan messed up...';

    } catch (ex) {
        console.log('error getting stops per route', ex.message);
        return [];
    }
};

module.exports = { getStopsPerRoute };
