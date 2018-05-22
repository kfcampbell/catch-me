const rp = require('request-promise');
const API_KEY = require('../Keys');

const getArrivalsDeparturesByStop = async stopId => {
  const query = `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${stopId}.json?key=TEST`;
  console.log('getting calendar results with', query);

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
};

module.exports = { getArrivalsDeparturesByStop };
