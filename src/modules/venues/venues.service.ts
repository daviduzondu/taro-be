import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';
import { CreateVenueDto } from './dto/venue.dto';
import { Request } from 'express';
import { User } from '../../db/kysesly-types/kysesly';
import { ExcludeSensitiveFields } from '../../utils/decorators/esf.decorator';

@Injectable()
export class VenuesService {
  constructor(@InjectKysely() private db: Database) {}

  @ExcludeSensitiveFields()
  async createVenue(
    createVenueDto: CreateVenueDto,
    req: Request & { user: User },
  ) {
    const data = await this.db
      .insertInto('Venue')
      .values({ ...createVenueDto, ownerId: req.user.id as any })
      .returningAll()
      .execute();

    return {
      status: 'success',
      statusCode: HttpStatus.CREATED,
      message: ['Created a new Venue'],
      data,
    };
  }

  async getUserVenues() {}

  async getVenue(id: string) {
    const data = await this.db
      .selectFrom('Venue')
      .selectAll()
      .where('id', '=', id)
      .execute();

    if (!data.length)
      throw new NotFoundException({
        status: 'error',
        message: `Venue with id ${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });

    return {
      status: 'success',
      message: 'Venue retrieved',
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
