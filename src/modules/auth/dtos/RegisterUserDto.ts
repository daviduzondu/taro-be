import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotIn,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Role } from '../../../db/types/enums';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: 5, minUppercase: 1 },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @IsNotIn(['ADMIN'], { message: 'Registering as an admin is not permitted' })
  @IsEnum(Role, {
    message: 'role must be on of the following values: USER or VENDOR',
  })
  @IsString()
  role: Role;
}
