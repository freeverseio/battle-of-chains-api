import { Field, InputType } from 'type-graphql';
import { IsOptional } from 'class-validator';


@InputType()
export class CoordinatesInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  x?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  y?: number;
}
