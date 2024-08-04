import { Injectable } from '@nestjs/common';
import { Database } from '../database';
import { DB } from '../types/types';
import { InsertExpression } from 'kysely/dist/cjs/parser/insert-values-parser';
import { ComparisonOperator, ReferenceExpression } from 'kysely';
import { ExtractTableAlias } from 'kysely/dist/cjs/parser/table-parser';
import { UpdateObjectExpression } from 'kysely/dist/cjs/parser/update-set-parser';
import { InjectKysely } from 'nestjs-kysely';

@Injectable()
export class Repository<T extends keyof DB> {
  constructor(
    private readonly table: T,
    @InjectKysely() private readonly db?: Database,
  ) {}

  async insertOne(value: InsertExpression<DB, T>) {
    return await this.db
      .insertInto(this.table)
      .values(value)
      .returningAll()
      .execute();
  }

  async findOne(
    lhs: ReferenceExpression<DB, ExtractTableAlias<DB, T>>,
    op: ComparisonOperator,
    rhs: any,
  ) {
    return this.db
      .selectFrom(this.table)
      .where(lhs, op, rhs)
      .executeTakeFirst();
  }

  async getAll() {
    // console.log(this.db);
    return this.db.selectFrom(this.table).selectAll().execute();
  }

  async updateOne(
    id: string,
    value: UpdateObjectExpression<
      DB,
      ExtractTableAlias<DB, T>,
      ExtractTableAlias<DB, T>
    >,
    [lhs, op, rhs]: [
      ReferenceExpression<DB, ExtractTableAlias<DB, T>>,
      ComparisonOperator,
      any,
    ],
  ): Promise<void> {
    await this.db
      .updateTable(this.table)
      .set(value)
      .where(lhs, op, rhs)
      .execute();
  }

  async deleteOne(
    lhs: ReferenceExpression<DB, ExtractTableAlias<DB, T>>,
    op: ComparisonOperator,
    rhs: any,
  ): Promise<void> {
    await this.db.deleteFrom(this.table).where(lhs, op, rhs).execute();
  }
}
