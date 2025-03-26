import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { OpCharacters } from './interface/op-characters.interface';
import { InjectModel } from '@nestjs/mongoose';
import { OnePiece } from 'src/one-piece/entities/one-piece.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance;

  constructor(
    @InjectModel(OnePiece.name)
    private readonly OnepieceModel: Model<OnePiece>,
  ) {}
  async executeSeed() {
    const { data } = await axios.get<OpCharacters[]>(
      'https://api.api-onepiece.com/v2/characters/en',
    );

    const characters = data.slice(0, 10).map(({ name, id }) => ({
      name,
      no: id,
    }));

    for (const character of characters) {
      await this.OnepieceModel.create(character);
    }
    return 'seed executed';
  }
}
