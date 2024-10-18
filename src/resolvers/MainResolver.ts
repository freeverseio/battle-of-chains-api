import { Resolver, Query, Ctx, Int } from 'type-graphql';
import { AppDataSource } from '../db/AppDataSource';
import { UserLog, Chain, User, Asset } from '../db/entity';
import { ChainOutput } from '../types/chain';
import { UserOutput } from '../types/user';
import { AssetOutput } from '../types/asset';
import { EventProcessor } from '../processor/process';
@Resolver()
export class AttackResolver {
  @Query(() => [String])
  async status(@Ctx() context: any): Promise<String[]> {
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
  async chains(@Ctx() context: any): Promise<ChainOutput[]> {
    const repository = AppDataSource.getRepository(Chain);
    const allChains = await repository.find();
    return allChains.map(entry => new ChainOutput(entry));;
  }
}
export class UserResolver {
  @Query(() => [UserOutput])
  async users(@Ctx() context: any): Promise<UserOutput[]> {
    const repository = AppDataSource.getRepository(User);
    const allUsers = await repository.find();
    return allUsers.map(entry => new UserOutput(entry));
  }
}
export class AssetResolver {
  @Query(() => [AssetOutput])
  async assets(@Ctx() context: any): Promise<AssetOutput[]> {
    const repository = AppDataSource.getRepository(Asset);
    const allAssets = await repository.find();
    return allAssets.map(entry => new AssetOutput(entry));;
  }
}
export class ReprocessResolver {
  @Query(() => Number)
  async reprocess(@Ctx() context: any): Promise<Number> {
    const eventProcessor = new EventProcessor();
    await eventProcessor.reprocess();
    const processedUsers = eventProcessor.getUsers();
    console.log(processedUsers);
    console.log('DONE');
    return processedUsers.length;
    // const allUsers = processedUsers.map(entry => new UserOutput(entry));
    // const repository = AppDataSource.getRepository(User);
    // const allAssets = await repository.find();
  }
}