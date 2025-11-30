import { Category } from "./category.model";

export interface Task {
  id?: number;
  titulo: string;
  descricao: string;
  dataVencimento: string;
  concluida: boolean;
  prioridade: number;
  dataCriacao?: string;
  dataAtualizacao?: string;
  categoria?: Category;
}
