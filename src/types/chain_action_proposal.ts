import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class ChainActionProposalOutput {
  @Field(() => String)
  proposal_hash!: string;

  @Field(() => Int)
  source_chain_id!: number;

  @Field(() => Int)
  target_chain_id!: number;

  @Field(() => Int)
  type!: number;

  @Field(() => Int)
  attack_area!: number;

  @Field(() => String)
  attack_address!: string;

  @Field(() => Int)
  votes!: number;

  constructor(props: Partial<ChainActionProposalOutput>) {
    Object.assign(this, props);
  }
}
