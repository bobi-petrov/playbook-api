import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';

import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SharedModule, UserModule],
  providers: [BookingService, BookingResolver],
})
export class BookingModule {}
