import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Chain {
  @Field(() => Number)
  chainId!: number;

  @Field(() => Number)
  score!: number;

  @Field(() => String)
  name!: string;

  constructor(props: Partial<Chain>) {
    Object.assign(this, props);
  }
}
