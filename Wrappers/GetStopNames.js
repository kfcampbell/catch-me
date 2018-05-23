const { getStopsPerRoute } = require('../Services/GetStopsPerRoute');
const { buildStops } = require('../Adapters/BuildStops');

const getStopNamesAndIds = async (routeId) => {
    try {
        const serviceStops = await getStopsPerRoute(routeId);
        return buildStops(serviceStops, routeId);
    } catch (ex) {
        console.log('error getting stop names', ex.message);
        return [];
    }
}

module.exports = { getStopNamesAndIds };