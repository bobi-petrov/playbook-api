import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SharedModule } from 'src/shared/shared.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [SharedModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
