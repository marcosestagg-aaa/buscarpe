/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { MOCK_BENS, REGIOES_DESENVOLVIMENTO } from "@/data/mockSystems";
import { filtrarBens, resumirBens } from "./system-summary";
import { FILTROS_INICIAIS } from "@/types/system";

describe("Executive data rules", () => {
  test("Concessionária accepts Vita and Aqua and filters independently", () => {
    for (const concessionaria of ["Vita", "Aqua"]) {
      const found = filtrarBens(MOCK_BENS, "", { ...FILTROS_INICIAIS, concessionaria });
      expect(found.length).toBe(12);
      expect(found.every((b) => b.concessionaria === concessionaria)).toBe(true);
    }
  });
  test("Visibilidade filters surface and underground assets with other selections", () => {
    expect(filtrarBens(MOCK_BENS, "recife", { ...FILTROS_INICIAIS, concessionaria: "Vita", visibilidade: "Superficial" }).map((b) => b.codigo)).toEqual(["SAA-001", "SES-003"]);
    expect(filtrarBens(MOCK_BENS, "", { ...FILTROS_INICIAIS, concessionaria: "Vita", visibilidade: "Subterrâneo" }).map((b) => b.codigo)).toEqual(["SAA-005"]);
  });
  test("Ranking contains all 12 development regions even with no selected assets", () => {
    expect(REGIOES_DESENVOLVIMENTO.length).toBe(12);
    expect(resumirBens([]).regioes.length).toBe(12);
    expect(resumirBens([]).regioes.every((rd) => rd.instalacoes === 0 && rd.filhos === 0)).toBe(true);
  });
  test("Child totals count linked equipment, never the parent", () => {
    const first = MOCK_BENS[0];
    if (!first) throw new Error("Missing demo installation");
    expect(resumirBens([first]).instalacoes).toBe(1);
    expect(resumirBens([first]).filhos).toBe(2);
    expect(first.equipamentos.map((e) => e.nome)).toEqual(["Bomba centrífuga", "Motor elétrico"]);
    expect(first.equipamentos.every((e) => e.id !== first.id)).toBe(true);
  });
  test("Operational rate counts Operando and includes Inoperante and N/I in denominator", () => {
    const first = MOCK_BENS[0];
    if (!first) throw new Error("Missing demo installation");
    const resumo = resumirBens([first, { ...first, situacao: "Inoperante" }, { ...first, situacao: "N/I" }]);
    expect(resumo.operacionalidade).toBeCloseTo(100 / 3);
    expect(resumirBens([]).operacionalidade).toBe(0);
  });
});