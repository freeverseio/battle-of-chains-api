import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { UserService } from '../services/UserService';
import { User } from '../types/user';
import { UserWhereInput } from '../types';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(
    @Arg('where', () => UserWhereInput, { nullable: true }) where: UserWhereInput,
    @Ctx() context: any): Promise<User[]> {
    const userService = new UserService(context);
    return userService.getUsers(where);
  }
}
