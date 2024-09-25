import { Field, InputType } from 'type-graphql';
import { IsOptional } from 'class-validator';


@InputType()
export class CoordinatesInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  x?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  y?: string;
}
