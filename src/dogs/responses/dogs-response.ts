import { DogDto } from '../dto/dog.dto';

export class DogsResponse {
  message: string;
  dogs: DogDto | DogDto[];

  constructor(message: string, dogs?: DogDto | DogDto[]) {
    this.message = message;

    if (dogs) {
      this.dogs = dogs;
    }
  }
}
