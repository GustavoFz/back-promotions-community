import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipeIgnoreNull implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      return;
    }
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
