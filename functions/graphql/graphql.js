require('dotenv').config();
const { gql, ApolloServer } = require('apollo-server-lambda');
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.APOLLO_SERVER_TODO_DB_KEY });

const todos = [
  { id: "282259274377200128", text: 'hello world', ts: 1605426417555000 },
  { id: "282259282883248640", text: 'JAM Stack todo', ts: 1605426417555000 },
  { id: "282259305144517123", text: 'Author is Murtaza', ts: 1605426417555000 },
]


// Graphql Schema defination
const typeDefs = gql`
  type Todo {
    id: ID!
    ts: Float!
    text: String!
  }
  type Query {
    todos: [Todo]!
  }
  type Mutation {
    addTodo(text:String!): Todo!
    deleteTodo(id:ID!): Todo!
  }
`

const resolvers = {
  Query: {
    todos: async (root, args, context) => {
      const result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('todos'))),
          q.Lambda(ref => q.Get(ref))
        )
      )
      return [
        ...result.data.map(({ data, ts, ref }) => {
          return { text: data.text, ts, id: ref.id }
        })
      ]
    }
  },
  Mutation: {
    addTodo: async (root, { text }, context) => {
      const result = await client.query(
        q.Create(q.Collection('todos'), { data: { text: text } },)
      );
      return {
        text: result.data.text,
        ts: result.ts,
        id: result.ref.id
      }
      // return {...todos[0]}
    },
    deleteTodo: async (root, { id }, context) => {
      const result = await client.query(
        q.Delete(
          q.Ref(q.Collection('todos'), id)
        ));
      return {
        text: result.data.text,
        ts: result.ts,
        id: result.ref.id
      }
      // return {...todos[0]}
    },

  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
})

exports.handler = apolloServer.createHandler()


// exports.handler = apolloServer.createHandler({
//   cors:{
//     origin: "*",
//     credentials,
//   }
// })