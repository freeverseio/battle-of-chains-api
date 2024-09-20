import { Field, InputType } from 'type-graphql';

@InputType()
export class UserWhereInput {

  @Field({ nullable: true })
  address?: string;

 
}