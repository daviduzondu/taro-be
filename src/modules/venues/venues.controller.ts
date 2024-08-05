import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { CreateVenueDto } from './dto/CreateVenueDto';
import { VenuesService } from './venues.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';
import { User } from '../../db/types/kysesly';
import { UsersService } from '../users/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(
    private readonly venuesService: VenuesService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Get a venue by id' })
  @Get(':id')
  getVenue(@Param('id') id: string) {
    return this.venuesService.getVenue(id);
  }

  @Get('by/:userId')
  getUserVenues(@Param('userId') userId: string) {
    return this.usersService.getUserVenues(userId);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(
    @Body() createVenueDto: CreateVenueDto,
    @Req() req: Request & { user: User },
  ) {
    return this.venuesService.createVenue(
      createVenueDto as CreateVenueDto,
      req,
    );
  }
}
