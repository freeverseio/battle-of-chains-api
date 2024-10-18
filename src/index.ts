import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { stitchSchemas } from '@graphql-tools/stitch';
import * as dotenv from 'dotenv';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import 'reflect-metadata'; // Required by TypeGraphQL
import { buildSchema } from 'type-graphql';
import { AppDataSource } from './db/AppDataSource';
import { AttackResolver, ChainResolver, UserResolver, AssetResolver } from './resolvers/MainResolver';

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
    resolvers: [AttackResolver, ChainResolver, UserResolver, AssetResolver], 
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
  dotenv.config();
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
      title: 'The Battle of Chains API',
      headers: `{"x-api-key": "my-secret-api-key"}`,
      defaultQuery: `
      query MyQuery {
        users {
          address
          chainId
          coordinates {
            x
            y
          }
        }
      }
    `,
    },
  });


  AppDataSource.initialize()
  .catch((error) => console.log("Error: ", error));


  const server = createServer(gatewayApp);
  server.listen(4000, () => console.log('Gateway running at http://localhost:4000/graphql'));
})();
