require('babel-polyfill');
const util = require('util');
const Alexa = require('alexa-app');
const { getDefaultStop } = require('./Services/GetDefaultStop');
const { getArrivalsDepartures } = require('./Wrappers/GetArrivalsDeparturesWrapper');
const { getStopNamesAndIds } = require('./Wrappers/GetStopNames');
const { getStopFromCustomSlot } = require('./Helpers/GetStopFromCustomSlot');
const { setUserPreferences } = require('./Repositories/UserInteraction');

const app = new Alexa.app('catch-me'); // eslint-disable-line

module.change_code = 1;

let customStopNorth = { id: 0, name: 'test0' };
let customStopSouth = { id: 1, name: 'test1' };

app.launch((req, res) => {
  return getDefaultStop(req.userId)
    .then(data => {
      console.log('results of getting default stop', data);
      if (data) {
        return res
          .say(
            'your default stop is ',
            data.Item.stopName,
            'you can say: alexa, ask catch me what the next train south'
          )
          .shouldEndSession(true);
      }
      return res
        .say(
          'no default stop. you can set one by saying, for example: set my default stop to Rainier Beach'
        )
        .shouldEndSession(false);
    })
    .catch(error => {
      console.log('error getting default stop', error);
      return res
        .say(
          'no default stop. you can set one by saying, for example: set my default stop to Rainier Beach'
        )
        .shouldEndSession(false);
    });
});

app.intent(
  'RainierBeachSouthIntent',
  {
    slots: {},
    utterances: ['{|next trains going south from rainier beach}']
  },
  (req, res) =>
    getArrivalsDepartures('1_56173')
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
      })
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
  }
);

app.intent(
  'DefaultStopSouthIntent',
  {
    slots: {},
    utterances: ['{|default stop}']
  },
  (req, res) => {
    console.log('userId', req.userId);
    return getStopNamesAndIds('40_100479')
      .then(results => {
        console.log('results of get stops per route', results);
        return res.say('got some results!');
      })
      .catch(error => {
        console.log('error in default stop south intent', error.message);
        return res.say(`error in default stop south intent. ${error.message}`);
      });
  }
);

app.intent(
  'SetDefaultStopIntent',
  {
    slots: { defaultStop: 'SoundTransitStop' },
    utterances: ['{|set default stop to}']
  },
  (req, res) => {
    console.log('default slot', req.slots.defaultStop.value);
    let defaultStop = 'error getting default stop';
    if (req.slots.defaultStop.value) {
      defaultStop = req.slots.defaultStop.value;

      return getStopNamesAndIds('40_100479')
        .then(stops => {
          const stop = getStopFromCustomSlot(defaultStop, stops);
          return setUserPreferences(req.userId, stop.name, stop.NorthBoundStop, stop.SouthBoundStop)
            .then(result => {
              console.log('result of setting stop', util.inspect(result));
              if (result) {
                return res.say(`your stop is now set to - ${stop.name}`).shouldEndSession(true);
              }
            })
            .catch(error => {
              console.log('error setting preference', error);
              return res
                .say('error setting your default stop. try again maybe?')
                .shouldEndSession(true);
            });
        })
        .catch(error => {
          console.log('error getting stop names and ids', error.message);
          return res.say(`error getting stop names and ids. ${error.message}`);
        });
    }
    return res.say("i couldn't hear your default stop, sorry!").shouldEndSession(true);
  }
);

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
