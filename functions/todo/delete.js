require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;

// use to delete a single entry of todo
module.exports = async (event) => {
  if (!process.env.JAM_STACK_TODO_DB) {
    throw new Error('No JAM_STACK_TODO_DB in .env file, kindly add one first');
  }

  // console.log(event.headers);
  // body data checking
  const { todoid } = event.headers;
  if (!todoid || typeof (todoid) !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: `Invalid Data, require todoid with type string in headers` }),
    }
  }

  const client = new faunadb.Client({ secret: process.env.JAM_STACK_TODO_DB });

  try {
    const result = await client.query(
      q.Delete(
        q.Ref(q.Collection('todos'), todoid)
      ));

    const todos = {
      todo: result.data.todo,
      timeStamp: result.ts,
      id: result.ref.id
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, deleted: true, todos }),
    }

  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: `Invalid todoid, todo not found` }),
    }
  }
}