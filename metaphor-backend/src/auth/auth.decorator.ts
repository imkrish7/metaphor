import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { RequestUser } from './dto/requestUser.dto';

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): RequestUser => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);
