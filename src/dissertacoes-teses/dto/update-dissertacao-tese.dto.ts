import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';
import { CreateDissertacaoTeseDto } from './create-disseracao-tese.dto';

export class UpdateDissertacaoTeseDto extends PartialType(CreateDissertacaoTeseDto) {
  @ApiProperty({ description: 'Nome do autor da dissertação ou tese', required: false })
  @IsOptional()
  @IsString()
  nome_autor?: string;

  @ApiProperty({ description: 'Título da dissertação ou tese', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ description: 'Documento anexo', type: 'string', required: false })
  @IsOptional()
  arquivo?: string;

  @ApiProperty({ description: 'Nome do orientador', required: false })
  @IsOptional()
  @IsString()
  orientador?: string;

  @ApiProperty({ description: 'Data de publicação', required: false, example: '2025-01-30T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  data?: string;

  @ApiProperty({ description: 'Resumo da dissertação ou tese', required: false })
  @IsOptional()
  @IsString()
  resumo?: string;
}
