export class CreateRentalDto {
  memberId: string;
  bookId: string;
  rentDate: Date;
  returnDate: Date;
}

export class ReturnRentalDto {
  returnDate: Date;
  late?: boolean; // optional to mark late returns
}
