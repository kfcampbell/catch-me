const moment = require('moment');

const getNextArrivalTimes = (arrivalsByStop) => {
    console.log('arrivals by stop', arrivalsByStop);
    let differences = '';
    arrivalsByStop.forEach((arrival, index) => {
        const arrivalTime = new moment(arrival.predictedArrivalTime);
        const diff = arrivalTime.fromNow();
        differences += `train ${index}: ${diff}. `;
    });
    return differences;
}

module.exports = { getNextArrivalTimes };