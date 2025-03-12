export interface DissertacaoTeseDto {
    id: number
    nome_autor: string
    titulo: string
    arquivo?: string
    orientador: string
    data: string
    resumo: string
  }
  
  export interface CreateDissertacaoTeseDto {
    nome_autor: string
    titulo: string
    arquivo?: string
    orientador: string
    data: string
    resumo: string
  }
  
  export interface UpdateDissertacaoTeseDto {
    nome_autor?: string
    titulo?: string
    arquivo?: string
    orientador?: string
    data?: string
    resumo?: string
  }  