import { ApiProperty } from '@nestjs/swagger';

class UserData {
  @ApiProperty({
    example: '04ce9c49-00bc-45e6-b739-16a012a0b60f',
  })
  id: string;

  @ApiProperty({
    example: 'thisisatestxxw@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'VENDOR',
  })
  role: string;

  @ApiProperty({
    example: 'David',
  })
  firstName: string;

  @ApiProperty({
    example: 'Uzondu',
  })
  lastName: string;

  @ApiProperty({
    example: '090143204138',
  })
  phone: string;

  @ApiProperty({
    example: false,
  })
  banned: boolean;

  @ApiProperty({
    example: null,
  })
  avatarUrl: string | null;
}

class loginUserData extends UserData {
  @ApiProperty({
    type: String,
    example: 'a.very.long.acces.token',
  })
  accessToken: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  expires: Date;
}

export class SuccessfulUserRegistration {
  @ApiProperty({
    example: 'success',
  })
  status: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    type: [UserData],
  })
  data: UserData[];
}

export class SuccessfulUserLogin {
  @ApiProperty({
    example: 'success',
  })
  status: string;

  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    type: loginUserData,
  })
  data: loginUserData;
}

export class GenericErrorResponse {
  @ApiProperty({
    type: String,
    example: 'error',
  })
  status: string;

  @ApiProperty({
    example: ['jwt malformed'],
    type: [String],
  })
  message: string[];
}
