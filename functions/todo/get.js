require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;

// use to get all todos
module.exports = async (event) => {
    if (!process.env.JAM_STACK_TODO_DB) {
        throw new Error('No JAM_STACK_TODO_DB in .env file, kindly add one first');
    }

    const client = new faunadb.Client({ secret: process.env.JAM_STACK_TODO_DB });


    const result = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('todos'))),
            q.Lambda(ref => q.Get(ref))
        )
    )

    const todos = [
        ...result.data.map(({ data, ts, ref }) => {
            return {
                todo: data.todo,
                timeStamp: ts,
                id: ref.id
            }
        })
    ]

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true, todos }),
    }
}