import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { JwtStrategy } from './services/jwt.strategy';
import { LocalStrategy } from './services/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/domain/user/user.module';
import { CONSTANTS } from './constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: CONSTANTS.JWT_SECRET,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [PrismaService, JwtStrategy, LocalStrategy],
  exports: [JwtModule, PrismaService, JwtStrategy, LocalStrategy],
})
export class SharedModule {}
