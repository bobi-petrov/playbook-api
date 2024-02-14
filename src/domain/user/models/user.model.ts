import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  //   @Field((type) => [Booking])
  //   bookings: Booking[];
}
