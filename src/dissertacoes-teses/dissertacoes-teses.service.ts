import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDissertacaoTeseDto } from './dto/update-dissertacao-tese.dto';
import { CreateDissertacaoTeseDto } from './dto/create-disseracao-tese.dto';
import { DissertacaoTese } from './dissertacao-tese.entity';


@Injectable()
export class DissertacoesTesesService {
  constructor(
    @InjectRepository(DissertacaoTese)
    private readonly dissertacaoTeseRepository: Repository<DissertacaoTese>,
  ) {}

  async create(createDissertacaoTeseDto: CreateDissertacaoTeseDto): Promise<DissertacaoTese> {
    const dissertacaoTese = this.dissertacaoTeseRepository.create(createDissertacaoTeseDto);
    return this.dissertacaoTeseRepository.save(dissertacaoTese);
  }

  async downloadDocumento(id:number): Promise<DissertacaoTese>{
    const documento = await this.dissertacaoTeseRepository.findOne({where: { id }});
    if (!documento) {
      throw new NotFoundException(`Documento com id ${id} não encontrado`);
    }

    return documento;
  }

  async findAll(): Promise<DissertacaoTese[]> {
    return this.dissertacaoTeseRepository.find();
  }

  async findOne(id: number): Promise<DissertacaoTese> {
    const dissertacaoTese = await this.dissertacaoTeseRepository.findOne({ where: { id } });
    if (!dissertacaoTese) {
      throw new NotFoundException(`Dissertação ou tese com ID ${id} não encontrada`);
    }
    return dissertacaoTese;
  }

  async update(id: number, updateDissertacaoTeseDto: UpdateDissertacaoTeseDto): Promise<DissertacaoTese> {
    await this.findOne(id);
    await this.dissertacaoTeseRepository.update(id, updateDissertacaoTeseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.dissertacaoTeseRepository.delete(id);
  }
}
