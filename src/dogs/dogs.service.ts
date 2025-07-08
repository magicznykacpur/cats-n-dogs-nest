import { Injectable } from '@nestjs/common';
import { DogDto } from './dto/dog.dto';
import { db } from 'src/db/db-client';
import { eq } from 'drizzle-orm';
import { dogs } from 'src/db/schema/dogs';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  async findDogs(): Promise<DogDto[]> {
    const dbDogs = await db.select().from(dogs);

    return dbDogs;
  }

  async findDog(id: string): Promise<DogDto> {
    const dbDogs = await db.select().from(dogs).where(eq(dogs.id, id));

    return dbDogs[0];
  }

  async createDog(createDogDto: CreateDogDto): Promise<DogDto> {
    const dog = await db
      .insert(dogs)
      .values({ ...createDogDto })
      .returning({
        id: dogs.id,
        age: dogs.age,
        name: dogs.name,
        breed: dogs.breed,
        created_at: dogs.created_at,
        updated_at: dogs.updated_at,
      });

    return dog[0];
  }

  async updateDog(id: string, updateDogDto: UpdateDogDto): Promise<DogDto> {
    console.log(id, updateDogDto)
    const updatedDog = await db
      .update(dogs)
      .set({ ...updateDogDto, updated_at: new Date() })
      .where(eq(dogs.id, id))
      .returning({
        id: dogs.id,
        age: dogs.age,
        name: dogs.name,
        breed: dogs.breed,
        created_at: dogs.created_at,
        updated_at: dogs.updated_at,
      });

    return updatedDog[0];
  }

  async deleteDog(id: string): Promise<void> {
    await db.delete(dogs).where(eq(dogs.id, id));
  }
}
