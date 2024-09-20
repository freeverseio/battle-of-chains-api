import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => String)
  address!: string;

  @Field(() => Number)
  chainId?: number;

  @Field(() => Number)
  x?: number;

  @Field(() => Number)
  y?: number;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}