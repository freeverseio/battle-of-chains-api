import { ObjectType, Field } from 'type-graphql';
import { Coordinates } from './coordinates';

@ObjectType()
export class Attack {
  @Field(() => String)
  from!: string;

  @Field(() => String)
  to!: string;

  @Field(() => String)
  tokenId!: string;

  @Field(() => Coordinates, { nullable: true })
  coordinates?: Coordinates;

  constructor(props: Partial<Attack>) {
    Object.assign(this, props);
  }
}

