import { Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';
import { STATUS_CODES } from 'http';

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

  async getUsers() {
    const data = await this.db.selectFrom('User').selectAll().execute();

    return {
      status: 'success',
      status_code: STATUS_CODES['200'],
      data,
    };
  }
}
