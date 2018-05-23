const { getStopsPerRoute } = require('../Services/GetStopsPerRoute');
const { getStopInformation } = require('../Services/GetStopInformation');

const getStopNamesAndIds = async (routeIdSouth, routeIdNorth) => {
    try {
        const stopIds = await getStopsPerRoute(routeId);
        const stops = [];
        for (let stopId of stopIds) {
            const stopInformation = await getStopInformation(stopId);
            const stopName = stopInformation.entry.name;
            stops.push({ id: stopId, name: stopName });
        }
        return stops;
    } catch (ex) {
        console.log('error getting stop names', ex.message);
        return [];
    }
}

module.exports = { getStopNamesAndIds };