import { TaskResumo } from "./task-resumo.model";

export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  tasks?: TaskResumo[];
}
