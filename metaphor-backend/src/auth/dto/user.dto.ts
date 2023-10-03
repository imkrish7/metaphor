import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	id?: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	username: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ required: true })
	name: string;
}
