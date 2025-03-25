import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { OpCharacters } from './interface/op-characters.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance;
  async executeSeed() {
    const { data } = await axios.get<OpCharacters[]>(
      'https://api.api-onepiece.com/v2/characters/en',
    );

    const characters = data.slice(0, 10).map(({ name, id }) => ({
      name,
      id,
    }));

    return characters;
  }
}
