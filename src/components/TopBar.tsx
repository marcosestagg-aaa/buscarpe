import { Eraser, Search, SlidersHorizontal } from "lucide-react";

interface TopBarProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
  onAbrirFiltros: () => void;
  onLimpar: () => void;
  filtrosAtivos: number;
}

export function TopBar({
  busca,
  onBuscaChange,
  onAbrirFiltros,
  onLimpar,
  filtrosAtivos,
}: TopBarProps) {
  return (
    <header className="z-[500] border-b border-border bg-card/95 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5">
        <h1 className="font-display text-lg font-semibold tracking-tight text-brand-deep">
          busc<span className="text-brand">ARPE</span>
        </h1>

        <div className="order-3 flex w-full items-center gap-2 sm:order-2 sm:mx-auto sm:w-auto sm:flex-1 sm:max-w-xl">
          <button
            type="button"
            onClick={onAbrirFiltros}
            className="relative inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <SlidersHorizontal className="size-4 text-brand" />
            Filtros
            {filtrosAtivos > 0 && (
              <span className="ml-0.5 rounded-full bg-brand px-1.5 text-[10px] font-semibold text-primary-foreground">
                {filtrosAtivos}
              </span>
            )}
          </button>

          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => onBuscaChange(e.target.value)}
              placeholder="Buscar município ou sistema..."
              aria-label="Buscar município ou sistema"
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onLimpar}
          className="order-2 ml-auto inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:order-3 sm:ml-0"
        >
          <Eraser className="size-4" />
          Limpar
        </button>
      </div>
    </header>
  );
}
