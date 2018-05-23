const { getStopsPerRoute } = require('../Services/GetStopsPerRoute');
const { getStopInformation } = require('../Services/GetStopInformation');

const getStopNames = async (routeId) => {
    try {
        const stopIds = await getStopsPerRoute(routeId);
        const stopNames = [];
        for (let stopId of stopIds) {
            const stopInformation = await getStopInformation(stopId);
            const stopName = stopInformation.entry.name;
            stopNames.push(stopName);
        }
        return stopNames;
    } catch (ex) {
        console.log('error getting stop names', ex.message);
        return [];
    }
}

module.exports = { getStopNames };