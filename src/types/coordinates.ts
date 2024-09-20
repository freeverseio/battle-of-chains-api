import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Coordinates {
  @Field(() => Number)
  x!: number;

  @Field(() => Number)
  y!: number;
}
