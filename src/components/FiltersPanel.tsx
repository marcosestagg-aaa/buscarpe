import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";

import { CATEGORIAS, GERES, GERES_MUNICIPIOS, MICRORREGIOES, MUNICIPIOS } from "@/data/mockSystems";
import { FILTROS_INICIAIS, TODOS, type FiltrosBem } from "@/types/system";

interface FiltersPanelProps {
  aberto: boolean;
  filtros: FiltrosBem;
  onFechar: () => void;
  onChange: (filtros: FiltrosBem) => void;
}

const selectClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

function Sanfona({
  titulo,
  valor,
  opcoes,
  onChange,
}: {
  titulo: string;
  valor: string;
  opcoes: string[];
  onChange: (v: string) => void;
}) {
  const [aberta, setAberta] = useState(valor !== TODOS);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setAberta(!aberta)}
        aria-expanded={aberta}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {titulo}
          {valor !== TODOS && <span className="ml-2 normal-case text-brand">· {valor}</span>}
        </span>
        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${aberta ? "rotate-180" : ""}`} />
      </button>
      {aberta && (
        <div className="px-4 pb-3">
          <select className={selectClass} value={valor} onChange={(e) => onChange(e.target.value)} aria-label={titulo}>
            <option value={TODOS}>Todos</option>
            {opcoes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export function FiltersPanel({ aberto, filtros, onFechar, onChange }: FiltersPanelProps) {
  const [, force] = useState(0);
  useEffect(() => force((n) => n + 1), [aberto]);
  if (!aberto) return null;

  const municipios = filtros.geres === TODOS ? MUNICIPIOS : GERES_MUNICIPIOS[filtros.geres];
  const set = (parcial: Partial<FiltrosBem>) => onChange({ ...filtros, ...parcial });

  return (
    <>
      <div className="absolute inset-0 z-[900] bg-brand-deep/20" onClick={onFechar} aria-hidden="true" />
      <aside className="absolute inset-y-0 left-0 z-[1000] flex w-full max-w-sm flex-col bg-card shadow-panel sm:w-80">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Filtros</h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar filtros"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Sanfona titulo="Microrregião" valor={filtros.microrregiao} opcoes={MICRORREGIOES} onChange={(v) => set({ microrregiao: v })} />
          <Sanfona
            titulo="GERES"
            valor={filtros.geres}
            opcoes={GERES}
            onChange={(v) => {
              const lista = v === TODOS ? MUNICIPIOS : GERES_MUNICIPIOS[v];
              set({ geres: v, municipio: lista.includes(filtros.municipio) ? filtros.municipio : TODOS });
            }}
          />
          <Sanfona titulo="Município" valor={filtros.municipio} opcoes={municipios} onChange={(v) => set({ municipio: v })} />
          <Sanfona titulo="Sistema" valor={filtros.tipo} opcoes={["SAA", "SES"]} onChange={(v) => set({ tipo: v })} />
          <Sanfona titulo="Categoria" valor={filtros.categoria} opcoes={CATEGORIAS} onChange={(v) => set({ categoria: v })} />
          <Sanfona titulo="Situação" valor={filtros.situacao} opcoes={["Operando", "Inoperante"]} onChange={(v) => set({ situacao: v })} />
        </div>

        <div className="border-t border-border px-4 py-4">
          <button
            type="button"
            onClick={() => onChange(FILTROS_INICIAIS)}
            className="w-full rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Redefinir filtros
          </button>
        </div>
      </aside>
    </>
  );
}
