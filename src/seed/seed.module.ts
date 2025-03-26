import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { OnePieceModule } from 'src/one-piece/one-piece.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [OnePieceModule],
})
export class SeedModule {}
