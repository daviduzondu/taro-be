import {
  Injectable,
  ConflictException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { Database } from '../../db/database';
import { RegisterUserDto } from './dtos/RegisterUserDto';
import { Role } from '../../db/types/enums';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/loginUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectKysely() private readonly db: Database,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    const [userExists] = await this.userService.checkRecordExistence(
      'email',
      registerUserDto.email,
    );

    if (userExists)
      throw new ConflictException({
        status: 'error',
        statusCode: HttpStatus.CONFLICT,
        message: 'A user with this email already exists.',
      });

    Object.assign(registerUserDto, {
      password: await this.hashPassword(registerUserDto.password),
      role:
        registerUserDto.email === process.env.SUPER_ADMIN_EMAIL
          ? Role.ADMIN
          : registerUserDto.role,
    });

    const insertOperationResponse = await this.db
      .insertInto('User')
      .values(registerUserDto)
      .returningAll()
      .execute();

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      data: insertOperationResponse,
    };
  }

  async loginWithEmailAndPassword(loginUserDto: LoginUserDto) {
    const [user] = await this.userService.checkRecordExistence(
      'email',
      loginUserDto.email,
    );

    if (!user)
      throw new NotFoundException({
        status: 'error',
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User does not exist',
      });

    if (!(await this.verifyPassword(loginUserDto.password, user.password)))
      throw new BadRequestException({
        status: 'error',
        message: 'Incorrect email or password',
        statusCode: HttpStatus.BAD_REQUEST,
      });

    const token = this.jwtService.sign(user, {
      expiresIn: '40m',
      secret: process.env.JWT_SECRET,
    });
    return {
      status: 'success',
      message: 'Login Successful',
      data: {
        accessToken: token,
        expires: new Date(Date.now() + 40 * 60 * 1000),
        ...user,
      },
    };
  }

  private async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
}
