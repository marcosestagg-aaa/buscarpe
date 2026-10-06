/**
 * DADOS DE DEMONSTRAÇÃO (MOCK) — buscARPE
 * Nenhuma informação aqui representa dados reais.
 */
import type {
  BemSaneamento,
  CategoriaBem,
  Microrregiao,
  SituacaoBem,
  TipoSistema,
} from "@/types/system";

export const PERNAMBUCO_CENTER: [number, number] = [-8.4, -37.6];
export const PERNAMBUCO_ZOOM = 7;

export const MICRORREGIOES: Microrregiao[] = ["MRAE-I Sertão", "MRAE-II RMR–Pajeú"];
export const CATEGORIAS: CategoriaBem[] = ["EAT", "EEE", "ETE", "RAP", "REL", "RES"];

/** GERES → municípios (amostra de demonstração). */
export const GERES_MUNICIPIOS: Record<string, string[]> = {
  "I GERES": ["Recife", "Olinda", "Jaboatão dos Guararapes", "Paulista"],
  "II GERES": ["Limoeiro", "Carpina"],
  "III GERES": ["Palmares", "Barreiros"],
  "IV GERES": ["Caruaru", "Gravatá"],
  "V GERES": ["Garanhuns"],
  "VI GERES": ["Arcoverde"],
  "VII GERES": ["Salgueiro"],
  "VIII GERES": ["Petrolina"],
  "IX GERES": ["Ouricuri", "Araripina"],
  "X GERES": ["Afogados da Ingazeira"],
  "XI GERES": ["Serra Talhada"],
  "XII GERES": ["Goiana"],
};
export const GERES = Object.keys(GERES_MUNICIPIOS);
export const MUNICIPIOS = Object.values(GERES_MUNICIPIOS).flat().sort((a, b) => a.localeCompare(b));

const SERTAO = ["VI GERES", "VII GERES", "VIII GERES", "IX GERES"];
const geresDe = (m: string) => GERES.find((g) => GERES_MUNICIPIOS[g].includes(m))!;

type Linha = [string, string, string, TipoSistema, CategoriaBem, SituacaoBem, number, number, string];

const LINHAS: Linha[] = [
  ["SAA-001", "EAT Recife Norte", "Recife", "SAA", "EAT", "Operando", -8.0476, -34.877, "Av. Norte Miguel Arraes, Bairro do Recife"],
  ["SAA-002", "Reservatório Casa Amarela", "Recife", "SAA", "REL", "Operando", -8.025, -34.915, "Rua Alto do Mandu, Casa Amarela"],
  ["SES-003", "ETE Peixinhos", "Recife", "SES", "ETE", "Operando", -8.015, -34.885, "Av. Presidente Kennedy, Peixinhos"],
  ["SES-004", "EEE Beberibe", "Olinda", "SES", "EEE", "Operando", -7.9926, -34.8419, "Rodovia PE-15, km 4, Olinda"],
  ["SAA-005", "Reservatório Prazeres", "Jaboatão dos Guararapes", "SAA", "RAP", "Operando", -8.1128, -35.0148, "Estrada da Batalha, Prazeres"],
  ["SES-006", "ETE Muribeca", "Jaboatão dos Guararapes", "SES", "ETE", "Inoperante", -8.1749, -35.0, "Estrada da Muribeca, s/n"],
  ["SAA-007", "EAT Paulista", "Paulista", "SAA", "EAT", "Operando", -7.9408, -34.8728, "Av. Prefeito Geraldo Pinho Alves"],
  ["SAA-008", "Reservatório Limoeiro", "Limoeiro", "SAA", "RES", "Operando", -7.8746, -35.4503, "Rua do Rosário, Centro"],
  ["SES-009", "EEE Carpina", "Carpina", "SES", "EEE", "Inoperante", -7.8507, -35.2546, "Av. Estácio Coimbra"],
  ["SAA-010", "EAT Palmares", "Palmares", "SAA", "EAT", "Operando", -8.6833, -35.5917, "Rodovia BR-101 Sul, km 190"],
  ["SES-011", "ETE Barreiros", "Barreiros", "SES", "ETE", "Operando", -8.8183, -35.1864, "Rua da Praia, Barreiros"],
  ["SAA-012", "Reservatório Caruaru", "Caruaru", "SAA", "RAP", "Operando", -8.2836, -35.9761, "Av. Agamenon Magalhães, Maurício de Nassau"],
  ["SES-013", "ETE Caruaru", "Caruaru", "SES", "ETE", "Operando", -8.2955, -35.99, "Rodovia BR-104, km 62"],
  ["SAA-014", "EAT Gravatá", "Gravatá", "SAA", "EAT", "Inoperante", -8.2011, -35.5647, "Rua Cícero Monteiro"],
  ["SAA-015", "Reservatório Garanhuns", "Garanhuns", "SAA", "REL", "Operando", -8.8903, -36.4928, "Av. Rui Barbosa, Heliópolis"],
  ["SES-016", "EEE Arcoverde", "Arcoverde", "SES", "EEE", "Operando", -8.4189, -37.0539, "Rua Coronel Antônio Japiassú"],
  ["SAA-017", "EAT Salgueiro", "Salgueiro", "SAA", "EAT", "Operando", -8.0742, -39.1192, "BR-232, km 520"],
  ["SAA-018", "EAT Petrolina", "Petrolina", "SAA", "EAT", "Operando", -9.3891, -40.5027, "Orla do Rio São Francisco"],
  ["SES-019", "ETE Petrolina", "Petrolina", "SES", "ETE", "Operando", -9.405, -40.52, "Av. das Nações, Petrolina"],
  ["SAA-020", "Reservatório Ouricuri", "Ouricuri", "SAA", "RES", "Inoperante", -7.8828, -40.0817, "Rua Santo Antônio"],
  ["SES-021", "EEE Araripina", "Araripina", "SES", "EEE", "Operando", -7.5764, -40.4983, "Av. Florentino Alves Batista"],
  ["SAA-022", "EAT Afogados da Ingazeira", "Afogados da Ingazeira", "SAA", "EAT", "Operando", -7.7511, -37.6392, "Rua Manoel Borba"],
  ["SES-023", "ETE Serra Talhada", "Serra Talhada", "SES", "ETE", "Operando", -7.9858, -38.2958, "Rodovia PE-365"],
  ["SAA-024", "Reservatório Goiana", "Goiana", "SAA", "RAP", "Operando", -7.5606, -35.0025, "Rua Direita, Centro"],
];

const docs = (id: string) => [
  { id: `${id}-d1`, nome: "Relatório de inspeção técnica", tipo: "PDF", tamanho: "1,2 MB" },
  { id: `${id}-d2`, nome: "Projeto executivo", tipo: "PDF", tamanho: "4,8 MB" },
  { id: `${id}-d3`, nome: "Manual operacional", tipo: "DOCX", tamanho: "820 KB" },
];

const equips = (codigo: string, i: number) =>
  ["Conjunto motobomba", "Painel elétrico", "Macromedidor", "Válvula de controle"]
    .slice(0, 2 + (i % 3))
    .map((nome, k) => ({
      id: `${codigo}-e${k}`,
      nome,
      codigo: `${codigo}-EQ${String(k + 1).padStart(2, "0")}`,
      situacao: (k + i) % 4 === 3 ? ("Inoperante" as const) : ("Operando" as const),
    }));

export const MOCK_BENS: BemSaneamento[] = LINHAS.map(
  ([codigo, nome, municipio, tipo, categoria, situacao, latitude, longitude, endereco], i) => {
    const geres = geresDe(municipio);
    return {
      id: String(i + 1),
      codigo,
      nome,
      municipio,
      geres,
      microrregiao: SERTAO.includes(geres) ? "MRAE-I Sertão" : "MRAE-II RMR–Pajeú",
      categoria,
      tipo,
      situacao,
      latitude,
      longitude,
      endereco,
      // Bem 3 sem equipamentos; bem 5 sem documentos (demonstração de estados vazios)
      equipamentos: i === 2 ? [] : equips(codigo, i),
      documentos: i === 4 ? [] : docs(codigo),
    };
  },
);
