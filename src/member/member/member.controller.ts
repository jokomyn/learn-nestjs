import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { MemberService } from "./member.service";
import { CreateMemberDto, UpdateMemberDto } from "src/dto/member.dto";

@Controller("/api/member")
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    // return 'GET'
    return this.memberService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.memberService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(id, updateMemberDto);
  }
}
