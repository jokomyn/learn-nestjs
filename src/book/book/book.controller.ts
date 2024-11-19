import { Body, Controller, Get, Header, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { BookRepository } from '../book-repository/book-repository';
import { MemberService } from '../member/member.service';
import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';

@Controller('/api/book')
export class BookController {

    constructor(
        private bookService: BookService,
        private connection: Connection,
        private mailService: MailService,
        private bookRepository: BookRepository,
        private memberService: MemberService,
    ){}

    @Get('/hello')
    async SayHello(@Query('name') name:string): Promise<string>{
        return this.bookService.sayHello(name)
    }

    @Get('/cek-connection')
    async GetConnection(): Promise<string>{
        this.bookRepository.save()
        this.mailService.send()

        console.info(this.memberService.getConnectionName())
        this.memberService.sendEmail()
        return this.connection.getName()
    }

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.createBook(createBookDto)
    }

    @Get('/sample')
    get(): string{
        return 'GET SAMPLE'
    }

    // @Get('/:id')
    // @Header('Content-Type', 'application/json')
    // @HttpCode(200)
    // getbyId(@Param('id') id: string){
    //     return {
    //         book_id:id
    //     }
    // }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.bookService.findById(id);
    }

    @Get()
    getAll(){
        return this.bookService.findAllBooks()
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }

    @Get()
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    getFilter(@Query('book-name') name: string,@Query('status') status: string): Record<string,string> {
        return {
            "book-name": name ?? 'Not found',
            "status": status ?? "Not set"
        }
    }
}
