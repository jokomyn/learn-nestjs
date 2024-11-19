import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

export class BookRepository {
    connection: Connection

    save(){
        console.info('save user with connection: ' + this.connection.getName());
        
    }
}

export function createBookRepository(connection:Connection): BookRepository {
    const repository = new BookRepository
    repository.connection = connection

    return repository
}
