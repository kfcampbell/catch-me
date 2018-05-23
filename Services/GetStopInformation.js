const rp = require('request-promise');
const { API_KEY } = require('../Keys');

const getStopInformation = async stopId => {
    try {
        const query = `http://api.pugetsound.onebusaway.org/api/where/stop/${stopId}.json?key=${API_KEY}`;

        const options = {
            method: 'GET',
            uri: query,
            resolveWithFullResponse: true,
            json: true
        };
        const response = await rp(options);
        if (response.statusCode < 300) {
            console.log('response:', JSON.stringify(response));
            const json = response.body.data; //.entry.name;
            return json;
        }
        return 'Yeah uhh Keegan messed up...';

    } catch (ex) {
        console.log('error getting stop information', ex.message);
        return [];
    }
};

module.exports = { getStopInformation };
