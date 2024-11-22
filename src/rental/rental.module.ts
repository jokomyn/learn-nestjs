import { Module } from '@nestjs/common';
import { RentalController } from './rental/rental.controller';
import { RentalService } from './rental/rental.service';

@Module({
  controllers: [RentalController],
  providers: [RentalService]
})
export class RentalModule {}
