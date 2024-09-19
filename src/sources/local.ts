import { gql } from 'graphql-tag';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Define local schema
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

// Define resolvers for the local schema
const resolvers = {
  Query: {
    hello: () => 'Hello from the local schema!',
  },
};

// Create the local executable schema
export const localSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});