require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;


// use to add a single entry of todo
module.exports = async (event) => {
    if (!process.env.JAM_STACK_TODO_DB) {
        throw new Error('No JAM_STACK_TODO_DB in .env file, kindly add one first');
    }

    // body data checking
    const { todo } = JSON.parse(event.body);
    if (!todo || typeof(todo)!=='string' ) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: `Invalid Data, require todo with type string`, data: JSON.parse(event.body) }),
        }
    }

    const client = new faunadb.Client({ secret: process.env.JAM_STACK_TODO_DB });


    const result = await client.query(
        q.Create(q.Collection('todos'), { data: { todo } },)
    );

    const todos = {
        todo: result.data.todo,
        timeStamp: result.ts,
        id: result.ref.id
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true, todos }),
    }
}