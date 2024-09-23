import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { ContractService } from '../services/ContractService';
import { Contract } from '../types/contract';
import { ContractWhereInput } from '../types';

@Resolver()
export class ContractResolver {
  @Query(() => [Contract])
  async contracts(
    @Arg('where', () => ContractWhereInput, { nullable: true }) where: ContractWhereInput,
    @Ctx() context: any): Promise<Contract[]> {
    const contractService = new ContractService(context);
    return contractService.getOwnershipContracts(where);
  }
}
