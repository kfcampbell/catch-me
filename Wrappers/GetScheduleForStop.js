const { getDefaultStop } = require('../Services/GetDefaultStop');
const { getArrivalsDepartures } = require('../Wrappers/GetArrivalsDepartures');

const getScheduleForStop = async (userId, isNorth) => {
    try {
        const defaultStop = await getDefaultStop(userId);
        const stopId = (isNorth) ? defaultStop.Item.northBoundStopId : defaultStop.Item.southBoundStopId;
        const arrivalsDepartures = await getArrivalsDepartures(stopId);
        return `trains heading ${(isNorth) ? 'north' : 'south'} from ${defaultStop.Item.stopName}: ${arrivalsDepartures}`;
    } catch(error) {
        console.log(`Error getting schedule for stop: ${error.message}`);
        return `Error getting schedule for stop: ${error.message}`;
    }

}

module.exports = { getScheduleForStop };