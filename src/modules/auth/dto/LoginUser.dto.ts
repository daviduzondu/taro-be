import { ApiProperty, PickType } from '@nestjs/swagger';
import { _CreateUserDto } from '../../../db/generated/create-user.dto';
import { _User } from '../../../db/generated/user.entity';

export class LoginUserDto extends PickType(_CreateUserDto, [
  'email',
  'password',
]) {}

export class LoginUserResponsePayload extends PickType(_User, [
  'id',
  'firstName',
  'lastName',
  'email',
  'role',
  'avatarUrl',
  'banned',
]) {
  @ApiProperty({ type: 'string', example: 'a very long access token' })
  accessToken: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  expires: Date;
}
