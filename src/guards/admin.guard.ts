import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../db/database';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectKysely() private readonly db: Database) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().user;

    const [user] = await this.db
      .selectFrom('User')
      .selectAll()
      .where('id', '=', id)
      .execute();

    if (user.role !== 'ADMIN')
      throw new ForbiddenException('Only admins can perform this action.');
    return true;
  }
}
