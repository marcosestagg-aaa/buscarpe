import { BarChart3, Eraser, LogOut, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FILTER_LABELS, filterValueLabel } from "@/components/FiltersPanel";
import { TODOS, type FiltrosBem } from "@/types/system";
interface TopBarProps {
  busca: string; onBuscaChange: (valor: string) => void; onAbrirFiltros: () => void; onLimpar: () => void;
  onSair: () => void; filtros: FiltrosBem; onRemoverFiltro: (key: keyof FiltrosBem) => void; onAbrirPainel: () => void;
}
export function TopBar({ busca, onBuscaChange, onAbrirFiltros, onLimpar, onSair, filtros, onRemoverFiltro, onAbrirPainel }: TopBarProps) {
  const ativos = (Object.keys(filtros) as (keyof FiltrosBem)[]).filter((key) => filtros[key] !== TODOS);
  return <header className="z-[500] border-b border-border bg-card">
    <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 lg:px-6">
      <div className="mr-auto"><h1 className="font-display text-2xl font-semibold text-brand-deep">Busc<span className="text-saa">ARPE</span><span className="sr-only"> — Sistemas de Saneamento de Pernambuco</span></h1><p className="hidden text-xs text-muted-foreground xl:block">Sistemas de Saneamento de Pernambuco</p></div>
      <div className="order-3 flex w-full gap-2 md:order-none md:w-auto md:max-w-xl md:flex-1">
        <Button variant="outline" onClick={onAbrirFiltros}><SlidersHorizontal />Filtros{ativos.length > 0 && <span className="rounded-full bg-brand px-1.5 text-xs text-primary-foreground">{ativos.length}</span>}</Button>
        <div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={busca} onChange={(e) => onBuscaChange(e.target.value)} placeholder="Buscar bem, código ou município…" aria-label="Buscar bens" className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div>
      </div>
      <Button onClick={onAbrirPainel} className="gap-1.5 bg-brand-deep px-2 text-xs text-primary-foreground hover:bg-brand sm:gap-2 sm:px-4 sm:text-sm"><BarChart3 /><span>Painel Executivo</span></Button>
      <Button variant="ghost" size="icon" className="w-7 sm:w-9" onClick={onLimpar} aria-label="Limpar" title="Limpar busca e filtros"><Eraser /></Button>
      <Button variant="ghost" size="icon" className="w-7 sm:w-9" onClick={onSair} aria-label="Sair" title="Sair"><LogOut /></Button>
    </div>
    {ativos.length > 0 && <div aria-label="Filtros ativos" className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-2 lg:px-6"><span className="mr-1 text-xs text-muted-foreground">Recorte atual</span>{ativos.map((key) => <Button key={key} variant="secondary" size="sm" onClick={() => onRemoverFiltro(key)} aria-label={`Remover filtro ${FILTER_LABELS[key]}`} className={`h-auto min-h-8 whitespace-normal text-left ${key === "tipo" ? filtros[key] === "SAA" ? "bg-saa/10 text-saa" : "bg-ses/10 text-ses" : ""}`}><span>{filterValueLabel(key, filtros[key])}</span><X className="size-3" /></Button>)}</div>}
  </header>;
}
