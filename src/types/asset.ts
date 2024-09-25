import { ObjectType, Field } from 'type-graphql';
import { Coordinates } from './coordinates';

@ObjectType()
export class Asset {

  @Field(() => Number, { nullable: true })
  type!: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  chainId?: number;

  @Field(() => String, { nullable: true })
  image!: string;

  @Field(() => String, { nullable: true })
  description?: string;
  
  @Field(() => String, { nullable: false })
  tokenId!: string;

  @Field(() => Coordinates, { nullable: true })
  coordinates?: Coordinates;

  @Field(() => [AssetAttributes], { nullable: true })
  attributes?: AssetAttributes[];

  constructor(props: Partial<Asset>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class AssetAttributes {
  @Field(() => String)
  trait_type!: string;

  @Field(() => String)
  value!: string;
}

export enum AssetType {
  ARTIFACT = 1,
  CHARACTER = 2,
  FACTORY = 3,
}