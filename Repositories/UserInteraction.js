const AWS = require('aws-sdk');

const tableName = 'Users';

const setUserPreferences = async (userId, stopName, northBoundStopId, southBoundStopId) => {
  AWS.config.update({
    region: 'us-east-1',
    endpoint: 'dynamodb.us-east-1.amazonaws.com'
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  // todo: check for empty strings and put a dummy value in
  const params = {
    TableName: tableName,
    Item: {
      UserID: userId,
      stopName,
      northBoundStopId,
      southBoundStopId
    }
  };

  const result = await docClient.put(params).promise();
  if(result) {
      return result;
  }
  throw new Error('Couldn\'t save user preferences!');
};

const getUserPreferences = async userId => {
  AWS.config.update({
    region: 'us-east-1',
    endpoint: 'dynamodb.us-east-1.amazonaws.com'
  });

  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: tableName,
    Key: {
      UserID: userId
    }
  };

  const result = await docClient.get(params).promise();
  console.log('home stop information', result);
  if (result) {
    return result;
  }
  throw new Error('Couldn\'t find home stop');
};

// const updateUserPreferences = (userId, northBoundStopId, southBoundStopId) => null;

module.exports = { setUserPreferences, getUserPreferences };
