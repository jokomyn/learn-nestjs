export class CreateBookDto {
  title: string;
  author: string;
  publisher: string;
  year: number;
  status: string; // 'available' or 'not available'
}

export class UpdateBookDto {
  title?: string;
  author?: string;
  publisher?: string;
  year?: number;
  status?: string;
}
