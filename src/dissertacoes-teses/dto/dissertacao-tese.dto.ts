import { ApiProperty } from '@nestjs/swagger';

export class DissertacaoTeseDto {
  @ApiProperty({ description: 'ID da dissertação ou tese' })
  id: number;

  @ApiProperty({ description: 'Nome do autor' })
  nome_autor: string;

  @ApiProperty({ description: 'Título da dissertação ou tese' })
  titulo: string;

  @ApiProperty({ description: 'Documento anexo', type: 'string', format: 'binary', required: false })
  arquivo?: string;

  @ApiProperty({ description: 'Nome do orientador' })
  orientador: string;

  @ApiProperty({ description: 'Data de publicação', example: '2025-01-30T00:00:00.000Z' })
  data: Date;

  @ApiProperty({ description: 'Resumo da dissertação ou tese' })
  resumo: string;
}
