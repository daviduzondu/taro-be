import { IsEnum, IsNotIn, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../db/kysesly-types/enums';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { _CreateUserDto } from '../../../db/generated/create-user.dto';

export class RegisterUserDto extends PickType(_CreateUserDto, [
  'firstName',
  'lastName',
  'password',
  'phone',
  'email',
]) {
  @IsOptional()
  @ApiProperty({
    description: "The user's role. Must be either 'USER' or 'VENDOR'.",
    example: 'USER',
    enum: ['VENDOR', 'USER'],
    required: false,
  })
  @IsNotIn(['ADMIN'], { message: 'Registering as an admin is not permitted' })
  @IsEnum(Role, {
    message: 'Role must be one of the following values: USER or VENDOR',
  })
  @IsString()
  role: Role;
}

export class RegisterUserResponsePayload extends OmitType(_CreateUserDto, [
  'banned',
  'password',
]) {}
