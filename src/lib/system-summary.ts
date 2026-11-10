import { REGIOES_DESENVOLVIMENTO } from "@/data/mockSystems";
import { normalizar } from "@/lib/auth";
import { TODOS, type BemSaneamento, type FiltrosBem } from "@/types/system";

export function filtrarBens(bens: BemSaneamento[], busca: string, filtros: FiltrosBem) {
  const termo = normalizar(busca.trim());
  const ok = (f: string, v: string) => f === TODOS || f === v;
  return bens.filter((b) =>
    (!termo || [b.nome, b.codigo, b.endereco, b.municipio, b.categoria].some((v) => normalizar(v).includes(termo))) &&
    ok(filtros.microrregiao, b.microrregiao) && ok(filtros.rd, b.regiaoDesenvolvimento) &&
    ok(filtros.municipio, b.municipio) && ok(filtros.tipo, b.tipo) && ok(filtros.categoria, b.categoria) &&
    ok(filtros.situacao, b.situacao) && ok(filtros.concessionaria, b.concessionaria) && ok(filtros.visibilidade, b.visibilidade),
  );
}

export function resumirBens(bens: BemSaneamento[]) {
  return {
    instalacoes: bens.length,
    filhos: bens.reduce((total, b) => total + b.equipamentos.length, 0),
    municipios: new Set(bens.map((b) => b.municipio)).size,
    operacionalidade: bens.length ? bens.filter((b) => b.situacao === "Operando").length / bens.length * 100 : 0,
    concessionarias: ["Vita", "Aqua"].map((nome) => ({ nome, total: bens.filter((b) => b.concessionaria === nome).length })),
    sistemas: ["SAA", "SES"].map((nome) => ({ nome, total: bens.filter((b) => b.tipo === nome).length })),
    regioes: REGIOES_DESENVOLVIMENTO.map((nome) => {
      const locais = bens.filter((b) => b.regiaoDesenvolvimento === nome);
      return { nome, instalacoes: locais.length, filhos: locais.reduce((n, b) => n + b.equipamentos.length, 0) };
    }).sort((a, b) => (b.instalacoes + b.filhos) - (a.instalacoes + a.filhos) || a.nome.localeCompare(b.nome)),
  };
}