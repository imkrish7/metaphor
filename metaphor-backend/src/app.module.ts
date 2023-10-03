import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommanModule } from './comman/comman.module';
import { MetaphorModule } from './metaphor/metaphor.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [AuthModule, PrismaModule, CommanModule, MetaphorModule, RecommendationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
