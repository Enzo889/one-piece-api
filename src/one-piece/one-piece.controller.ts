import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OnePieceService } from './one-piece.service';
import { CreateOnePieceDto } from './dto/create-one-piece.dto';
import { UpdateOnePieceDto } from './dto/update-one-piece.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { paginatinoDto } from 'src/common/dto/pagination.dto';

@Controller('one-piece')
export class OnePieceController {
  constructor(private readonly onePieceService: OnePieceService) {}

  @Post()
  create(@Body() createOnePieceDto: CreateOnePieceDto) {
    return this.onePieceService.create(createOnePieceDto);
  }

  @Get()
  findAll(@Query() paginatinoDto: paginatinoDto) {
    return this.onePieceService.findAll(paginatinoDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.onePieceService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateOnePieceDto: UpdateOnePieceDto,
  ) {
    return this.onePieceService.update(term, updateOnePieceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.onePieceService.remove(id);
  }
}
