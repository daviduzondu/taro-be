import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/RegisterUserDto';
import { ExcludeInterceptor } from '../../interceptors/exclude.interceptor';
import { LoginUserDto } from './dtos/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new ExcludeInterceptor(['role']))
  @Post('register')
  registerWithEmailAndPassword(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.createUser(registerUserDto);
  }

  @UseInterceptors(new ExcludeInterceptor(['role']))
  @Post('login')
  loginWithEmailAndPassword(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginWithEmailAndPassword(loginUserDto);
  }
}
