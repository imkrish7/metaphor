import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommanModule } from 'src/comman/comman.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './CONSTANTS';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
    }),
    CommanModule,
  ],
})
export class AuthModule {}
