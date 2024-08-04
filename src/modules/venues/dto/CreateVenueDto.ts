import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
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
  availability: boolean;

  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsUrl({}, { each: true }) // Apply IsUrl validation to each element in the array
  images: string[];
}
