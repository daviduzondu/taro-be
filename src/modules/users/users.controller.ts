import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ExcludeInterceptor } from '../../interceptors/exclude.interceptor';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @UseInterceptors(new ExcludeInterceptor())
  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }
}
