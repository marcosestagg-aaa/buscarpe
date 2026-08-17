import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";

import { FiltersPanel } from "@/components/FiltersPanel";
import { SystemDetails } from "@/components/SystemDetails";
import { TopBar } from "@/components/TopBar";
import { MOCK_SISTEMAS } from "@/data/mockSystems";
import { FILTROS_INICIAIS, type FiltrosSistema, type SistemaSaneamento } from "@/types/system";

const SystemMap = lazy(() => import("@/components/SystemMap"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "buscARPE — Mapa dos sistemas de saneamento de Pernambuco" },
      {
        name: "description",
        content:
          "Protótipo do buscARPE: consulte e visualize no mapa os sistemas de abastecimento de água e esgotamento sanitário de Pernambuco.",
      },
      { property: "og:title", content: "buscARPE — Sistemas de saneamento de Pernambuco" },
      {
        property: "og:description",
        content:
          "Mapa interativo para explorar sistemas SAA e SES por município, tipo e situação em Pernambuco.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<FiltrosSistema>(FILTROS_INICIAIS);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [selecionado, setSelecionado] = useState<SistemaSaneamento | null>(null);

  const sistemas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return MOCK_SISTEMAS.filter((s) => {
      const casaBusca =
        !termo ||
        s.nome.toLowerCase().includes(termo) ||
        s.municipio.toLowerCase().includes(termo) ||
        s.codigo.toLowerCase().includes(termo);
      const casaMunicipio = filtros.municipio === "Todos" || s.municipio === filtros.municipio;
      const casaTipo = filtros.tipo === "Todos" || s.tipo === filtros.tipo;
      const casaSituacao = filtros.situacao === "Todas" || s.situacao === filtros.situacao;
      return casaBusca && casaMunicipio && casaTipo && casaSituacao;
    });
  }, [busca, filtros]);

  const filtrosAtivos = useMemo(
    () =>
      [
        filtros.municipio !== "Todos",
        filtros.tipo !== "Todos",
        filtros.situacao !== "Todas",
      ].filter(Boolean).length,
    [filtros],
  );

  const limpar = () => {
    setBusca("");
    setFiltros(FILTROS_INICIAIS);
    setSelecionado(null);
    setFiltrosAbertos(false);
  };

  const selecionar = useCallback((sistema: SistemaSaneamento) => setSelecionado(sistema), []);

  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        busca={busca}
        onBuscaChange={setBusca}
        onAbrirFiltros={() => setFiltrosAbertos(true)}
        onLimpar={limpar}
        filtrosAtivos={filtrosAtivos}
      />

      <main className="relative flex-1 overflow-hidden">
        <ClientOnly fallback={<div className="absolute inset-0 bg-secondary" />}>
          <Suspense fallback={<div className="absolute inset-0 bg-secondary" />}>
            <SystemMap
              sistemas={sistemas}
              selecionadoId={selecionado?.id ?? null}
              onSelecionar={selecionar}
            />
          </Suspense>
        </ClientOnly>

        <div className="pointer-events-none absolute right-3 top-3 z-[600] rounded-lg border border-border bg-card/95 px-4 py-2 text-right shadow-float backdrop-blur">
          <p className="font-display text-xl font-semibold leading-none text-brand">
            {sistemas.length}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {sistemas.length === 1 ? "sistema encontrado" : "sistemas cadastrados"}
          </p>
        </div>

        {sistemas.length === 0 && (
          <div className="absolute left-1/2 top-1/2 z-[600] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card px-5 py-3 text-sm text-muted-foreground shadow-panel">
            Nenhum sistema encontrado.
          </div>
        )}

        <FiltersPanel
          aberto={filtrosAbertos}
          filtros={filtros}
          onFechar={() => setFiltrosAbertos(false)}
          onAplicar={(novos) => {
            setFiltros(novos);
            setFiltrosAbertos(false);
          }}
        />

        {selecionado && (
          <SystemDetails sistema={selecionado} onFechar={() => setSelecionado(null)} />
        )}
      </main>
    </div>
  );
}
