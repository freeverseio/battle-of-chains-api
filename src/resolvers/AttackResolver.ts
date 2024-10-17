import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { Attack, AttackWhereInput } from '../types';
import { AttackService } from '../services/AttackService';
@Resolver()
export class AttackResolver {
  @Query(() => [Attack])
  async attacks(
    @Arg('where', () => AttackWhereInput, { nullable: true }) where: AttackWhereInput,
    @Ctx() context: any): Promise<Attack[]> {
    const attackService = new AttackService(context);
    return attackService.getAttacks(where);
  }
  @Query(() => [String])
  async status(
    @Ctx() context: any): Promise<String[]> {
    return ['JurgenSaidthis', 'JurgenDeniedThis']
  }
}