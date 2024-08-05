import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of the user to login',
    example: 'me@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user to login',
    example: 'aVeryStrongPassw0rD',
  })
  password: string;
}
