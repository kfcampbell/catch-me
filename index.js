require('babel-polyfill');
const { getDefaultStop } = require('./Services/GetDefaultStop');
const { getArrivalsDepartures } = require('./Wrappers/GetArrivalsDeparturesWrapper');
const { getStopNamesAndIds } = require('./Wrappers/GetStopNames');
const { getStopInformation } = require('./Services/GetStopInformation');
const { getStopFromCustomSlot } = require('./Helpers/GetStopFromCustomSlot');

module.change_code = 1;

const Alexa = require('alexa-app');
const app = new Alexa.app('alaska-mvps'); // eslint-disable-line

let customStopNorth = { id: 0, name: 'test0' };
let customStopSouth = { id: 1, name: 'test1' };

app.launch((req, res) => {
  const prompt = `<audio src='https://s3.amazonaws.com/alaska-air-at-home/Airplane-ding-sound.mp3'/>Catch me if you can!`;
  return getDefaultStop(req.userId)
    .then((result) => {
      console.log('results of getting default stop', result);
      if (result) {
        return res.say('your default stop is ', result).shouldEndSession(true);
      } else {
        return res.say('no default stop. you can set one by saying, for example: set my default stop to Rainier Beach')
          .shouldEndSession(false);
      }
    })
    .catch((error) => {
      console.log('error getting default stop upon app launch', error.message);
      return res.say('Error getting default stop. Keegan will do something about this later.').shouldEndSession(false);
    });
});

app.intent(
  'RainierBeachSouthIntent',
  {
    slots: {},
    utterances: ['{|next trains going south from rainier beach}']
  },
  (req, res) => {
    return getArrivalsDepartures('1_56173')
      .then(results => {
        console.log('results of get arrivals by stop', results);
        return res
          .say(`light rail heading south from rainier beach: ${results}`)
          .shouldEndSession(true)
          .send();
      })
      .catch(error => {
        console.log('something went wrong in get arrivals by stop', error.message);
        return res.say(`something went wrong in get arrivals by stop. ${error.message}`);
      });
    return res
      .say('why am i here?')
      .shouldEndSession(true)
      .send();
  }
);

app.intent(
  'RainierBeachNorthIntent',
  {
    slots: {},
    utterances: ['{|next trains going north from rainier beach}']
  },
  (req, res) => {
    return getArrivalsDepartures('1_55578')
      .then(results => {
        console.log('results of get arrivals by stop', results);
        return res
          .say(`light rail heading north from rainier beach: ${results}`)
          .shouldEndSession(true)
          .send();
      })
      .catch(error => {
        console.log('something went wrong in get arrivals by stop', error.message);
        return res.say(`something went wrong in get arrivals by stop. ${error.message}`);
      });
    return res
      .say('why am i here?')
      .shouldEndSession(true)
      .send();
  }
);

app.intent('DefaultStopSouthIntent', {
  slots: {},
  utterances: ['{|default stop}']
},
  (req, res) => {
    console.log('userId', req.userId);
    return getStopNamesAndIds('40_100479').then(results => {
      console.log('results of get stops per route', results);
      return res.say('got some results!');
    })
      .catch(error => {
        console.log('error in default stop south intent', error.message);
        return res.say(`error in default stop south intent. ${error.message}`);
      });
  });

app.intent('SetDefaultStopIntent', {
  slots: { defaultStop: 'SoundTransitStop' },
  utterances: ['{|set default stop to}']
},
  (req, res) => {
    console.log('default slot', req.slots.defaultStop.value);
    let defaultStop = 'error getting default stop';
    if (req.slots.defaultStop.value) {
      defaultStop = req.slots.defaultStop.value;

      // todo: wrapper that calls both north and southbound link routes.
      // it will make a list of (stop, direction, id) objects
      // db table will look like: (userId, stopName, stopIdNorth, stopIdSouth)

      return getStopNamesAndIds('40_100479')
        .then((stops) => {
          const stop = getStopFromCustomSlot(defaultStop, stops);
          return res.say(`your stop is now set to - ${stop.name}`).shouldEndSession(true);
        })
        .catch((error) => {
          console.log('error getting stop names and ids', ex.message);
          return res.say(`error getting stop names and ids. ${ex.message}`);
        });
    }
  });

app.intent('AMAZON.StopIntent', {}, (req, res) => {
  const speechOutput = `<audio src='https://s3.amazonaws.com/alaska-air-at-home/Seatbeltsignoff.mp3'/>Good luck!`;
  return res
    .say(speechOutput)
    .shouldEndSession(true)
    .send();
});

app.intent('AMAZON.CancelIntent', {}, (req, res) => {
  const speechOutput = `<audio src='https://s3.amazonaws.com/alaska-air-at-home/Seatbeltsignoff.mp3'/>Good luck!`;
  return res
    .say(speechOutput)
    .shouldEndSession(true)
    .send();
});

// hack to support custom utterances in utterance expansion string
console.log(app.utterances().replace(/\{\-\|/g, '{')); // eslint-disable-line
module.exports = app;
