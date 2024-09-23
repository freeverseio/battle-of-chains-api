import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Contract {
  @Field(() => Number, { nullable: false })
  chainId!: number;

  @Field(() => String, { nullable: false })
  address!: string;

  constructor(props: Partial<Contract>) {
    Object.assign(this, props);
  }
}
