/**
 * Tipos do domínio buscARPE.
 * A estrutura espelha o formato previsto para a futura API REST.
 */

export type TipoSistema = "SAA" | "SES";
export type SituacaoBem = "Operando" | "Inoperante" | "N/I";
export type CategoriaBem = "EAT" | "EEE" | "ETE" | "RAP" | "REL" | "RES";
export type Microrregiao = "MRAE-I Sertão" | "MRAE-II RMR–Pajeú";

export type VisibilidadeBem = "Superficial" | "Subterrâneo";
export type Concessionaria = "Vita" | "Aqua";

export interface DocumentoBem {
  id: string;
  nome: string;
  tipo: string;
  tamanho: string;
}

export interface EquipamentoBem {
  id: string;
  nome: string;
  codigo: string;
  situacao: SituacaoBem;
  visibilidade: VisibilidadeBem;
}

export interface BemSaneamento {
  id: string;
  codigo: string;
  nome: string;
  municipio: string;
  regiaoDesenvolvimento: string;
  concessionaria: Concessionaria;
  visibilidade: VisibilidadeBem;
  microrregiao: Microrregiao;
  categoria: CategoriaBem;
  tipo: TipoSistema;
  situacao: SituacaoBem;
  latitude: number;
  longitude: number;
  endereco: string;
  equipamentos: EquipamentoBem[];
  documentos: DocumentoBem[];
}

export interface FiltrosBem {
  microrregiao: string;
  rd: string;
  municipio: string;
  tipo: string;
  categoria: string;
  situacao: string;
  concessionaria: string;
  visibilidade: string;
}

export const TODOS = "Todos";
export const FILTROS_INICIAIS: FiltrosBem = {
  microrregiao: TODOS, rd: TODOS, municipio: TODOS, tipo: TODOS,
  categoria: TODOS, situacao: TODOS, concessionaria: TODOS, visibilidade: TODOS,
};
