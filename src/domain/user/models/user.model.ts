/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Booking } from 'src/domain/booking/models/booking.model';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field((type) => [Booking])
  bookings: Booking[];
}
