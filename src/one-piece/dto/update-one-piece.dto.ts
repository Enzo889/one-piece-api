import { PartialType } from '@nestjs/mapped-types';
import { CreateOnePieceDto } from './create-one-piece.dto';

export class UpdateOnePieceDto extends PartialType(CreateOnePieceDto) {}
