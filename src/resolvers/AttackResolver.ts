import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { AppDataSource } from '../db/AppDataSource';
import { UserLog, Chain } from '../db/entity';
import { ChainOutput } from '../types/chain';
@Resolver()
export class AttackResolver {
  @Query(() => [String])
  async status(
    @Ctx() context: any): Promise<String[]> {
      const repository = AppDataSource.getRepository(UserLog);
      const count = await repository.count();
      console.log('COUNTED BATTLE : ', count);
      const userlog = new UserLog();
      userlog.timestamp = Math.floor(Math.random() * 1000000);
      userlog.comment = "Jurgen has a dog";
      await repository.insert(userlog);
      const all = await repository.find();
      return all.map(entry => entry.comment);
  }
}
export class ChainResolver {
  @Query(() => [ChainOutput])
  async chains(
    @Ctx() context: any): Promise<ChainOutput[]> {
      const repository = AppDataSource.getRepository(Chain);
      const allChains = await repository.find();
      return allChains.map(entry => new ChainOutput(entry));;
  }
}