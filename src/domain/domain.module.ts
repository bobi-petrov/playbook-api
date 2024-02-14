import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [UserModule, BookingModule],
})
export class DomainModule {}
