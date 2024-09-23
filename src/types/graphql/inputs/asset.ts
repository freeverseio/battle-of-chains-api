import { Field, InputType } from 'type-graphql';
import { CoordinatesInput } from './coordinates';

@InputType()
export class AssetWhereInput {
  @Field(() => Number, { nullable: true })
  chainId?: number;

  @Field(() => String, { nullable: true })
  tokenId?: string;

  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => String, { nullable: true })
  owner?: string;

  @Field(() => CoordinatesInput, { nullable: true })
  coordinates?: CoordinatesInput;
}