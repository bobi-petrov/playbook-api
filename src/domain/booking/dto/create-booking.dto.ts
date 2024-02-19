/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookingDTO {
  @Field()
  timestamp: Date;

  @Field((type) => Int)
  durationMinutes: number;

  @Field()
  comment: string;

  @Field((type) => [Int])
  userIds: number[];
}
