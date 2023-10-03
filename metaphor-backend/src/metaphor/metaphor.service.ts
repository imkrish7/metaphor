import { Injectable } from '@nestjs/common';
import Metaphor, {
	Result,
	SearchResponse,
	SearchOptions,
	GetContentsResponse,
} from 'metaphor-node';
import { RecommendationPreferences } from './dto/recommendation.dto';

@Injectable()
export class MetaphorService {
	metaphorAPIKey: string;
	metaphor: Metaphor;
	searchOptions: SearchOptions;

	constructor() {
		this.metaphorAPIKey = process.env.METAPHOR_API;
		this.metaphor = new Metaphor(this.metaphorAPIKey);
		this.searchOptions = {
			numResults: 20,
		};
	}

	async getRecommendation(
		userPreferences: RecommendationPreferences,
	): Promise<Result[]> {
		try {
			const response: SearchResponse = await this.metaphor.search(
				userPreferences.keywords.join(' '),
				{
					useAutoprompt: true,
				},
			);
			const searchResults: Result[] = response.results;
			const recommendation: Result[] = searchResults.sort(
				(a, b) => a.score - b.score,
			);

			return recommendation;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async getSimilarLink(link: string): Promise<Result[]> {
		try {
			const response: SearchResponse = await this.metaphor.findSimilar(
				link,
			);
			const searchResults: Result[] = response.results;
			const similars: Result[] = searchResults.sort(
				(a, b) => a.score - b.score,
			);
			return similars;
		} catch (error) {
			return null;
		}
	}
	async getContent(id: string): Promise<Result> {
		try {
			const response: GetContentsResponse =
				await this.metaphor.getContents([id]);
			return response.contents[0];
		} catch (error) {
			return null;
		}
	}
}
