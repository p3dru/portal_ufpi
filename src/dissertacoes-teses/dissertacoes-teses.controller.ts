import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DissertacoesTesesService } from './dissertacoes-teses.service';
import { UpdateDissertacaoTeseDto } from './dto/update-dissertacao-tese.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDissertacaoTeseDto } from './dto/create-disseracao-tese.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DissertacaoTeseDto } from './dto/dissertacao-tese.dto';


@ApiTags('Dissertações e Teses')
@Controller('dissertacoes-teses')
export class DissertacoesTesesController {
  constructor(private readonly dissertacoesTesesService: DissertacoesTesesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('arquivo', {
    storage: diskStorage({
      destination: './uploads/dissertacoes-teses',
      filename: (req, arquivo, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(arquivo.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      }
    }),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({summary: "Faz upload e cria um documento"})
  @ApiBody({
      description: 'Envie os dados para criar uma nova notícia',
      type: CreateDissertacaoTeseDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDissertacaoTeseDto: CreateDissertacaoTeseDto): Promise<DissertacaoTeseDto> {
    if (file && file.size > 10 * 1024 * 1024){
          throw new BadRequestException('O arquivo excede o limite de 10 MB');
    }
    
    createDissertacaoTeseDto.arquivo = file ? `uploads/dissertaces-tese/${file.filename}` : "Sem arquivo";
    
    return this.dissertacoesTesesService.create(createDissertacaoTeseDto);
  }

  @Get()
  findAll() {
    return this.dissertacoesTesesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dissertacoesTesesService.findOne(id);
  }

  @Get(':id/download')
    async downloadDocumento(@Param('id') id: string, @Res() res) {
      const documento = await this.dissertacoesTesesService.downloadDocumento(+id);

      if(!documento){
        throw new HttpException('Documento não encontrado', HttpStatus.NOT_FOUND);
      }

      res.download(documento.arquivo)
    }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateDissertacaoTeseDto: UpdateDissertacaoTeseDto) {
    return this.dissertacoesTesesService.update(id, updateDissertacaoTeseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.dissertacoesTesesService.remove(id);
  }
}
