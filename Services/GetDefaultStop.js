const util = require('util');
const { getUserPreferences } = require('../Repositories/UserInteraction');

const getDefaultStop = async (userId) => {
    console.log('get default stop called with userId', userId);

    const prefs = await getUserPreferences(userId);
    console.log('prefs', util.inspect(prefs));
    return prefs;
}

module.exports = { getDefaultStop };