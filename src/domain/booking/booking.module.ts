import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';

import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';

@Module({
  imports: [SharedModule],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
