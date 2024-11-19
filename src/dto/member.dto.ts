export class CreateMemberDto {
  name: string;
  email: string;
  phone: string;
}

export class UpdateMemberDto {
  email?: string;
  phone?: string;
}
