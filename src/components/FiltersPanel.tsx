import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { MUNICIPIOS } from "@/data/mockSystems";
import { FILTROS_INICIAIS, type FiltrosSistema } from "@/types/system";

interface FiltersPanelProps {
  aberto: boolean;
  filtros: FiltrosSistema;
  onFechar: () => void;
  onAplicar: (filtros: FiltrosSistema) => void;
}

const selectClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

export function FiltersPanel({ aberto, filtros, onFechar, onAplicar }: FiltersPanelProps) {
  const [rascunho, setRascunho] = useState<FiltrosSistema>(filtros);

  // Descarta alterações não aplicadas ao reabrir o painel.
  useEffect(() => {
    if (aberto) setRascunho(filtros);
  }, [aberto, filtros]);

  if (!aberto) return null;

  return (
    <>
      <div
        className="absolute inset-0 z-[900] bg-brand-deep/20"
        onClick={onFechar}
        aria-hidden="true"
      />
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

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Município
            </span>
            <select
              className={selectClass}
              value={rascunho.municipio}
              onChange={(e) => setRascunho({ ...rascunho, municipio: e.target.value })}
            >
              <option value="Todos">Todos</option>
              {MUNICIPIOS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Tipo de sistema
            </span>
            <select
              className={selectClass}
              value={rascunho.tipo}
              onChange={(e) =>
                setRascunho({ ...rascunho, tipo: e.target.value as FiltrosSistema["tipo"] })
              }
            >
              <option value="Todos">Todos</option>
              <option value="SAA">SAA</option>
              <option value="SES">SES</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Situação
            </span>
            <select
              className={selectClass}
              value={rascunho.situacao}
              onChange={(e) =>
                setRascunho({ ...rascunho, situacao: e.target.value as FiltrosSistema["situacao"] })
              }
            >
              <option value="Todas">Todas</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </label>
        </div>

        <div className="space-y-2 border-t border-border px-4 py-4">
          <button
            type="button"
            onClick={() => onAplicar(rascunho)}
            className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={() => setRascunho(FILTROS_INICIAIS)}
            className="w-full rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Redefinir
          </button>
        </div>
      </aside>
    </>
  );
}
