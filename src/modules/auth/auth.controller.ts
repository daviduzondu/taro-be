import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterUserDto,
  RegisterUserResponsePayload,
} from './dto/RegisterUser.dto';
import { LoginUserDto, LoginUserResponsePayload } from './dto/LoginUser.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomResponse } from '../../utils/decorators/custom-swagger-response.decorator';
import { ResponseDtoWrapper } from '../../utils/dto/wrappers.dto';

@ApiTags('Auth')
@ApiExtraModels(
  LoginUserResponsePayload,
  ResponseDtoWrapper,
  RegisterUserResponsePayload,
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CustomResponse(
    ResponseDtoWrapper,
    RegisterUserResponsePayload,
    HttpStatus.OK,
  )
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @Post('register')
  registerWithEmailAndPassword(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.createUser(registerUserDto);
  }

  @CustomResponse(ResponseDtoWrapper, LoginUserResponsePayload, HttpStatus.OK)
  @Post('login')
  @HttpCode(200)
  loginWithEmailAndPassword(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginWithEmailAndPassword(loginUserDto);
  }
}
