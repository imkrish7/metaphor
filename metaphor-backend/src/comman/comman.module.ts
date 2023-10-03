import { Module } from '@nestjs/common';
import { ResponseDto } from './dto/Response.dto';

@Module({
  providers: [ResponseDto],
  exports: [ResponseDto],
})
export class CommanModule {}
