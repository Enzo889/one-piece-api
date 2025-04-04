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
import { paginatinoDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OnePieceService {
  private defaultlimit: number;
  constructor(
    @InjectModel(OnePiece.name)
    private readonly OnepieceModel: Model<OnePiece>,
    private readonly configService: ConfigService,
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

  findAll(paginatinoDto: paginatinoDto) {
    this.defaultlimit = this.configService.get<number>('limit') || 10;
    const { limit = this.defaultlimit, offset = 5 } = paginatinoDto;
    return this.OnepieceModel.find().limit(limit).skip(offset).sort({ no: 1 });
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
    // const onepiececharacter = await this.findOne(id);

    const { deletedCount } = await this.OnepieceModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException(`Character with id: ${id} not found`);
    }
    return;
  }

  async seed(characters: CreateOnePieceDto) {
    try {
      const character = await this.OnepieceModel.create(characters);
      return character;
    } catch (error) {
      this.HandleException(error);
    }
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
