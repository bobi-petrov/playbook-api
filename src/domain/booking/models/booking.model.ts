/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/domain/user/models/user.model';

@ObjectType({ description: 'booking' })
export class Booking {
  @Field((type) => ID)
  id: number;

  @Field()
  timestamp: Date;

  @Field((type) => Int)
  durationMinutes: number;

  @Field()
  comment: string;

  @Field((type) => [User])
  users: User[];
}
