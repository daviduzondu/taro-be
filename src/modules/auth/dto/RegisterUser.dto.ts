import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Role } from '../../../db/types/enums';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: "The user's first name",
    example: 'Mark',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "The user's last name",
    example: 'Larry',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "The user's phone number",
    example: '+1234567890',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: "The user's email address",
    example: 'mark.larry@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The user's password",
    example: 'StrongP@ssw0rd!',
    required: true,
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

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
