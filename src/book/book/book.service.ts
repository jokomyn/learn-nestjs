import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';
import { Book } from 'src/entities/book.entities';

@Injectable()
export class BookService {
    constructor(
        private readonly em: EntityManager,
    ){}
    sayHello(name:string): string {
        return `Hello ${name}`
    }

    async findAllBooks(): Promise<Book[]> {
        return this.em.find(Book, {});
    }

    async findById(id): Promise<Book>{
        console.info(id)
        const book = this.em.findOne(Book, {id})
        if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
        return book;
    }

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.em.create(Book, createBookDto);
        await this.em.persistAndFlush(book);
        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.findById(id);
        this.em.assign(book, updateBookDto);
        await this.em.persistAndFlush(book);
        return book;
    }

}
