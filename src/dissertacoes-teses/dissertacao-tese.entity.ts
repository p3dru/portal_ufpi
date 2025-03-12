import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('dissertacoes_teses')
export class DissertacaoTese {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome_autor: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', nullable: true })
  arquivo: string;

  @Column({ type: 'varchar', length: 255 })
  orientador: string;

  @Column({ type: 'timestamp' })
  data: Date;

  @Column({ type: 'text' })
  resumo: string;
}
