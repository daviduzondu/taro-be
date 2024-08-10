import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';
import { ExcludeSensitiveFields } from '../../utils/decorators/esf.decorator';

@Injectable()
export class UsersService {
  constructor(@InjectKysely() private readonly db: Database) {}

  async checkRecordExistence(entry, value: string) {
    const data = await this.db
      .selectFrom('User')
      .selectAll()
      .where(entry, '=', value)
      .execute();
    return data;
  }

  @ExcludeSensitiveFields()
  async getUsers() {
    const data = await this.db.selectFrom('User').selectAll().execute();

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @ExcludeSensitiveFields()
  async getUserVenues(userId: string, page: number = 1, limit: number = 10) {
    const user = await this.checkRecordExistence('id', userId);
    if (![user])
      throw new NotFoundException({
        message: [`User with id ${userId} does not exist`],
        statusCode: HttpStatus.NOT_FOUND,
      });

    const data = await this.db
      .selectFrom('Venue')
      .selectAll()
      .where('ownerId', '=', userId)
      .limit(limit)
      .offset((page - 1) * 10)
      .execute();

    return {
      message: [`Venues owned by ${userId} retrieved successfully`],
      data: data.map((entry) => ({ ...entry, owner: user })),
      page,
    };
  }
}
