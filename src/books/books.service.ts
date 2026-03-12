import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { seedBooks } from './seed';
import { faker } from '@faker-js/faker';

@Injectable()
export class BooksService {
  // private books: Book[] = [];
  private books: Map<string, Book> = new Map();
  private readonly logger = new Logger(BooksService.name);
  constructor(private configService: ConfigService) {
    const countBooks = configService.get<number>('COUNT_BOOKS') || 5;
    // this.books = seedBooks(countBooks);
    const seededBooks = seedBooks(countBooks);
    seededBooks.forEach((book) => this.books.set(book.id, book));
    this.logger.log(`Seeded ${this.books.size} books successfully.`);
  }
  create(createBookDto: CreateBookDto) {
    const newBook: Book = {
      id: faker.string.uuid(),
      ...createBookDto,
      createdAt: new Date().toISOString(),
    };
    // this.books.push(newBook);
    this.books.set(newBook.id, newBook);
    return newBook;
  }

  findAll() {
    // return this.books;
    // return Array.from(this.books.values());
    return [...this.books.values()];
  }

  findOne(id: string) {
    // const book = this.books.find((book) => book.id === id);
    const book = this.books.get(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const book = this.findOne(id);
    const updatedBook: Book = {
      ...book,
      ...updateBookDto,
      updatedAt: Date.now().toString(),
    };
    // const idx = this.books.findIndex((book) => book.id === id);
    // this.books[idx] = updatedBook;
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  remove(id: string) {
    // const idx = this.books.findIndex((book) => book.id === id);
    // if (idx === -1) throw new NotFoundException('Book not found');
    // this.books.splice(idx, 1);
    if (!this.books.has(id)) throw new NotFoundException('Book not found');
    this.books.delete(id);
    return { message: 'Book removed successfully' };
  }

  removeBulk(bookIds: string[]): { deleted: number; notFoundIds: string[] } {
    const notFoundIds: string[] = [];
    let deleted = 0;
    for (const id of bookIds) {
      if (this.books.has(id)) {
        this.books.delete(id);
        deleted++;
      } else {
        notFoundIds.push(id);
      }
    }
    return { deleted, notFoundIds };
  }

  removeAll(): { message: string; deleted: number } {
    const count = this.books.size;
    this.books.clear();
    return { message: 'All books removed successfully', deleted: count };
  }
}
