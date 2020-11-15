require('dotenv').config();
const faunadb = require('faunadb');
const handleGet = require('./get');
const handlePost = require('./post');
const handleDelete = require('./delete');

const q = faunadb.query;

exports.handler = async (event, context) => {
  try {

    // console.log(event.headers)
    if (event.httpMethod === 'GET') {
      return handleGet(event);
    }

    else if (event.httpMethod === 'POST') {
      return handlePost(event);
    }
    
    else if (event.httpMethod === 'DELETE') {
      return handleDelete(event);
    }

    // console.log(JSON.stringify(event));
    return {
      statusCode: 400,
      body: JSON.stringify({ success:false, message: `the ${event.httpMethod} method is not supported` }),
    }

  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
