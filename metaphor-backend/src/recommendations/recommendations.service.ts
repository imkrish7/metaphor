import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { RequestUser } from 'src/auth/dto/requestUser.dto';
import { MetaphorService } from 'src/metaphor/metaphor.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecommendation, Recommendation } from './dto/recommendation.dto';
import { ResponseDto } from 'src/comman/dto/Response.dto';

@Injectable()
export class RecommendationsService {
	constructor(
		private metaphorService: MetaphorService,
		private db: PrismaService,
	) {}

	async getRecommendations(user: RequestUser): Promise<ResponseDto> {
		const recommendations = await this.db.recommendation.findMany({
			where: { userId: user.id },
		});
		let keywords = [];
		if (recommendations) {
			keywords = recommendations.map((recommendation) => {
				if (recommendation.subCategory.length > 0) {
					return recommendation.subCategory;
				} else {
					return recommendation.category;
				}
			});
			keywords = keywords.flat();
		}
		const userPreferences = {
			keywords,
		};
		const recommendation = await this.metaphorService.getRecommendation(
			userPreferences,
		);
		if (!recommendation) {
			throw new InternalServerErrorException(
				'Error in fetching recommendations',
			);
		}
		return {
			success: true,
			data: recommendation,
		};
	}

	async createRecommendation(
		user: RequestUser,
		userLikes: Recommendation[],
	): Promise<ResponseDto> {
		const isUserExists = await this.db.user.findUnique({
			where: { id: user.id },
		});

		if (!isUserExists) {
			throw new UnauthorizedException();
		}
		const recommendations: CreateRecommendation[] = userLikes.map(
			(userLike) => ({
				...userLike,
				userId: user.id,
			}),
		);
		const createRecommendation = await this.db.recommendation.createMany({
			data: recommendations,
			skipDuplicates: true,
		});

		if (!createRecommendation) {
			throw new InternalServerErrorException('');
		}

		return {
			success: true,
		};
	}

	async getSearch(query: string): Promise<ResponseDto> {
		if (query && query.length < 6) {
			throw new BadRequestException('Query String is too short');
		}

		const userPreferences = {
			keywords: [query],
		};

		const response = await this.metaphorService.getRecommendation(
			userPreferences,
		);
		if (!response) {
			throw new InternalServerErrorException();
		}
		return {
			success: true,
			data: response,
		};
	}

	async getSimilarLink(link: string): Promise<ResponseDto> {
		if (link.length < 6) {
			throw new BadRequestException('Link is too short');
		}
		const response = await this.metaphorService.getSimilarLink(link);
		if (!response) {
			throw new InternalServerErrorException();
		}
		return {
			success: true,
			data: response,
		};
	}

	async getContents(id: string): Promise<ResponseDto> {
		if (id.length < 1) {
			throw new BadRequestException('Id is invalid');
		}
		const response = await this.metaphorService.getContent(id);
		if (!response) {
			throw new InternalServerErrorException();
		}
		return {
			success: true,
			data: response,
		};
	}
}
