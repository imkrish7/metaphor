import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { ResponseDto } from 'src/comman/dto/Response.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@ApiOkResponse({})
	async signup(@Body() user: CreateUserDto): Promise<ResponseDto> {
		return await this.authService.signup(user);
	}

	@Post('login')
	@ApiOkResponse({})
	async login(@Body() user: SigninDto): Promise<ResponseDto> {
		return await this.authService.login(user);
	}
}
