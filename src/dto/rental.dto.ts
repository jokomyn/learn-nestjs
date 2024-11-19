export class CreateRentalDto {
  memberId: number;
  bookId: number;
  rentDate: Date;
  returnDate: Date;
}

export class ReturnRentalDto {
  returnDate: Date;
  late?: boolean; // optional to mark late returns
}
