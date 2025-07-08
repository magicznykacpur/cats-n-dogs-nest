import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { updateCatDto } from './dto/update-cat.dto';
import { CatsResponse } from './responses/cats-response';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<CatsResponse> {
    const cats = await this.catsService.getCats();

    if (cats.length === 0) {
      return new CatsResponse('No cats available at this moment...');
    }

    return new CatsResponse(`Got you ${cats.length} cats`, cats);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CatsResponse> {
    const cat = await this.catsService.getCat(id);

    if (!cat) {
      return new CatsResponse(`No cat with id: ${id} was found...`);
    }

    return new CatsResponse("Here's your cat", cat);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<CatsResponse> {
    const cat = await this.catsService.createCat(createCatDto);

    if (!cat) {
      return new CatsResponse(
        'Something went wrong while creating your cat...',
      );
    }

    return new CatsResponse("Here's your new cat", cat);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: updateCatDto,
  ): Promise<CatsResponse> {
    const updatedCat = await this.catsService.updateCat(id, updateCatDto);

    if (!updatedCat) {
      return new CatsResponse(
        'Something went wrong while updating your cat...',
      );
    }

    return new CatsResponse('Heres your updated cat', updatedCat);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.catsService.deleteCat(id);
  }
}
