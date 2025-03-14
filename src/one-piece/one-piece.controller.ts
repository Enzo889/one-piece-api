import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnePieceService } from './one-piece.service';
import { CreateOnePieceDto } from './dto/create-one-piece.dto';
import { UpdateOnePieceDto } from './dto/update-one-piece.dto';

@Controller('one-piece')
export class OnePieceController {
  constructor(private readonly onePieceService: OnePieceService) {}

  @Post()
  create(@Body() createOnePieceDto: CreateOnePieceDto) {
    return this.onePieceService.create(createOnePieceDto);
  }

  @Get()
  findAll() {
    return this.onePieceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onePieceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnePieceDto: UpdateOnePieceDto) {
    return this.onePieceService.update(+id, updateOnePieceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onePieceService.remove(+id);
  }
}
