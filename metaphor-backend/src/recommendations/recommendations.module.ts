import { Module } from '@nestjs/common';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { MetaphorModule } from 'src/metaphor/metaphor.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [RecommendationsController],
	providers: [RecommendationsService],
	imports: [MetaphorModule, PrismaModule],
})
export class RecommendationsModule {}
