import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { request } from 'express';

@Controller('cats')
export class CatsController {
    @Get()
    FindAll(@Req() request: Request): string{
        return 'Find all cats'
    }

    @Get(':id')
    FindById(@Param() params:any):string{
        return params
    }

    @Post()
    create(): string {
        return 'this action add new cats';
    }
}
