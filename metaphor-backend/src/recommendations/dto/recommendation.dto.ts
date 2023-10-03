import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Recommendation {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	category: string;

	@ApiPropertyOptional()
	subCategory: string[];
}

export class CreateRecommendation {
	category: string;
	subCategory: string[];
	userId: number;
}

export class CreateRecommendations {
	@ApiProperty()
	recommendations: Recommendation[];
}
