import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';
import { ExcludeSensitiveFields } from '../../utils/decorators/esf.decorator';
import { CustomException } from '../../exceptions/custom.exception';

@Injectable()
export class VenuesService {
  constructor(@InjectKysely() private db: Database) {}

  @ExcludeSensitiveFields()
  async createVenue(createVenueDto: CreateVenueDto, req) {
    const data = await this.db
      .insertInto('Venue')
      .values({ ...createVenueDto, ownerId: req.user.id as any })
      .returningAll()
      .execute();

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  async getUserVenues() {}

  async getVenue(id: string) {
    const data = await this.db
      .selectFrom('Venue')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow(() => {
        return new CustomException(
          `Venue with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      });

    return {
      message: 'Venue retrieved',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ExcludeSensitiveFields()
  async updateVenue(id: string, updateVenueDto: UpdateVenueDto) {
    const data = await this.db
      .updateTable('Venue')
      .set(updateVenueDto)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow(() => {
        return new CustomException(
          `Venue with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      });

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async deleteVenue(id: string) {
    await this.db
      .updateTable('Venue')
      .set({ isDeleted: true })
      .where('id', '=', id)
      .executeTakeFirstOrThrow(() => {
        return new CustomException(
          `Venue with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      });

    return;
  }
}
