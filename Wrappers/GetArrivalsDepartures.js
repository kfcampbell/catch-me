const { getArrivalsDeparturesByStop } = require('../Services/GetArrivalsDeparturesByStop');
const { getNextArrivalTimes } = require('../Adapters/ArrivalsDeparturesByStopAdapter');

const getArrivalsDepartures = async (stopId) => {
    const arrivalsDepartures = await getArrivalsDeparturesByStop(stopId);
    return getNextArrivalTimes(arrivalsDepartures);
};

module.exports = { getArrivalsDepartures };