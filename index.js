require('babel-polyfill');
const { getArrivalsDepartures } = require('./Wrappers/GetArrivalsDeparturesWrapper');
const { getStopNames } = require('./Wrappers/GetStopNames');

module.change_code = 1;

const Alexa = require('alexa-app');
const app = new Alexa.app('alaska-mvps'); // eslint-disable-line

app.launch((req, res) => {
  const prompt = `<audio src='https://s3.amazonaws.com/alaska-air-at-home/Airplane-ding-sound.mp3'/>Catch me if you can!`;
  res
    .say(prompt)
    .reprompt(prompt)
    .shouldEndSession(false);
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

// req.userId gets userId
app.intent('DefaultStopSouthIntent', {
  slots: {},
  utterances: ['{|default stop}']
},
(req, res) => {
  return getStopNames('40_100479').then(results => {
    console.log('results of get stops per route', results);
    return res.say('got some results!');
  })
  .catch(error => {
    console.log('error in default stop south intent', error.message);
    return res.say(`error in default stop south intent. ${error.message}`);
  });
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
