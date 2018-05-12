const getNextArrivalTimes = (arrivalsByStop) => {
    console.log('arrivals by stop', arrivalsByStop);
    let differences = '';
    arrivalsByStop.forEach((arrival, index) => {
        differences += (`train ${index}: ${new Date(parseInt(arrivalsByStop[0].predictedArrivalTime))}.`);
    });
    return differences;
}

module.exports = { getNextArrivalTimes };