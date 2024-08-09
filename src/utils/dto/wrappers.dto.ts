import { ApiProperty } from '@nestjs/swagger';

export class ResponseDtoWrapper {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 200 })
  statusCode: number;
}

export class PaginatedResponseDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The page number',
    minimum: 1,
  })
  page: number;

  @ApiProperty({
    type: Number,
    example: 10,
    maximum: 10,
    minimum: 1,
    required: false,
  })
  limit: number;
}
