import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
