import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Coordinates {
  @Field(() => String)
  x!: string;

  @Field(() => String)
  y!: string;
}
