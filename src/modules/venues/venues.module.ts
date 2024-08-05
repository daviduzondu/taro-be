import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller';
import { VenuesService } from './venues.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [VenuesController],
  providers: [VenuesService, UsersService],
})
export class VenuesModule {}
