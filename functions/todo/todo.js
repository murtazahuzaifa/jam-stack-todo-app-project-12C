require('dotenv').config();
const faunadb = require('faunadb');
const get = require('./get');
const post = require('./post');

const q = faunadb.query;

exports.handler = async (event, context) => {
  try {

    if (event.httpMethod === 'GET') {
      return get(event);
    }

    else if (event.httpMethod === 'POST') {
      return post(event);
    }

    // console.log(JSON.stringify(event));
    return {
      statusCode: 400,
      body: JSON.stringify({ success:false, message: `the ${event.httpMethod} is not supported` }),
    }

  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
