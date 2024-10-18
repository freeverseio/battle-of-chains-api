import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { AppDataSource } from '../db/AppDataSource';
import { UserLog } from '../db/entity';
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