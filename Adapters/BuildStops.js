const _stopIsSouthBound = (stop) => {
    const stopNameParts = stop.name.split(' ');

    if (!stopNameParts[0].toLowerCase().includes('airport')) {
        if (stop.name.toLowerCase().includes('airport')) {
            return true;
        }
    }

    if (stop.direction.includes('S')) {
        return true;
    }
    return false;
}

const buildStops = (givenStops, routeId) => {
    const stops = [];
    for (let stop of givenStops) {
        let stopHasNotBeenAdded = true;
        const currStopNameParts = stop.name.split(' ');
        const currStopName = `${currStopNameParts[0]} ${currStopNameParts[1]}`;
        console.log('stop info', stop);
        if (stop.routeIds.includes(routeId)) {
            for (let existingStop of stops) {
                if (existingStop.name.includes(currStopName)) {
                    if (_stopIsSouthBound(stop)) {
                        existingStop.SouthBoundStop = stop.id
                    } else {
                        existingStop.NorthBoundStop = stop.id
                    }
                    stopHasNotBeenAdded = false;
                }
            }
            if (stopHasNotBeenAdded) {
                stops.push({
                    SouthBoundStop: _stopIsSouthBound(stop) ? stop.id : '',
                    NorthBoundStop: _stopIsSouthBound(stop) ? '' : stop.id,
                    name: currStopName,
                    lat: stop.lat,
                    lon: stop.lon
                });
            }
        }
    }
    console.log('edited list of stops', stops);
    return stops;
};

module.exports = { buildStops };