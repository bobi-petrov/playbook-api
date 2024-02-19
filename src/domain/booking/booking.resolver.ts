/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Booking } from './models/booking.model';
import { BookingService } from './booking.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/models/user.model';

@Resolver((of) => Booking)
export class BookingResolver {
  constructor(private bookingService: BookingService) {}

  @Query((returns) => Booking)
  @UseGuards(JwtGuard)
  async booking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.findOneById(id);
  }

  @Query((returns) => [Booking])
  @UseGuards(JwtGuard)
  async bookings() {
    return this.bookingService.findAll();
  }

  @Mutation((returns) => Booking)
  @UseGuards(JwtGuard)
  async createBooking(
    @Args('createBookingDTO') createBookingDTO: CreateBookingDTO,
    @CurrentUser() user: User,
  ) {
    return await this.bookingService.createBooking(
      createBookingDTO,
      user.email,
    );
  }
}
