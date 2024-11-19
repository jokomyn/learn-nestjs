import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { Rental } from './rental.entities';
import { v4 } from 'uuid';

@Entity()
export class Member {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4(); // Auto-generate UUID

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  phone!: string;

  @Property()
  joinDate!: Date;

  @OneToMany(() => Rental, (rental) => rental.member)
  rentals = new Array<Rental>();
}
