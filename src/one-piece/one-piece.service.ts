import { Injectable } from '@nestjs/common';
import { CreateOnePieceDto } from './dto/create-one-piece.dto';
import { UpdateOnePieceDto } from './dto/update-one-piece.dto';
import { Model } from 'mongoose';
import { OnePiece } from './entities/one-piece.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OnePieceService {
  constructor(
    @InjectModel(OnePiece.name)
    private readonly OnepieceModel: Model<OnePiece>,
  ) {}

  async create(createOnePieceDto: CreateOnePieceDto) {
    createOnePieceDto.name = createOnePieceDto.name.toLocaleLowerCase();

    const onepiece = await this.OnepieceModel.create(createOnePieceDto);
    return onepiece;
  }

  findAll() {
    return `This action returns all onePiece`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onePiece`;
  }

  update(id: number, updateOnePieceDto: UpdateOnePieceDto) {
    return `This action updates a #${id} onePiece`;
  }

  remove(id: number) {
    return `This action removes a #${id} onePiece`;
  }
}
