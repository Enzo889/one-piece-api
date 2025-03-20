/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOnePieceDto } from './dto/create-one-piece.dto';
import { UpdateOnePieceDto } from './dto/update-one-piece.dto';
import { isValidObjectId, Model } from 'mongoose';
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

    try {
      const onepiece = await this.OnepieceModel.create(createOnePieceDto);
      return onepiece;
    } catch (error) {
      this.HandleException(error);
    }
  }

  findAll() {
    return `This action returns all onePiece`;
  }

  async findOne(term: string) {
    let onepiececharacter: OnePiece | null = null;

    if (!isNaN(+term)) {
      onepiececharacter = (await this.OnepieceModel.findOne({ no: term }))!;
    }

    //mongoid

    if (!onepiececharacter && isValidObjectId(term)) {
      onepiececharacter = await this.OnepieceModel.findById(term);
    }

    //name

    if (!onepiececharacter) {
      onepiececharacter = await this.OnepieceModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!onepiececharacter)
      throw new NotFoundException(
        `Character with id, name or no: ${term} not found`,
      );

    return onepiececharacter;
  }

  async update(term: string, updateOnePieceDto: UpdateOnePieceDto) {
    const onepiececharacter = await this.findOne(term);
    if (updateOnePieceDto.name)
      updateOnePieceDto.name = updateOnePieceDto.name.toLowerCase();

    try {
      await onepiececharacter?.updateOne(updateOnePieceDto);

      return { ...onepiececharacter?.toJSON(), ...updateOnePieceDto };
    } catch (error) {
      this.HandleException(error);
    }
  }

  async remove(id: string) {
    const onepiececharacter = await this.findOne(id);
    await onepiececharacter.deleteOne();
  }

  private HandleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `already exists in DB ${JSON.stringify(error.keyValue)}`,
      );
    } else {
      console.log(error);
      throw new InternalServerErrorException(
        'Cannot create OnePiece character in db',
      );
    }
  }
}
