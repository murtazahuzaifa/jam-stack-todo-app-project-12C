require('dotenv').config();
const { gql, ApolloServer } = require('apollo-server-lambda');
const faunadb = require('faunadb');

const todos = [
  { id: "282259274377200128", text: 'hello world', ts: 1605426417555000 },
  { id: "282259282883248640", text: 'JAM Stack todo', ts: 1605426417555000 },
  { id: "282259305144517123", text: 'Author is Murtaza', ts: 1605426417555000 },
]


// Graphql Schema defination
const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    ts: Float!
    text: String!
  }
`

const resolvers = {
  Query: {
    todos: async (root, args, context) => {
      return todos
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

exports.handler = apolloServer.createHandler()


// exports.handler = apolloServer.createHandler({
//   cors:{
//     origin: "*",
//     credentials,
//   }
// })