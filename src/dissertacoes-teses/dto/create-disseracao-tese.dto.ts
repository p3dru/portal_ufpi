import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateDissertacaoTeseDto {
  @ApiProperty({ description: 'Nome do autor da dissertação ou tese' })
  @IsString()
  @IsNotEmpty()
  nome_autor: string;

  @ApiProperty({ description: 'Título da dissertação ou tese' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'Documento anexo', type: 'string', format: 'binary', required: false })
  @IsOptional()
  arquivo?: any;

  @ApiProperty({ description: 'Nome do orientador' })
  @IsString()
  @IsNotEmpty()
  orientador: string;

  @ApiProperty({ description: 'Data de publicação da dissertação ou tese', example: '2025-01-30T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  data: string;

  @ApiProperty({ description: 'Resumo da dissertação ou tese' })
  @IsString()
  @IsNotEmpty()
  resumo: string;
}
