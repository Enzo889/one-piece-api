import { Injectable } from '@nestjs/common';
import { OpCharacters } from './interface/op-characters.interface';
import { InjectModel } from '@nestjs/mongoose';
import { OnePiece } from 'src/one-piece/entities/one-piece.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(OnePiece.name)
    private readonly OnepieceModel: Model<OnePiece>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.OnepieceModel.deleteMany({}); //delete all data
    const data = await this.http.get<OpCharacters[]>(
      'https://api.api-onepiece.com/v2/characters/en',
    );

    const OnePieceInsertData: { name: string; no: number }[] = [];
    const characters = data.slice(0, 88).map(({ name, id }) => ({
      name,
      no: id,
    }));

    for (const character of characters) {
      // await this.OnepieceModel.create(character);
      OnePieceInsertData.push(character);
    }

    await this.OnepieceModel.insertMany(OnePieceInsertData);

    return 'seed executed';
  }
}
