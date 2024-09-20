import { Field, InputType } from 'type-graphql';
import { IsOptional, ValidateIf, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';


@InputType()
export class CoordinatesInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  x?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  y?: number;
}

@InputType()
export class AttackWhereInput {
  @Field(() => Number, { nullable: true })
  chainId?: number;

  @Field(() => CoordinatesInput, { nullable: true })
  coordinates?: CoordinatesInput;
}