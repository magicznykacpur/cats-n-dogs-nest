import { CatDto } from '../dto/cat.dto';

export class CatsResponse {
  message: string;
  cats: CatDto[] | CatDto;

  constructor(message: string, cats?: CatDto | CatDto[]) {
    this.message = message;

    if (cats) {
      this.cats = cats;
    }
  }
}
