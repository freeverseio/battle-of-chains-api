import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Contract {
  @Field(() => String, { nullable: false })
  chainId!: string;

  @Field(() => String, { nullable: false })
  address!: string;

  constructor(props: Partial<Contract>) {
    Object.assign(this, props);
  }
}
