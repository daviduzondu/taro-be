import { ColumnType } from 'kysely';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  @IsInt()
  capacity: number;

  @IsArray()
  amenities: string[];

  @IsNumber()
  pricing: number;

  @IsBoolean()
  availability: ColumnType<false, false, false> | ColumnType<true, true, true>;

  @IsUUID()
  ownerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageUrl)
  images: ImageUrl[];
}

class ImageUrl {
  @IsString()
  @IsUrl()
  url: string;
}
