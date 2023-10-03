import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ResponseDto } from 'src/comman/dto/Response.dto';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { RequestUser } from './dto/requestUser.dto';

@Injectable()
export class AuthService {
	constructor(private db: PrismaService, private jwtService: JwtService) {}
	private HASH_SALT_ROUNDS = 10;
	async signup(user: CreateUserDto): Promise<ResponseDto> {
		const isUsernameAlreadExist = await this.db.user.findUnique({
			where: { username: user.username },
		});
		if (isUsernameAlreadExist) {
			throw new BadRequestException('Username already exist!');
		}

		const isEmailAlreadyExist = await this.db.user.findUnique({
			where: { email: user.email },
		});

		if (isEmailAlreadyExist) {
			throw new BadRequestException('Email Already exist!');
		}
		if (!user.name) {
			throw new BadRequestException('Name is required');
		}
		const hashedPassowrd = await this.hashPassword(user.password);
		if (hashedPassowrd) {
			user.password = hashedPassowrd;
			await this.db.user.create({
				data: user,
			});
			const fetchUser = await this.db.user.findUnique({
				where: { email: user.email },
			});
			const token = await this.generateAccessToken(fetchUser);
			return {
				success: true,
				data: {
					accessToken: token,
				},
			};
		} else {
			throw new InternalServerErrorException('Internal Server Error');
		}
	}

	async login(user: SigninDto): Promise<ResponseDto> {
		if (!user.email || !user.password) {
			throw new BadRequestException('email and password is wrong!');
		}

		const isUserExist = await this.db.user.findUnique({
			where: { email: user.email },
			include: {
				recomendations: true,
			},
		});
		if (!isUserExist) {
			throw new BadRequestException("User doesn't exist!");
		}

		const passwordMatch = await this.matchPassword(
			user.password,
			isUserExist.password,
		);
		if (!passwordMatch) {
			throw new UnauthorizedException('Password is wrong');
		}
		const token = await this.generateAccessToken(isUserExist);
		return {
			success: true,
			data: {
				accessToken: token,
				prefrences: isUserExist.recomendations.length > 0,
			},
		};
	}

	private async hashPassword(password: string): Promise<string> {
		try {
			const hashPassword = await bcrypt.hash(
				password,
				this.HASH_SALT_ROUNDS,
			);
			return hashPassword;
		} catch (error) {
			return null;
		}
	}
	private async matchPassword(
		password: string,
		hashedPassowrd: string,
	): Promise<boolean> {
		try {
			const isMatch = await bcrypt.compare(password, hashedPassowrd);
			return isMatch;
		} catch (error) {
			return false;
		}
	}

	private async generateAccessToken(user: RequestUser): Promise<string> {
		const payload = {
			username: user.username,
			email: user.email,
			name: user.name,
			id: user.id,
		};
		return await this.jwtService.signAsync(payload);
	}
}
