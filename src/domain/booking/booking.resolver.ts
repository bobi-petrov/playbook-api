/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Booking } from './models/booking.model';
import { BookingService } from './booking.service';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  @Query((returns) => Booking)
  async booking(@Args('id', { type: () => Int }) id: number) {
    // todo: handle not found
    return this.bookingService.findOneById(id);
  }

  @Query((returns) => [Booking])
  async bookings() {
    return this.bookingService.findAll();
  }
}
