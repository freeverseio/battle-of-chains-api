import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class ChainOutput {
  @Field(() => Int)
  chain_id!: number;

  @Field(() => Int)
  score!: number;

  @Field(() => String)
  name!: string;

  constructor(props: Partial<ChainOutput>) {
    Object.assign(this, props);
  }
}
