import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class UserLogOutput {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  user_address!: string;

  @Field(() => Int)
  timestamp!: number;

  @Field(() => String)
  comment!: string;

  constructor(props: Partial<UserLogOutput>) {
    Object.assign(this, props);
  }
}
