const rp = require('request-promise');
const { API_KEY } = require('../Keys');

const getArrivalsDeparturesByStop = async stopId => {
  try {
    const query = `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${stopId}.json?key=${API_KEY}`;
    console.log('calling get arrivals by stop with ', query);

    const options = {
      method: 'GET',
      uri: query,
      resolveWithFullResponse: true,
      json: true
    };
    const response = await rp(options);
    if (response.statusCode < 300) {
      console.log('response:', JSON.stringify(response));
      const json = response.body.data.entry.arrivalsAndDepartures;
      return json;
    }
    return 'Yeah uhh Keegan messed up...';

  }
  catch (ex) {
    console.log('error getting arrivals and departures by stop', ex.message);
    return [];
  }
};

module.exports = { getArrivalsDeparturesByStop };
