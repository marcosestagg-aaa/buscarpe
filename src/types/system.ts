/**
 * Tipos do domínio buscARPE.
 * A estrutura espelha o formato previsto para a futura API REST,
 * permitindo substituir os dados mockados sem alterar a UI.
 */

export type TipoSistema = "SAA" | "SES";
export type SituacaoSistema = "Ativo" | "Inativo";

export interface DocumentoSistema {
  id: string;
  nome: string;
  tipo: string;
  tamanho: string;
}

export interface SistemaSaneamento {
  id: string;
  codigo: string;
  nome: string;
  municipio: string;
  tipo: TipoSistema;
  situacao: SituacaoSistema;
  latitude: number;
  longitude: number;
  endereco: string;
  capacidade: string;
  populacaoAtendida: string;
  operadora: string;
  anoImplantacao: number;
  observacoes: string;
  documentos: DocumentoSistema[];
}

export interface FiltrosSistema {
  municipio: string;
  tipo: TipoSistema | "Todos";
  situacao: SituacaoSistema | "Todas";
}

export const FILTROS_INICIAIS: FiltrosSistema = {
  municipio: "Todos",
  tipo: "Todos",
  situacao: "Todas",
};
