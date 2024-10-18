import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class AssetOutput {
  @Field(() => Int)
  chain_id!: number;

  @Field(() => String)
  token_id!: string;

  @Field(() => String)
  type!: string;

  @Field(() => Int)
  joined_timestamp!: number;

  @Field(() => String)
  owner!: string;

  @Field(() => Int)
  xp!: number;

  @Field(() => Int)
  health!: number;

  constructor(props: Partial<AssetOutput>) {
    Object.assign(this, props);
  }
}
