import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { tokenOwnersQuery } from '../queries';
import { Player } from '../types/player';
import { parse } from 'graphql';
@Resolver()
export class UserResolver {
  @Query(() => [Player])
  async users(
    @Ctx() context: any 
  ): Promise<Player[]> {
    const query = tokenOwnersQuery('0xfffffffffffffffffffffffe0000000000000004');
    const result = await context.indexerExec({
      document: parse(query),
      context,
    });

    return result.data.tokenOwners.map((owner: any) => {
      return new Player(owner.owner);
    });
  }
}
