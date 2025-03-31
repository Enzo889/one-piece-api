import { Module } from '@nestjs/common';
import { OnePieceService } from './one-piece.service';
import { OnePieceController } from './one-piece.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OnePiece, OnePieceSchema } from './entities/one-piece.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [OnePieceController],
  providers: [OnePieceService],
  exports: [MongooseModule],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: OnePiece.name,
        schema: OnePieceSchema,
      },
    ]),
  ],
})
export class OnePieceModule {}
