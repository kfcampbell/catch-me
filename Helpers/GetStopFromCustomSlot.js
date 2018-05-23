const _normalizeStopName = (stopName) => {
    let normalizedStopName = stopName;
    normalizedStopName = normalizedStopName.toLowerCase();
    if (!normalizedStopName.includes('airport station')) {
        normalizedStopName = normalizedStopName.replace('airport', '');
    }
    normalizedStopName = normalizedStopName.replace('station', '');
    normalizedStopName = normalizedStopName.replace('-', '');
    normalizedStopName = normalizedStopName.replace('downtown', '');
    normalizedStopName = normalizedStopName.replace('arrivals', '');
    normalizedStopName = normalizedStopName.replace('bay', '');
    normalizedStopName = normalizedStopName.replace('link', '');
    normalizedStopName = normalizedStopName.replace('south', '');
    normalizedStopName = normalizedStopName.replace('200th', '');
    normalizedStopName = normalizedStopName.replace('&', '');
    normalizedStopName = normalizedStopName.replace('/', '');
    normalizedStopName = normalizedStopName.replace("\'", '');
    normalizedStopName = normalizedStopName.trim();
    return normalizedStopName;
}

const getStopFromCustomSlot = (slotValue, stops) => {
    console.log('getting slot name', slotValue, JSON.stringify(stops));
    let normalizedSlotValue = _normalizeStopName(slotValue);

    for (let stop of stops) {
        stop.name = _normalizeStopName(stop.name);
        if (stop.name.includes(normalizedSlotValue)) {
            console.log('matched stop', stop);
            return stop;
        }
    }

    return {};
};

module.exports = { getStopFromCustomSlot };