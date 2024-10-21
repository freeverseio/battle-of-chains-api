import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class AttackOutput {
  @Field(() => Int)
  chain_id!: number;

  @Field(() => String)
  token_id!: string;

  @Field(() => String)
  type!: string;

  @Field(() => Int)
  creation_timestamp!: number;

  @Field(() => String)
  owner!: string;

  @Field(() => Int)
  xp!: number;

  @Field(() => Int)
  health!: number;

  constructor(props: Partial<AttackOutput>) {
    Object.assign(this, props);
  }
}
