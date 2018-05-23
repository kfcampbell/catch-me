const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const { assert } = chai;
const { getStopFromCustomSlot } = require('./GetStopFromCustomSlot');

const _stops = Object.freeze([
    {
        id: "1_99604",
        name: "UW / Husky Stadium Link Station"
    }
    ,
    {
        id: "1_99610",
        name: "Capitol Hill Link Station"
    }
    ,
    {
        id: "1_1108",
        name: "Westlake Station - Bay C"
    }
    ,
    {
        id: "1_455",
        name: "University St Station - Bay C"
    }
    ,
    {
        id: "1_501",
        name: "Pioneer Sq Station - Bay C"
    }
    ,
    {
        id: "1_623",
        name: "Intl District Station - Bay C"
    }
    ,
    {
        id: "1_99260",
        name: "Stadium Station - Downtown"
    }
    ,
    {
        id: "1_99101",
        name: "Stadium Station - Airport"
    }
    ,
    {
        id: "1_99111",
        name: "SODO Station - Airport"
    }
    ,
    {
        id: "1_99121",
        name: "Beacon Hill Station - Airport"
    }
    ,
    {
        id: "1_55949",
        name: "Mt. Baker Station - Airport"
    }
    ,
    {
        id: "1_56039",
        name: "Columbia City Station - Airport"
    }
    ,
    {
        id: "1_56159",
        name: "Othello Station - Airport"
    }
    ,
    {
        id: "1_56173",
        name: "Rainier Beach Station - Airport"
    }
    ,
    {
        id: "1_99900",
        name: "Tukwila Int'l Blvd Station - Airport"
    }
    ,
    {
        id: "1_99904",
        name: "Airport Station - Arrivals"
    }
    ,
    {
        id: "1_99913",
        name: "Angle Lake Link Station & S 200th St"
    }
]);

describe('getStopFromCustomSlot', () => {
    it('returns stop on happy path', () => {
        // arrange
        // act
        const stop = getStopFromCustomSlot('columbia city', _stops);

        // assert
        assert.isNotEmpty(stop, `failed to get stop for ${'columbia city'}`);
    });
});
