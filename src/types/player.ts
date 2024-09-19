import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Player {
  @Field()
  address: string;


  constructor(address: string) {
    this.address = address;
  }
}