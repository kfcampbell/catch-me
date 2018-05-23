const _normalizeStopName = (stopName) => {
    stopName = stopName.toLowerCase();
    if (!stopName.includes('airport station')) {
        stopName = stopName.replace('airport', '');
    }
    stopName = stopName.replace('station', '');
    stopName = stopName.replace('-', '');
    stopName = stopName.replace('downtown', '');
    stopName = stopName.replace('arrivals', '');
    stopName = stopName.replace('bay', '');
    stopName = stopName.replace('link', '');
    stopName = stopName.replace('south', '');
    stopName = stopName.replace('200th', '');
    stopName = stopName.replace('&', '');
    stopName = stopName.replace('/', '');
    stopName = stopName.replace("\'", '');
    stopName = stopName.trim();
    return stopName;
}

const getStopFromCustomSlot = (slotValue, stops) => {
    console.log('getting slot name', slotValue, JSON.stringify(stops));
    slotValue = _normalizeStopName(slotValue);

    for (let stop of stops) {
        stop.name = _normalizeStopName(stop.name);
        if (stop.name.includes(slotValue)) {
            console.log('matched stop', stop);
            return stop;
        }
    }

    return {};
};

module.exports = { getStopFromCustomSlot };