import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto, ReturnRentalDto } from 'src/dto/rental.dto';
import { Book } from 'src/entities/book.entities';
import { Member } from 'src/entities/member.entities';
import { Rental } from 'src/entities/rental.entities';

@Injectable()
export class RentalService {
    constructor(private readonly em: EntityManager) {}

    async create(createRentalDto: CreateRentalDto): Promise<Rental> {
        const { memberId, bookId, rentDate, returnDate } = createRentalDto;
        const member = await this.em.findOne(Member, { id: memberId });
        const book = await this.em.findOne(Book, { id: bookId });
    
        if (!member) throw new NotFoundException(`Member with ID ${memberId} not found`);
        if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);
        if (book.status !== 'available') throw new BadRequestException('Book is not available');
    
        book.status = 'not available';
    
        const rental = this.em.create(Rental, { member, book, rentDate, returnDate });
        await this.em.persistAndFlush([rental, book]);
    
        return rental;
      }
      async returnBook(id: string, returnRentalDto: ReturnRentalDto): Promise<Rental> {
        const rental = await this.em.findOne(Rental, { id }, { populate: ['book'] });
        if (!rental) throw new NotFoundException(`Rental with ID ${id} not found`);
    
        rental.returnDate = returnRentalDto.returnDate;
        rental.book.status = 'available';
    
        await this.em.persistAndFlush([rental, rental.book]);
    
        return rental;
      }

      async findAll(): Promise<Rental[]> {
        return this.em.find(Rental, {}, { populate: ['member', 'book'] });
      }
}
