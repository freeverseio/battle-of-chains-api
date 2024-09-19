import { usersResolver } from './usersResolver';


export const resolvers = (indexerExec: any) => ({
  Query: {
    status: () => 'UP',
    users: (parent: any, args: any, context: any) => usersResolver(parent, args, context, indexerExec),
  },
});