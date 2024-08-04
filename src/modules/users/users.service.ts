import { Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';
import { STATUS_CODES } from 'http';
import { User } from '../../db/types/types';

@Injectable()
export class UsersService {
  constructor(@InjectKysely() private readonly db: Database) {}

  async checkRecordExistence(entry, value: string) {
    const data = await this.db
      .selectFrom('User')
      .selectAll()
      .where(entry, '=', value)
      .execute();
    return data as User[];
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
