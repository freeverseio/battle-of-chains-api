import { Field, InputType } from 'type-graphql';

@InputType()
export class ContractWhereInput {

  @Field({ nullable: true })
  chainId?: string; 
}