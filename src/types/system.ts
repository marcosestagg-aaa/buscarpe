/**
 * Tipos do domínio buscARPE.
 * A estrutura espelha o formato previsto para a futura API REST.
 */

export type TipoSistema = "SAA" | "SES";
export type SituacaoBem = "Operando" | "Inoperante";
export type CategoriaBem = "EAT" | "EEE" | "ETE" | "RAP" | "REL" | "RES";
export type Microrregiao = "MRAE-I Sertão" | "MRAE-II RMR–Pajeú";

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
}

export interface BemSaneamento {
  id: string;
  codigo: string;
  nome: string;
  municipio: string;
  geres: string;
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
  geres: string;
  municipio: string;
  tipo: string;
  categoria: string;
  situacao: string;
}

export const TODOS = "Todos";

export const FILTROS_INICIAIS: FiltrosBem = {
  microrregiao: TODOS,
  geres: TODOS,
  municipio: TODOS,
  tipo: TODOS,
  categoria: TODOS,
  situacao: TODOS,
};
