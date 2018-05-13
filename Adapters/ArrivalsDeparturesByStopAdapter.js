const moment = require('moment');

const getNextArrivalTimes = (arrivalsByStop) => {
    let differences = '';
    arrivalsByStop.forEach((arrival, index) => {
        const arrivalTime = new moment(arrival.predictedArrivalTime);
        if(arrivalTime.isSame(new moment(0))) {
            differences += `train ${index}: just guess. `;
            return;
        }
        const diff = arrivalTime.fromNow();
        differences += `train ${index}: ${diff}. `;
    });
    return differences;
}

module.exports = { getNextArrivalTimes };