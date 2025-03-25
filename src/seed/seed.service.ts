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

    data.forEach(({ name, id }) => {
      console.log(`Name: ${name} ID: ${id}`);
    });

    return data[0].name;
  }
}
