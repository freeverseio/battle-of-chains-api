import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { stitchSchemas } from '@graphql-tools/stitch';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { typeDefs } from './types';
import { resolvers } from './resolvers';
import { localSchema } from './sources/local'; // Local schema

async function makeGatewaySchema() {
  // Remote executor for your indexer service
  const indexerExec = buildHTTPExecutor({
    endpoint: 'http://localhost:4350/graphql',
    headers: (executorRequest) => ({
      Authorization: executorRequest?.context?.authHeader, 
    }),
  });

  return stitchSchemas({
    // subschemas: [
    //   {
    //     schema: await schemaFromExecutor(indexerExec),
    //     executor: indexerExec,
    //   },
    //   {
    //     schema: localSchema,
    //   },
    // ],
    typeDefs,
    resolvers: resolvers(indexerExec), // Pass indexerExec to the resolvers
  });
}



(async () => {
  const schema = await makeGatewaySchema();
  // Yoga server setup
  const gatewayApp = createYoga({
    schema: schema,
    context: ({ request }) => ({
      authHeader: request.headers.get('authorization'),
    }),
    maskedErrors: false,
    graphiql: {
      title: 'LAOS Gateway',
      headers: `{"x-api-key": "my-secret-api-key"}`,
      defaultQuery: `
      query ExampleQuery {
        users {
          laosContract
          initialOwner
          owner
        }
        status
      }
    `,
    },
  });
  const server = createServer(gatewayApp);
  server.listen(4000, () => console.log('Gateway running at http://localhost:4000/graphql'));
})();
