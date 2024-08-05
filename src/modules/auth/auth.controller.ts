import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  GenericErrorResponse,
  SuccessfulUserLogin,
  SuccessfulUserRegistration,
} from '../../types/responses';
import {
  _ApiResponse,
  _BadRequestResponse,
  _InternalServerErrorResponse,
} from '../../utils/decorators/responses.decorator';

@ApiTags('Auth')
@ApiExtraModels(GenericErrorResponse)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @_ApiResponse(201, 'User registration successful', SuccessfulUserRegistration)
  @_BadRequestResponse()
  @_InternalServerErrorResponse()
  @Post('register')
  registerWithEmailAndPassword(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.createUser(registerUserDto);
  }

  @ApiOperation({
    summary: 'Authenticate a user with their email and password',
  })
  @ApiBody({ type: LoginUserDto })
  @_ApiResponse(200, 'Authentication successful', SuccessfulUserLogin)
  @_BadRequestResponse()
  @_InternalServerErrorResponse()
  @Post('login')
  loginWithEmailAndPassword(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.status(200);
    return this.authService.loginWithEmailAndPassword(loginUserDto);
  }
}
