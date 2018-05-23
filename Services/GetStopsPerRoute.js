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
            console.log('response:', JSON.stringify(response));
            const json = response.body.data.entry.stopGroupings[0].stopGroups[0].stopIds;
            return json;
        }
        return 'Yeah uhh Keegan messed up...';

    } catch (ex) {
        console.log('error getting stops per route', ex.message);
        return [];
    }
};

module.exports = { getStopsPerRoute };
