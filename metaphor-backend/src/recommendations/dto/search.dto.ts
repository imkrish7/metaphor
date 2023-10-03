import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchQuery {
	@IsString()
	@ApiProperty()
	query: string;
}
