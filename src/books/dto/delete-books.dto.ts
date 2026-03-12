import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class DeleteBooksDto {
  @ApiProperty({ example: ['uuid1', 'uuid2', 'uuid3'] })
  @IsArray({ message: 'bookIds must be an array of strings' })
  @IsString({ each: true, message: 'Each bookId must be a string' })
  bookIds: string[];
}
