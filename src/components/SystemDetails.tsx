import { useState } from "react";
import { FileText, X, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge, SystemBadge, VisibilityBadge } from "@/components/SystemBadges";
import type { BemSaneamento } from "@/types/system";
interface SystemDetailsProps { sistema: BemSaneamento; onFechar: () => void; }
function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 py-3"><dt className="text-sm text-muted-foreground">{rotulo}</dt><dd className="break-words text-right text-sm font-medium">{valor}</dd></div>;
}
export function SystemDetails({ sistema, onFechar }: SystemDetailsProps) {
  const [aba, setAba] = useState("visao");
  return <section aria-label="Detalhes do bem" className="absolute inset-x-2 bottom-2 z-[1000] flex max-h-[85%] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-panel sm:inset-x-auto sm:inset-y-4 sm:right-4 sm:max-h-none sm:w-[26rem]">
    <div className="flex items-start gap-3 bg-brand-deep px-5 py-4"><div className="min-w-0 flex-1"><h2 className="font-display text-lg font-semibold text-primary-foreground">{sistema.nome}</h2><p className="mt-1 text-xs text-primary-foreground/75">Instalação pai · {sistema.codigo}</p></div><Button variant="ghost" size="icon" onClick={onFechar} aria-label="Fechar detalhes" className="shrink-0 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><X /></Button></div>
    <div className="flex flex-wrap gap-2 px-5 py-3"><SystemBadge tipo={sistema.tipo} /><VisibilityBadge valor={sistema.visibilidade} /></div>
    <Tabs value={aba} onValueChange={setAba} className="flex min-h-0 flex-1 flex-col"><TabsList className="mx-5 grid shrink-0 grid-cols-3"><TabsTrigger value="visao">Visão Geral</TabsTrigger><TabsTrigger value="filhos">Bens Filhos</TabsTrigger><TabsTrigger value="docs">Documentos</TabsTrigger></TabsList>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
        <TabsContent value="visao"><dl className="divide-y divide-border"><Linha rotulo="Código Único Instalação Pai" valor={sistema.codigo} /><Linha rotulo="Nome bem pai" valor={sistema.nome} /><div className="flex items-center justify-between gap-3 py-3"><dt className="text-sm text-muted-foreground">Condição Operacional</dt><dd><StatusBadge situacao={sistema.situacao} /></dd></div><Linha rotulo="Concessionária" valor={sistema.concessionaria} /><Linha rotulo="Região de Desenvolvimento" valor={sistema.regiaoDesenvolvimento} /><Linha rotulo="Município" valor={sistema.municipio} /><Linha rotulo="Endereço" valor={sistema.endereco} /><Linha rotulo="Categoria" valor={sistema.categoria} /><Linha rotulo="Tipo de Sistema" valor={sistema.tipo === "SAA" ? "SAA — Abastecimento de água" : "SES — Esgotamento sanitário"} /></dl></TabsContent>
        <TabsContent value="filhos">{sistema.equipamentos.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">Não há bens filhos cadastrados para este bem</p> : <ul className="divide-y divide-border">{sistema.equipamentos.map((eq) => <li key={eq.id} className="py-4"><div className="flex gap-3"><Wrench className="mt-1 size-4 shrink-0 text-brand" /><div><p className="text-sm font-semibold">{eq.nome}</p><p className="mt-1 text-xs text-muted-foreground">{eq.codigo}</p></div></div><div className="mt-3 flex flex-wrap gap-2"><StatusBadge situacao={eq.situacao} /><VisibilityBadge valor={eq.visibilidade} compacto /></div></li>)}</ul>}</TabsContent>
        <TabsContent value="docs">{sistema.documentos.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">Não há documentos anexados a este bem</p> : <ul className="divide-y divide-border">{sistema.documentos.map((doc) => <li key={doc.id} className="flex items-center gap-3 py-4"><FileText className="size-5 shrink-0 text-brand" /><div className="min-w-0"><p className="text-sm font-medium">{doc.nome}</p><p className="mt-1 text-xs text-muted-foreground">{doc.tipo} · {doc.tamanho}</p></div></li>)}</ul>}</TabsContent>
      </div>
    </Tabs>
  </section>;
}
