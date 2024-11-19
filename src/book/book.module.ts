import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { Connection, createConnection, MySQLConnection, PostgreSQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { BookRepository, createBookRepository } from './book-repository/book-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BookController],
  providers: [BookService, 
    {
      provide: Connection,
      // useClass: process.env.DATABASE === 'pg' ? PostgreSQLConnection: MySQLConnection
      useFactory: createConnection,
      inject: [ConfigService]
    }, {
      provide:MailService,
      useValue: mailService
    }, {
      provide: BookRepository,
      useFactory: createBookRepository,
      inject:[Connection]
    }, MemberService,
  ]
})
export class BookModule {}
