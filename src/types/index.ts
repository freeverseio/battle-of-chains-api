import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    status: String!
    users(where: UserWhereInput): [User!]!
  }

  type User {
    laosContract: String
    initialOwner: String
    owner: String
  }

  input UserWhereInput {
    laosContract: String
    initialOwner: String
    owner: String
  }
`;
