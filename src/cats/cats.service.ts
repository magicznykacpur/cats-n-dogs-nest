import { Injectable } from '@nestjs/common';
import { db } from 'src/db/db-client';
import { cats } from 'src/db/schema/cats';
import { CatDto } from './dto/cat.dto';
import { eq } from 'drizzle-orm';
import { CreateCatDto } from './dto/create-cat.dto';
import { updateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  async getCat(id: string): Promise<CatDto> {
    const dbCats = await db.select().from(cats).where(eq(cats.id, id));

    return dbCats[0];
  }

  async getCats(): Promise<CatDto[]> {
    const dbCats = await db.select().from(cats);

    return dbCats;
  }

  async createCat(createCatDto: CreateCatDto): Promise<CatDto> {
    const cat = await db
      .insert(cats)
      .values({ ...createCatDto })
      .returning({
        id: cats.id,
        name: cats.name,
        age: cats.age,
        breed: cats.breed,
        created_at: cats.created_at,
        updated_at: cats.updated_at,
      });

    return cat[0];
  }

  async updateCat(id: string, updateCatDto: updateCatDto): Promise<CatDto> {
    const updatedCat = await db
      .update(cats)
      .set({ ...updateCatDto, updated_at: new Date() })
      .where(eq(cats.id, id))
      .returning({
        id: cats.id,
        name: cats.name,
        age: cats.age,
        breed: cats.breed,
        created_at: cats.created_at,
        updated_at: cats.updated_at,
      });

    return updatedCat[0];
  }

  async deleteCat(id: string): Promise<void> {
    await db.delete(cats).where(eq(cats.id, id));
  }
}
