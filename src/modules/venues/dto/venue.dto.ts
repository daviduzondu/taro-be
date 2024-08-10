import { ArrayNotEmpty, IsArray, IsUrl } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { _Venue } from '../../../db/generated/venue.entity';
import { _UpdateVenueDto } from '../../../db/generated/update-venue.dto';
import { _CreateVenueDto } from '../../../db/generated/create-venue.dto';

export class CreateVenueDto extends _CreateVenueDto {
  @ApiProperty({ example: ['https://example.com/image.png'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];
}

export class UpdateVenueDto extends _UpdateVenueDto {
  @ApiProperty({ example: ['https://example.com/image.png'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];
}

export class VenueResponsePayload extends PickType(_Venue, [
  'id',
  'imageUrls',
  'availability',
  'blacklisted',
  'location',
  'name',
  'pricing',
  'amenities',
  'ownerId',
]) {}
