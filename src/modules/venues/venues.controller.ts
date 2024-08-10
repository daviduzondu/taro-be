import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Query,
  Put,
  ParseUUIDPipe,
  HttpCode,
  Delete,
} from '@nestjs/common';
import {
  CreateVenueDto,
  UpdateVenueDto,
  VenueResponsePayload,
} from './dto/venue.dto';
import { VenuesService } from './venues.service';
import { AuthGuard } from '../../guards/auth.guard';
import { UsersService } from '../users/users.service';
import {
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomResponse } from '../../utils/decorators/custom-swagger-response.decorator';
import {
  ResponseDtoWrapper,
  PaginatedResponseDto,
} from '../../utils/dto/wrappers.dto';
import { RequireBodyPipe } from '../../pipes/require-body.pipe';
import { AdminGuard } from '../../guards/admin.guard';

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

  @ApiOperation({ summary: 'Add an event venue ' })
  @UseGuards(AuthGuard, AdminGuard)
  @Post('create')
  create(@Body() createVenueDto: CreateVenueDto, @Req() req) {
    return this.venuesService.createVenue(createVenueDto, req);
  }

  @ApiOperation({ summary: 'Update a event venue ' })
  @UseGuards(AuthGuard, AdminGuard)
  @Put('update/:id')
  @CustomResponse(ResponseDtoWrapper, VenueResponsePayload, 200)
  updateVenue(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(RequireBodyPipe) updateVenueDto: UpdateVenueDto,
  ) {
    return this.venuesService.updateVenue(id, updateVenueDto);
  }

  @ApiOperation({ summary: 'Delete a venue by ID' })
  @ApiNoContentResponse({
    description: 'No content, successful deletion',
  })
  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(204)
  @Delete('delete/:id')
  deleteVenue(@Param('id', ParseUUIDPipe) id: string) {
    return this.venuesService.deleteVenue(id);
  }
}
