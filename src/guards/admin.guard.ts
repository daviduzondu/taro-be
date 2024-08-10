import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../db/database';
import { CustomException } from '../exceptions/custom.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectKysely() private readonly db: Database) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().user;

    const user = await this.db
      .selectFrom('User')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow(
        () => new CustomException('User not found', 404),
      );

    if (user.role !== 'ADMIN')
      throw new ForbiddenException('Only admins can perform this action.');
    return true;
  }
}
