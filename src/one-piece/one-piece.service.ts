import { Injectable } from '@nestjs/common';
import { CreateOnePieceDto } from './dto/create-one-piece.dto';
import { UpdateOnePieceDto } from './dto/update-one-piece.dto';

@Injectable()
export class OnePieceService {
  create(createOnePieceDto: CreateOnePieceDto) {
    return 'This action adds a new onePiece';
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
