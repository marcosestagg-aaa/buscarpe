import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { PERNAMBUCO_CENTER, PERNAMBUCO_ZOOM } from "@/data/mockSystems";
import type { SistemaSaneamento } from "@/types/system";

interface SystemMapProps {
  sistemas: SistemaSaneamento[];
  selecionadoId: string | null;
  onSelecionar: (sistema: SistemaSaneamento) => void;
}

function criarIcone(sistema: SistemaSaneamento, ativo: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="marker-pin" data-tipo="${sistema.tipo}" data-situacao="${sistema.situacao}" data-active="${ativo}"><span>${sistema.tipo}</span></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });
}

export default function SystemMap({ sistemas, selecionadoId, onSelecionar }: SystemMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: PERNAMBUCO_CENTER,
      zoom: PERNAMBUCO_ZOOM,
      zoomControl: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: "topleft" }).addTo(map);

    // Recentraliza em Pernambuco
    const RecentrarControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        const link = L.DomUtil.create("a", "", div) as HTMLAnchorElement;
        link.href = "#";
        link.title = "Recentralizar em Pernambuco";
        link.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="margin:9px auto"><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>';
        L.DomEvent.on(link, "click", (e) => {
          L.DomEvent.preventDefault(e);
          map.setView(PERNAMBUCO_CENTER, PERNAMBUCO_ZOOM);
        });
        return div;
      },
    });
    new RecentrarControl({ position: "topleft" }).addTo(map);


    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  useEffect(() => {
    const grupo = markersRef.current;
    if (!grupo) return;
    grupo.clearLayers();

    sistemas.forEach((sistema) => {
      L.marker([sistema.latitude, sistema.longitude], {
        icon: criarIcone(sistema, sistema.id === selecionadoId),
        title: sistema.nome,
      })
        .on("click", () => onSelecionar(sistema))
        .addTo(grupo);
    });
  }, [sistemas, selecionadoId, onSelecionar]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
