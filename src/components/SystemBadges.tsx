import { Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SituacaoBem, TipoSistema, VisibilidadeBem } from "@/types/system";

export function VisibilityBadge({ valor, compacto = false }: { valor: VisibilidadeBem; compacto?: boolean }) {
  const superficial = valor === "Superficial";
  const Icon = superficial ? Eye : EyeOff;
  return <Badge variant="outline" className={`gap-1.5 whitespace-normal ${superficial ? "border-success/25 bg-success/10 text-success" : "border-warning/25 bg-warning/10 text-warning"}`}>
    <Icon className="size-3.5 shrink-0" />
    {compacto ? valor : superficial ? "Superficial (Visível)" : "Enterrado / Subterrâneo (Invisível)"}
  </Badge>;
}

export function SystemBadge({ tipo }: { tipo: TipoSistema }) {
  return <Badge variant="outline" className={tipo === "SAA" ? "border-saa/25 bg-saa/10 text-saa" : "border-ses/25 bg-ses/10 text-ses"}>{tipo}</Badge>;
}

export function StatusBadge({ situacao }: { situacao: SituacaoBem }) {
  return <Badge variant="outline" className={`gap-1.5 ${situacao === "Operando" ? "border-success/25 text-success" : situacao === "Inoperante" ? "border-destructive/25 text-destructive" : "text-muted-foreground"}`}>
    <span className="size-1.5 rounded-full bg-current" />{situacao}
  </Badge>;
}