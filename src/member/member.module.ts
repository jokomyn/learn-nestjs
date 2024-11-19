import { Module } from '@nestjs/common';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';

@Module({
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule {}
