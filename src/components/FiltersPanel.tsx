import { X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CATEGORIAS, REGIOES_DESENVOLVIMENTO, RD_MUNICIPIOS, MICRORREGIOES, MUNICIPIOS } from "@/data/mockSystems";
import { FILTROS_INICIAIS, TODOS, type FiltrosBem } from "@/types/system";

interface FiltersPanelProps { aberto: boolean; filtros: FiltrosBem; onFechar: () => void; onChange: (filtros: FiltrosBem) => void; }
export const FILTER_LABELS: Record<keyof FiltrosBem, string> = {
  microrregiao: "Microrregião", rd: "Regiões de Desenvolvimento", municipio: "Município", tipo: "Sistema", categoria: "Categoria", situacao: "Condição Operacional", concessionaria: "Concessionária", visibilidade: "Visibilidade",
};
export function filterValueLabel(key: keyof FiltrosBem, value: string) {
  if (key === "visibilidade") return value === "Superficial" ? "Visível (Superficial)" : "Invisível (Subterrâneo)";
  return value;
}
export function FiltersPanel({ aberto, filtros, onFechar, onChange }: FiltersPanelProps) {
  if (!aberto) return null;
  const municipios = filtros.rd === TODOS ? MUNICIPIOS : (RD_MUNICIPIOS[filtros.rd] ?? []);
  const options: Record<keyof FiltrosBem, string[]> = {
    microrregiao: MICRORREGIOES, rd: REGIOES_DESENVOLVIMENTO, municipio: municipios, tipo: ["SAA", "SES"], categoria: CATEGORIAS,
    situacao: ["Operando", "Inoperante", "N/I"], concessionaria: ["Vita", "Aqua"], visibilidade: ["Superficial", "Subterrâneo"],
  };
  const set = (key: keyof FiltrosBem, value: string) => {
    const next = { ...filtros, [key]: value };
    if (key === "rd" && value !== TODOS && !(RD_MUNICIPIOS[value] ?? []).includes(filtros.municipio)) next.municipio = TODOS;
    onChange(next);
  };
  return <>
    <div className="absolute inset-0 z-[900] bg-foreground/20" onClick={onFechar} aria-hidden="true" />
    <aside aria-label="Filtros dos bens" className="absolute inset-y-0 left-0 z-[1000] flex w-full max-w-sm flex-col bg-card shadow-panel sm:w-96">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="font-display text-lg font-semibold">Filtros</h2>
        <Button variant="ghost" size="icon" onClick={onFechar} aria-label="Fechar filtros"><X /></Button>
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <Accordion type="multiple" defaultValue={Object.keys(filtros).filter((k) => filtros[k as keyof FiltrosBem] !== TODOS)}>
          {(Object.keys(options) as (keyof FiltrosBem)[]).map((key) => <AccordionItem key={key} value={key}>
            <AccordionTrigger className="py-4 hover:no-underline"><span>{FILTER_LABELS[key]}{filtros[key] !== TODOS && <span className="mt-1 block text-xs text-brand">{filterValueLabel(key, filtros[key])}</span>}</span></AccordionTrigger>
            <AccordionContent><select aria-label={FILTER_LABELS[key]} value={filtros[key]} onChange={(e) => set(key, e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value={TODOS}>{key === "concessionaria" || key === "visibilidade" ? "Todas" : "Todos"}</option>
              {options[key].map((o) => <option key={o} value={o}>{filterValueLabel(key, o)}</option>)}
            </select></AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </div>
      <div className="flex gap-2 border-t border-border p-5"><Button variant="outline" className="flex-1" onClick={() => onChange(FILTROS_INICIAIS)}>Redefinir filtros</Button><Button onClick={onFechar}>Ver mapa</Button></div>
    </aside>
  </>;
}
