import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CreateVenueDto, VenueResponsePayload } from './dto/venue.dto';
import { VenuesService } from './venues.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';
import { User } from '../../db/kysesly-types/kysesly';
import { UsersService } from '../users/users.service';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomResponse } from '../../utils/decorators/custom-swagger-response.decorator';
import {
  ResponseDtoWrapper,
  PaginatedResponseDto,
} from '../../utils/dto/wrappers.dto';

@ApiExtraModels(VenueResponsePayload)
@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(
    private readonly venuesService: VenuesService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Get a venue by id' })
  @CustomResponse(ResponseDtoWrapper, VenueResponsePayload, 200)
  @Get(':id')
  getVenue(@Param('id') id: string) {
    return this.venuesService.getVenue(id);
  }

  @ApiOperation({ summary: 'Get a venue owned by a user' })
  @Get('by/:userId')
  getUserVenues(
    @Param('userId') userId: string,
    @Query() pagination: PaginatedResponseDto,
  ) {
    const { page, limit } = pagination;
    return this.usersService.getUserVenues(userId, page, limit);
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
