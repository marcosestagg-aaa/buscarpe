import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { autenticado, entrar } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrar — BuscARPE" },
      { name: "description", content: "Acesse o BuscARPE, plataforma de consulta geográfica de sistemas de saneamento de Pernambuco." },
      { property: "og:title", content: "Entrar — BuscARPE" },
      { property: "og:description", content: "Plataforma de consulta geográfica de sistemas de saneamento de Pernambuco." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Login,
});

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (autenticado()) navigate({ to: "/mapa", replace: true });
  }, [navigate]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (entrar(email, senha)) navigate({ to: "/mapa", replace: true });
    else setErro(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <form onSubmit={enviar} className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-card p-6 shadow-panel">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-normal text-brand-deep">
            Busc<span className="text-brand">ARPE</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Plataforma de consulta geográfica de sistemas de saneamento de Pernambuco
          </p>
        </div>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-foreground">E-mail</span>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-foreground">Senha</span>
          <input type="password" required autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} className={inputClass} />
        </label>
        {erro && <p role="alert" className="text-sm text-destructive">E-mail ou senha inválidos</p>}
        <button type="submit" className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep">
          Entrar
        </button>
      </form>
    </main>
  );
}
