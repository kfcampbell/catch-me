require('babel-polyfill');
const util = require('util');
const Alexa = require('alexa-app');
const { getDefaultStop } = require('./Services/GetDefaultStop');
const { getScheduleForStop } = require('./Wrappers/GetScheduleForStop');
const { getArrivalsDepartures } = require('./Wrappers/GetArrivalsDepartures');
const { getStopNamesAndIds } = require('./Wrappers/GetStopNames');
const { getStopFromCustomSlot } = require('./Helpers/GetStopFromCustomSlot');
const { setUserPreferences } = require('./Repositories/UserInteraction');

const app = new Alexa.app('catch-me'); // eslint-disable-line

module.change_code = 1;

app.launch((req, res) => {
  return getDefaultStop(req.userId)
    .then(data => {
      return res
        .say(`your home stop is ${data.Item.stopName}. try asking: what's the next train south?`)
        .shouldEndSession(false);
    })
    .catch(error => {
      console.log('error getting default stop', error);
      return res
        .say(
          "i couldn't find your home stop. you can set one by saying, for example: set my default stop to Rainier Beach."
        )
        .shouldEndSession(false);
    });
});

app.intent(
  'DefaultStopSouthIntent',
  {
    slots: {},
    utterances: ['{|train south}']
  },
  (req, res) => {
    return getScheduleForStop(req.userId, false)
      .then(results => {
        return res.say(results).shouldEndSession(true).send();
      })
      .catch(error => {
        console.log('error in default stop south intent', error.message);
        return res.say(`error in default stop south intent. ${error.message}`);
      });
  }
);

app.intent(
  'DefaultStopNorthIntent',
  {
    slots: {},
    utterances: ['{|train north}']
  },
  (req, res) => {
    return getScheduleForStop(req.userId, true)
      .then(results => {
        return res.say(results).shouldEndSession(true).send();
      })
      .catch(error => {
        console.log('error in default stop south intent', error.message);
        return res.say(`error in default stop south intent. ${error.message}`);
      });
  }
);


// this is a train wreck. need to abstract some of this out to a wrapper and use a single promise instead of all these chains.
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
