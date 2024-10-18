import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class UserOutput {
  @Field(() => String)
  address!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  homechain!: number;

  @Field(() => Int)
  joined_timestamp!: number;

  @Field(() => Int)
  score!: number;

  constructor(props: Partial<UserOutput>) {
    Object.assign(this, props);
  }
}
