// Login SIMULADO do protótipo (sem backend). Não use em produção.
const KEY = "buscarpe-auth";
const EMAIL = "arpe@email.com";
const SENHA = "senha123";

export function entrar(email: string, senha: string): boolean {
  const ok = email.trim().toLowerCase() === EMAIL && senha === SENHA;
  if (ok) localStorage.setItem(KEY, "1");
  return ok;
}

export function sair() {
  localStorage.removeItem(KEY);
}

export function autenticado(): boolean {
  return typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
}

export function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
