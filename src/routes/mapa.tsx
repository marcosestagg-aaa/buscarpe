import { ClientOnly, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";

import { FiltersPanel } from "@/components/FiltersPanel";
import { SystemDetails } from "@/components/SystemDetails";
import { TopBar } from "@/components/TopBar";
import { ExecutiveDashboard } from "@/components/ExecutiveDashboard";
import { filtrarBens } from "@/lib/system-summary";
import { MOCK_BENS } from "@/data/mockSystems";
import { autenticado, sair } from "@/lib/auth";
import { FILTROS_INICIAIS, TODOS, type BemSaneamento, type FiltrosBem } from "@/types/system";

const SystemMap = lazy(() => import("@/components/SystemMap"));

export const Route = createFileRoute("/mapa")({
  ssr: false,
  beforeLoad: () => {
    if (!autenticado()) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Mapa de bens de saneamento — BuscARPE" },
      { name: "description", content: "Plataforma de consulta geográfica de sistemas de saneamento de Pernambuco." },
      { property: "og:title", content: "Mapa — BuscARPE" },
      { property: "og:description", content: "Explore bens de saneamento de Pernambuco por região de desenvolvimento, município, sistema e categoria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mapa,
});

function Mapa() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<FiltrosBem>(FILTROS_INICIAIS);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [selecionado, setSelecionado] = useState<BemSaneamento | null>(null);
  const [painelAberto, setPainelAberto] = useState(false);

  const bens = useMemo(() => filtrarBens(MOCK_BENS, busca, filtros), [busca, filtros]);

  const filtrosAtivos = Object.values(filtros).filter((v) => v !== TODOS).length;

  const limpar = () => {
    setBusca("");
    setFiltros(FILTROS_INICIAIS);
    setSelecionado(null);
    setFiltrosAbertos(false);
  };

  const selecionar = useCallback((b: BemSaneamento) => setSelecionado(b), []);

  return (
    <div className="flex h-dvh flex-col bg-background">
      <TopBar
        busca={busca}
        onBuscaChange={setBusca}
        onAbrirFiltros={() => setFiltrosAbertos(true)}
        onLimpar={limpar}
        onSair={() => {
          sair();
          navigate({ to: "/", replace: true });
        }}
        filtros={filtros}
        onRemoverFiltro={(key) => { setFiltros((atual) => ({ ...atual, [key]: TODOS, ...(key === "rd" ? { municipio: TODOS } : {}) })); setSelecionado(null); }}
        onAbrirPainel={() => setPainelAberto(true)}
      />

      <main className="relative flex-1 overflow-hidden">
        <ClientOnly fallback={<div className="absolute inset-0 bg-secondary" />}>
          <Suspense fallback={<div className="absolute inset-0 bg-secondary" />}>
            <SystemMap sistemas={bens} selecionadoId={selecionado?.id ?? null} onSelecionar={selecionar} />
          </Suspense>
        </ClientOnly>

        <div className="absolute left-3 top-3 z-[600] hidden max-w-xs rounded-lg border border-border bg-card/95 p-3 shadow-float backdrop-blur sm:block">
          <h2 className="font-display text-sm font-semibold text-foreground">Sobre o BuscARPE</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Plataforma de consulta geográfica de sistemas de saneamento de Pernambuco. Filtre os bens
            por região, município, sistema e categoria e clique em um marcador para ver detalhes.
          </p>
        </div>

        <div className="pointer-events-none absolute right-3 top-3 z-[600] rounded-lg border border-border bg-card/95 px-4 py-2 text-right shadow-float backdrop-blur">
          <p className="font-display text-xl font-semibold leading-none text-brand">{bens.length}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {bens.length === 1 ? "bem cadastrado" : "bens cadastrados"}
          </p>
        </div>

        {bens.length === 0 && (
          <div className="absolute left-1/2 top-1/2 z-[600] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card px-5 py-3 text-sm text-muted-foreground shadow-panel">
            Nenhum bem encontrado
          </div>
        )}

        <FiltersPanel
          aberto={filtrosAbertos}
          filtros={filtros}
          onFechar={() => setFiltrosAbertos(false)}
          onChange={(novos) => { setFiltros(novos); setSelecionado(null); }}
        />

        {selecionado && <SystemDetails sistema={selecionado} onFechar={() => setSelecionado(null)} />}
        <div className="absolute bottom-6 right-3 z-[600] flex flex-wrap gap-4 rounded-md border border-border bg-card/95 px-4 py-3 text-xs shadow-float sm:text-sm" aria-label="Legenda do mapa"><span className="flex items-center gap-2"><span className="size-3 rounded-full bg-saa" />SAA · Água</span><span className="flex items-center gap-2"><span className="size-3 rounded-full bg-ses" />SES · Esgoto</span></div>
      </main>
      <ExecutiveDashboard aberto={painelAberto} onOpenChange={setPainelAberto} bens={bens} filtrado={filtrosAtivos > 0 || busca.trim().length > 0} />
    </div>
  );
}
