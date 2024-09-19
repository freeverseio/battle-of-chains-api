import { Executor } from '@graphql-tools/utils';
import { parse } from 'graphql';

// Define the `users` resolver function
export const usersResolver = async (_: any, { where }: any, context: any, indexerExec: Executor) => {
  const query = `
    query {
      tokens(where: { laosContract: "0xfffffffffffffffffffffffe0000000000000001" }) {
        edges {
          node {
            laosContract
            initialOwner
            owner
          }
        }
      }
    }
  `;

  const result = await indexerExec({
    document: parse(query),
    context, // Pass the context to include the auth header
  }) as any;

  

  return result.data.tokens.edges.map((edge: any) => edge.node);
};
