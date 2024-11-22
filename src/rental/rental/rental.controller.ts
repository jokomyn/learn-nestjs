import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { RentalService } from "./rental.service";
import { CreateRentalDto, ReturnRentalDto } from "src/dto/rental.dto";

@Controller("/api/rental")
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @Put(":id/return")
  returnRental(
    @Param("id") id: string,
    @Body() returnRentalDto: ReturnRentalDto,
  ) {
    return this.rentalService.returnBook(id, returnRentalDto);
  }
}
