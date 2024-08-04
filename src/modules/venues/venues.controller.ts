import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { CreateVenueDto } from './dto/CreateVenueDto';
import { VenuesService } from './venues.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Request } from 'express';
import { User } from '../../db/types/types';
import { ExcludeInterceptor } from '../../interceptors/exclude.interceptor';

@UseInterceptors(new ExcludeInterceptor())
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Get(':id')
  getVenue(@Param('id') id: string) {
    return this.venuesService.getVenue(id);
  }

  @UseGuards(AuthGuard)
  @Post()
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
