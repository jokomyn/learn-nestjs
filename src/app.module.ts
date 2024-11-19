import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { MemberModule } from './member/member.module';
import { BookModule } from './book/book.module';
import { RentalModule } from './rental/rental.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { Book } from './entities/book.entities';
import { Member } from './entities/member.entities';
import { Rental } from './entities/rental.entities';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([Book, Member, Rental]),
    MemberModule, 
    BookModule, 
    RentalModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
