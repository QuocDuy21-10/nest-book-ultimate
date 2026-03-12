import { faker } from '@faker-js/faker';
import { Book } from './entities/book.entity';

export function seedBooks(count: number): Book[] {
  const books: Book[] = [];
  for (let i = 0; i < count; i++) {
    books.push({
      id: faker.string.uuid(),
      title: faker.word.words({ count: { min: 5, max: 10 } }),
      author: faker.person.fullName(),
      description: faker.lorem.paragraphs({ min: 1, max: 3 }),
      publishedAt: faker.date.past({ years: 20 }).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return books;
}
