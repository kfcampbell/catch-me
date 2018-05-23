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

  return docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add user', userId, '. Error JSON:', JSON.stringify(err, null, 2));
      return false;
    }
    console.log('PutItem succeeded:', JSON.stringify(data));
    return true;
  });
};

// this isn't working right now...
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
  return docClient.get(params, (err, data) => {
    if (err) {
      console.error('Failed to get user information', userId);
      console.error('get error information', JSON.stringify(err));
      return null;
    }
    console.log('successfully got information', JSON.stringify(data));
    return data;
  });
};

// const updateUserPreferences = (userId, northBoundStopId, southBoundStopId) => null;

module.exports = { setUserPreferences, getUserPreferences };
