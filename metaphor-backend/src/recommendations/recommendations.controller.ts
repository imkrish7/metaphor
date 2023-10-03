import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendations } from './dto/recommendation.dto';
import { User } from 'src/auth/auth.decorator';
import { RequestUser } from 'src/auth/dto/requestUser.dto';
import { ResponseDto } from 'src/comman/dto/Response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchQuery } from './dto/search.dto';
import { SimilarDto } from './dto/similar.dto';

@Controller('recommendations')
export class RecommendationsController {
	constructor(private recommendationService: RecommendationsService) {}

	@Get('')
	@UseGuards(AuthGuard)
	@ApiOkResponse()
	async getRecommendations(@User() user: RequestUser): Promise<any> {
		return await this.recommendationService.getRecommendations(user);
	}

	@Post('create')
	@UseGuards(AuthGuard)
	@ApiOkResponse()
	async createRecommendationList(
		@Body() userRecommendations: CreateRecommendations,
		@User() user: RequestUser,
	): Promise<ResponseDto> {
		return await this.recommendationService.createRecommendation(
			user,
			userRecommendations.recommendations,
		);
	}

	@Post('search')
	@ApiOkResponse()
	async getQuery(@Body() search: SearchQuery): Promise<ResponseDto> {
		console.log(search);
		return await this.recommendationService.getSearch(search.query);
	}

	@Post('/similar')
	@ApiOkResponse()
	async getSimilarLink(@Body() similar: SimilarDto): Promise<ResponseDto> {
		return await this.recommendationService.getSimilarLink(similar.link);
	}

	@Get('contents/:id')
	@ApiOkResponse()
	async getContents(@Param() params: { id: string }): Promise<ResponseDto> {
		return await this.recommendationService.getContents(params.id);
	}
}
