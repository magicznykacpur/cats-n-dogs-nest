import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResponse } from './responses/dogs-response';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  async findDogs(): Promise<DogsResponse> {
    const dogs = await this.dogsService.findDogs();

    if (dogs.length === 0) {
      return new DogsResponse('There are no dogs at this moment...');
    }

    return new DogsResponse(
      `We found ${dogs.length} dogs, here they are`,
      dogs,
    );
  }

  @Get(':id')
  async findDog(@Param('id') id: string): Promise<DogsResponse> {
    const dog = await this.dogsService.findDog(id);

    if (!dog) {
      return new DogsResponse(`Couldnt find a dog with id: ${id}`);
    }

    return new DogsResponse('Heres your dog', dog);
  }

  @Post()
  async createDog(@Body() createDogDto: CreateDogDto) {
    const dog = await this.dogsService.createDog(createDogDto);

    if (!dog) {
      return new DogsResponse('We couldnt create your dog...');
    }

    return new DogsResponse('Your new dog looks like this', dog);
  }

  @Patch(':id')
  async updateDog(
    @Param('id') id: string,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    const updatedDog = await this.dogsService.updateDog(id, updateDogDto);

    if (!updatedDog) {
      return new DogsResponse('We couldnt update your dog...');
    }

    return new DogsResponse("Here's your updated dog", updatedDog);
  }

  @Delete(':id')
  async deleteDog(@Param('id') id: string): Promise<DogsResponse> {
    await this.dogsService.deleteDog(id);

    return new DogsResponse(`The dog with id: ${id} was deleted`);
  }
}
