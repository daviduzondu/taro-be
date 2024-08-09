import { ArrayNotEmpty, IsArray, IsUrl } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { _Venue } from '../../../db/generated/venue.entity';
import { _CreateVendorDto } from '../../../db/generated/create-vendor.dto';

export class CreateVenueDto extends _CreateVendorDto {
  @ApiProperty({ example: ['https://example.com/image.png'] })
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsUrl({}, { each: true }) // Apply IsUrl validation to each element in the array
  images: string[];
}

export class VenueResponsePayload extends PickType(_Venue, [
  'id',
  'images',
  'availability',
  'blacklisted',
  'location',
  'name',
  'pricing',
  'amenities',
  'ownerId',
]) {}
