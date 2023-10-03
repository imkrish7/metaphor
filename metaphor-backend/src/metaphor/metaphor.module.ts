import { Module } from '@nestjs/common';
import { MetaphorService } from './metaphor.service';

@Module({
	providers: [MetaphorService],
	exports: [MetaphorService],
})
export class MetaphorModule {}
