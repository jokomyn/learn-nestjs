import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto, UpdateMemberDto } from 'src/dto/member.dto';
import { Member } from 'src/entities/member.entities';

@Injectable()
export class MemberService {
    constructor(private readonly em: EntityManager) {}

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        const member = this.em.create(Member, createMemberDto);
        await this.em.persistAndFlush(member);
        return member;
      }
    
      async findAll(): Promise<Member[]> {
        return this.em.find(Member, {});
      }
    
      async findOne(id: string): Promise<Member> {
        const member = await this.em.findOne(Member, { id });
        if (!member) throw new NotFoundException(`Member with ID ${id} not found`);
        return member;
      }
    
      async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
        const member = await this.findOne(id);
        this.em.assign(member, updateMemberDto);
        await this.em.persistAndFlush(member);
        return member;
      }
}
