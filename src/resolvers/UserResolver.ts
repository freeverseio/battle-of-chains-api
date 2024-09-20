import { Resolver, Query, Ctx } from 'type-graphql';
import { UserService } from '../services/UserService';
import { User } from '../types/user';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() context: any): Promise<User[]> {
    const userService = new UserService(context);
    return userService.getUsers();
  }
}
