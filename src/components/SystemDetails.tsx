import { useState } from "react";
import { ExternalLink, FileText, X } from "lucide-react";

import type { BemSaneamento } from "@/types/system";

interface SystemDetailsProps {
  sistema: BemSaneamento;
  onFechar: () => void;
}

type Aba = "visao" | "equip" | "docs";

const abas: { id: Aba; label: string }[] = [
  { id: "visao", label: "Visão Geral" },
  { id: "equip", label: "Equipamentos" },
  { id: "docs", label: "Documentos" },
];

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <dt className="text-xs text-muted-foreground">{rotulo}</dt>
      <dd className="text-right text-sm font-medium text-foreground">{valor}</dd>
    </div>
  );
}

function Vazio({ texto }: { texto: string }) {
  return <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">{texto}</p>;
}

export function SystemDetails({ sistema, onFechar }: SystemDetailsProps) {
  const [aba, setAba] = useState<Aba>("visao");

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-3 z-[1000] max-h-[70%] overflow-hidden rounded-xl border border-border bg-card shadow-panel sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-4 sm:max-h-[calc(100%-2rem)] sm:w-[22rem]">
      <div className="flex items-start gap-3 bg-brand-deep px-4 py-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-primary-foreground">{sistema.nome}</h2>
          <p className="mt-0.5 text-xs text-primary-foreground/70">Código: {sistema.codigo}</p>
        </div>
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar detalhes"
          className="rounded-md p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex border-b border-border">
        {abas.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAba(item.id)}
            className={`flex-1 border-b-2 px-2 py-2.5 text-xs font-medium transition-colors ${
              aba === item.id ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="max-h-[calc(70vh-7rem)] overflow-y-auto px-4 py-4 sm:max-h-[calc(100vh-12rem)]">
        {aba === "visao" && (
          <dl className="divide-y divide-border">
            <Linha rotulo="Código Único" valor={sistema.codigo} />
            <Linha rotulo="Nome" valor={sistema.nome} />
            <Linha rotulo="Endereço" valor={sistema.endereco} />
            <Linha rotulo="Município" valor={sistema.municipio} />
            <Linha rotulo="Categoria" valor={sistema.categoria} />
            <Linha rotulo="Tipo de Sistema" valor={sistema.tipo === "SAA" ? "SAA — Abastecimento de água" : "SES — Esgotamento sanitário"} />
            <Linha rotulo="Situação" valor={sistema.situacao} />
          </dl>
        )}

        {aba === "equip" &&
          (sistema.equipamentos.length === 0 ? (
            <Vazio texto="Não há equipamentos cadastrados para este bem" />
          ) : (
            <ul className="space-y-2">
              {sistema.equipamentos.map((eq) => (
                <li key={eq.id} className="rounded-md border border-border px-3 py-2.5">
                  <p className="text-sm font-medium text-foreground">{eq.nome}</p>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{eq.codigo}</span>
                    <span className={eq.situacao === "Operando" ? "text-brand" : ""}>{eq.situacao}</span>
                  </div>
                </li>
              ))}
            </ul>
          ))}

        {aba === "docs" &&
          (sistema.documentos.length === 0 ? (
            <Vazio texto="Não há documentos anexados a este bem" />
          ) : (
            <ul className="space-y-2">
              {sistema.documentos.map((doc) => (
                <li key={doc.id} className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5">
                  <FileText className="size-4 shrink-0 text-brand" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{doc.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.tipo} · {doc.tamanho}
                    </p>
                  </div>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
}
