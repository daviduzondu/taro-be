import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class RequireBodyPipe implements PipeTransform {
  transform(value: any) {
    if (!Object.values(value).length) {
      throw new BadRequestException('Request body is required');
    }
    return value;
  }
}
