import { ObjectType, Field } from 'type-graphql';
import { Coordinates } from './coordinates';

@ObjectType()
export class User {
  @Field(() => String)
  address!: string;

  @Field(() => Coordinates, { nullable: true })
  coordinates?: Coordinates;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}