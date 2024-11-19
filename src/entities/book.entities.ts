import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { Rental } from './rental.entities';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Book {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4(); // Auto-generate UUID

  @Property()
  title!: string;

  @Property()
  author!: string;

  @Property()
  publisher!: string;

  @Property()
  year!: number;

  @Property()
  status!: string;

  @OneToMany(() => Rental, (rental) => rental.book)
  rentals = new Array<Rental>();
}