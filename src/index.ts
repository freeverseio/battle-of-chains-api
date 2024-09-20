import 'reflect-metadata'; // Required by TypeGraphQL
import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { stitchSchemas } from '@graphql-tools/stitch';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver'; 

async function makeGatewaySchema() {
  // Remote executor for your indexer service
  const indexerExec = buildHTTPExecutor({
    endpoint: 'http://localhost:4350/graphql',
    headers: (executorRequest) => ({
      Authorization: executorRequest?.context?.authHeader, 
    }),
  });

  // Build TypeGraphQL schema
  const typeGraphqlSchema = await buildSchema({
    resolvers: [UserResolver], // Add your TypeGraphQL resolvers here
    emitSchemaFile: true, // Optional: emit schema file if needed
    validate: false, // Disable auto-validation if you don't need it
  });

  // Stitch the TypeGraphQL schema with the remote and local schemas
  const schema = stitchSchemas({
    subschemas: [
      {
        schema: typeGraphqlSchema, 
      },
    ],
  });

  return {
    schema: schema,
    indexerExec: indexerExec,
  };
}

(async () => {
  const {schema, indexerExec} = await makeGatewaySchema();

  // Yoga server setup
  const gatewayApp = createYoga({
    schema,
    context: ({ request }) => ({
      authHeader: request.headers.get('authorization'),
      indexerExec, // Pass indexerExec to the context for resolvers
    }),
    maskedErrors: false,
    graphiql: {
      title: 'LAOS Gateway',
      headers: `{"x-api-key": "my-secret-api-key"}`,
      defaultQuery: `
      query MyQuery {
        users {
          address
        }
      }
    `,
    },
  });

  const server = createServer(gatewayApp);
  server.listen(4000, () => console.log('Gateway running at http://localhost:4000/graphql'));
})();
