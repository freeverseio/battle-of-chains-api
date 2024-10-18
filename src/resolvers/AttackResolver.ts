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
      console.log("AppDataSource.getRepository(Chain)... ");
      const repository = AppDataSource.getRepository(Chain);
      console.log("AppDataSource.getRepository(Chain)...DONE ");
      console.log("const count = await repository.count()... ");
      const count = await repository.count();
      console.log("const count = await repository.count()...DONE ", count);
      const allChains = await repository.find();
      const allChainsOutput = allChains.map(entry => new ChainOutput(entry));
      console.log(allChainsOutput);
      const chain = new ChainOutput({"chain_id": 2, "name": "Pol", "score": 4})
      console.log([chain]);
      // return [chain, chain];
      return allChains;
      // return [chain];
  }
}