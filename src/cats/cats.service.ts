import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db-client';
import { catsTable } from 'src/db/schema/cats';
import { CatDto } from './dto/cat.dto';
import { eq } from 'drizzle-orm';
import { CreateCatDto } from './dto/create-cat.dto';
import { updateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  async getCat(id: string): Promise<CatDto> {
    const cats = await db.select().from(catsTable).where(eq(catsTable.id, id));

    return cats[0];
  }

  async getCats(): Promise<CatDto[]> {
    const cats = await db.select().from(catsTable);

    return cats;
  }

  async createCat(createCatDto: CreateCatDto): Promise<CatDto> {
    const cat = await db
      .insert(catsTable)
      .values({ ...createCatDto })
      .returning({
        id: catsTable.id,
        name: catsTable.name,
        age: catsTable.age,
        breed: catsTable.breed,
        created_at: catsTable.created_at,
        updated_at: catsTable.updated_at,
      });

    return cat[0];
  }

  async updateCat(id: string, updateCatDto: updateCatDto): Promise<CatDto> {
    const updatedCat = await db
      .update(catsTable)
      .set({ ...updateCatDto, updated_at: new Date() })
      .where(eq(catsTable.id, id))
      .returning({
        id: catsTable.id,
        name: catsTable.name,
        age: catsTable.age,
        breed: catsTable.breed,
        created_at: catsTable.created_at,
        updated_at: catsTable.updated_at,
      });

    return updatedCat[0];
  }

  async deleteCat(id: string): Promise<void> {
    await db.delete(catsTable).where(eq(catsTable.id, id));
  }
}
