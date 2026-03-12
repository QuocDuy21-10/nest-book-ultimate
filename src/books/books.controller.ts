import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new book',
    description:
      'This endpoint allows you to create a new book by providing the necessary details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The input data is invalid.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error. An unexpected error occurred.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The requested resource was not found.',
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all books',
    description: 'This endpoint returns a list of all books in the system.',
  })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a book by ID',
    description:
      'This endpoint allows you to retrieve the details of a specific book by its ID.',
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a book by ID',
    description:
      'This endpoint allows you to update the details of a specific book by its ID.',
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a book by ID',
    description:
      'This endpoint allows you to remove a specific book from the system by its ID.',
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
