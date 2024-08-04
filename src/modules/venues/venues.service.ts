import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';

@Injectable()
export class VenuesService {
  constructor(@InjectKysely() private db: Database) {}

  async createVenue(createVenueDto) {
    const data = await this.db
      .insertInto('Venue')
      .values(createVenueDto)
      .returningAll()
      .execute();

    return {
      status: 'success',
      status_code: HttpStatus.CREATED,
      message: 'Created a new Venue',
      data,
    };
  }
}
