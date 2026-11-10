import { useMemo } from "react";
import { Activity, Building2, MapPin, Wrench, BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { resumirBens } from "@/lib/system-summary";
import type { BemSaneamento } from "@/types/system";

export function ExecutiveDashboard({ aberto, onOpenChange, bens, filtrado }: { aberto: boolean; onOpenChange: (open: boolean) => void; bens: BemSaneamento[]; filtrado: boolean }) {
  const resumo = useMemo(() => resumirBens(bens), [bens]);
  const indicadores = [
    { nome: "Total de Instalações", valor: resumo.instalacoes, icon: Building2, cor: "text-saa" },
    { nome: "Total de Bens Filhos", valor: resumo.filhos, icon: Wrench, cor: "text-ses" },
    { nome: "Municípios Atendidos", valor: resumo.municipios, icon: MapPin, cor: "text-brand" },
    { nome: "Taxa de Operacionalidade", valor: `${resumo.operacionalidade.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`, icon: Activity, cor: "text-success" },
  ];
  const tooltipStyle = { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)", borderRadius: 8 };
  return <Dialog open={aberto} onOpenChange={onOpenChange}>
    <DialogContent className="executive-dialog">
      <header className="shrink-0 border-b border-border bg-card px-6 py-5 pr-16 lg:px-10">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand"><BarChart3 className="size-4" />BuscARPE <span className="mx-1 text-border">/</span> ARPE</div>
        <DialogTitle className="font-display text-2xl lg:text-3xl">Painel Executivo</DialogTitle>
        <DialogDescription className="mt-2">Saneamento de Pernambuco · {filtrado ? "Recorte dos filtros ativos" : "Visão estadual"} · Dados de demonstração</DialogDescription>
      </header>
      <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {indicadores.map(({ nome, valor, icon: Icon, cor }) => <article key={nome} className="rounded-lg border border-border bg-card p-5 lg:p-6"><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-medium text-muted-foreground">{nome}</h3><Icon className={`size-5 shrink-0 ${cor}`} /></div><p className={`mt-4 font-display text-4xl font-semibold ${cor}`}>{valor}</p>{nome === "Taxa de Operacionalidade" && <p className="mt-2 text-xs text-muted-foreground">Instalações operando / total de instalações</p>}</article>)}
          </div>
          <div className="mt-8 grid gap-8 border-b border-border pb-8 lg:grid-cols-2">
            <section><h3 className="font-display text-lg font-semibold">Ativos por Concessionária</h3><p className="mt-1 text-sm text-muted-foreground">Instalações por operador</p>
              <div className="relative mt-3 h-64" role="img" aria-label={resumo.concessionarias.map((c) => `${c.nome}: ${c.total} instalações`).join(", ")}>
                {bens.length === 0 ? <div className="flex h-full items-center justify-center text-muted-foreground">Sem instalações neste recorte</div> : <><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={resumo.concessionarias} dataKey="total" nameKey="nome" innerRadius={72} outerRadius={104} paddingAngle={3} stroke="var(--background)">{resumo.concessionarias.map((c, i) => <Cell key={c.nome} fill={i === 0 ? "var(--brand)" : "var(--warning)"} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="font-display text-3xl font-semibold">{bens.length}</span><span className="text-xs text-muted-foreground">instalações</span></div></>}
              </div><div className="flex justify-center gap-8">{resumo.concessionarias.map((c, i) => <div key={c.nome} className="flex items-center gap-2 text-sm"><span className={`size-2.5 rounded-full ${i === 0 ? "bg-brand" : "bg-warning"}`} /><span>{c.nome}</span><strong>{c.total}</strong></div>)}</div>
            </section>
            <section><h3 className="font-display text-lg font-semibold">Água e Esgoto</h3><p className="mt-1 text-sm text-muted-foreground">Proporção de instalações por sistema</p><div className="mt-5 h-64" role="img" aria-label={resumo.sistemas.map((s) => `${s.nome}: ${s.total} instalações`).join(", ")}><ResponsiveContainer width="100%" height="100%"><BarChart data={resumo.sistemas} margin={{ top: 24, right: 24, left: -20, bottom: 8 }}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="nome" axisLine={false} tickLine={false} tick={{ fill: "var(--foreground)", fontSize: 14 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)" }} /><Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} /><Bar dataKey="total" name="Instalações" maxBarSize={100} radius={[4, 4, 0, 0]} label={{ position: "top", fill: "var(--foreground)", fontSize: 16 }}>{resumo.sistemas.map((s) => <Cell key={s.nome} fill={s.nome === "SAA" ? "var(--saa)" : "var(--ses)"} />)}</Bar></BarChart></ResponsiveContainer></div><div className="flex justify-center gap-6 text-sm"><span className="text-saa">SAA · Água</span><span className="text-ses">SES · Esgoto</span></div></section>
          </div>
          <section className="pt-7"><div className="mb-4 flex flex-wrap items-end justify-between gap-2"><h3 className="font-display text-lg font-semibold">Ranking por Região de Desenvolvimento</h3><span className="text-xs text-muted-foreground">12 regiões · Ordenado pelo total de bens</span></div>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="border-y border-border bg-secondary text-muted-foreground"><tr><th className="w-12 px-3 py-3 text-left">#</th><th className="px-3 py-3 text-left">Região de Desenvolvimento</th><th className="px-3 py-3 text-right">Instalações</th><th className="px-3 py-3 text-right">Bens Filhos</th><th className="px-3 py-3 text-right">Total de Bens</th></tr></thead><tbody>{resumo.regioes.map((rd, i) => <tr key={rd.nome} className="border-b border-border hover:bg-muted/50"><td className="px-3 py-3 tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</td><th scope="row" className="px-3 py-3 text-left font-medium">{rd.nome}</th><td className="px-3 py-3 text-right tabular-nums">{rd.instalacoes}</td><td className="px-3 py-3 text-right tabular-nums">{rd.filhos}</td><td className="px-3 py-3 text-right font-semibold tabular-nums">{rd.instalacoes + rd.filhos}</td></tr>)}</tbody></table></div>
          </section>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}