import { Injectable } from '@nestjs/common';
import { DogDto } from './dto/dog.dto';
import { db } from 'src/db/db-client';
import { eq } from 'drizzle-orm';
import { dogsTable } from 'src/db/schema/dogs';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  async findDogs(): Promise<DogDto[]> {
    const dogs = await db.select().from(dogsTable);

    return dogs;
  }

  async findDog(id: string): Promise<DogDto> {
    const dogs = await db.select().from(dogsTable).where(eq(dogsTable.id, id));

    return dogs[0];
  }

  async createDog(createDogDto: CreateDogDto): Promise<DogDto> {
    const dog = await db
      .insert(dogsTable)
      .values({ ...createDogDto })
      .returning({
        id: dogsTable.id,
        age: dogsTable.age,
        name: dogsTable.name,
        breed: dogsTable.breed,
        created_at: dogsTable.created_at,
        updated_at: dogsTable.updated_at,
      });

    return dog[0];
  }

  async updateDog(id: string, updateDogDto: UpdateDogDto): Promise<DogDto> {
    console.log(id, updateDogDto)
    const updatedDog = await db
      .update(dogsTable)
      .set({ ...updateDogDto, updated_at: new Date() })
      .where(eq(dogsTable.id, id))
      .returning({
        id: dogsTable.id,
        age: dogsTable.age,
        name: dogsTable.name,
        breed: dogsTable.breed,
        created_at: dogsTable.created_at,
        updated_at: dogsTable.updated_at,
      });

    return updatedDog[0];
  }

  async deleteDog(id: string): Promise<void> {
    await db.delete(dogsTable).where(eq(dogsTable.id, id));
  }
}
