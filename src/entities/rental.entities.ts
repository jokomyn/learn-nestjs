import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Member } from './member.entities';
import { Book } from './book.entities';
import { v4 } from 'uuid';

@Entity()
export class Rental {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  rentDate!: Date;

  @Property({ nullable: true })
  returnDate?: Date;

  @Property()
  status!: string;

  @ManyToOne(() => Member)
  member!: Member;

  @ManyToOne(() => Book)
  book!: Book;
}
