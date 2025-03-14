import { Module } from '@nestjs/common';
import { OnePieceService } from './one-piece.service';
import { OnePieceController } from './one-piece.controller';

@Module({
  controllers: [OnePieceController],
  providers: [OnePieceService],
})
export class OnePieceModule {}
