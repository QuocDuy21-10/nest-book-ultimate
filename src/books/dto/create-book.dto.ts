import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'The Great Gatsby',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    example: 'A novel written by F. Scott Fitzgerald',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    example: 'F. Scott Fitzgerald',
  })
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  author: string;

  @ApiProperty({
    example: '1925-04-10',
  })
  @IsString({ message: 'Published date must be a string' })
  @IsOptional()
  publishedAt?: string;
}
