const { getStopsPerRoute } = require('../Services/GetStopsPerRoute');
const { getStopInformation } = require('../Services/GetStopInformation');
const { buildStops } = require('../Adapters/BuildStops');

const getStopNamesAndIds = async (routeId) => {
    try {
        const serviceStops = await getStopsPerRoute(routeId);
        const adaptedStops = buildStops(serviceStops, routeId);
        return adaptedStops;
    } catch (ex) {
        console.log('error getting stop names', ex.message);
        return [];
    }
}

module.exports = { getStopNamesAndIds };