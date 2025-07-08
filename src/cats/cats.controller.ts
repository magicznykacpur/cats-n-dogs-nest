import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns ${id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto)
    return 'This action creates a cat';
  }
}
