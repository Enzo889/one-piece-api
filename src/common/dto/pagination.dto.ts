import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class paginatinoDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?: number;
}
