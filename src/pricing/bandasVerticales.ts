export const IVA_RATE = 0.21;

export const SUPPORT_PRICE_BY_TYPE: Record<string, number> = {
  "SOPORTE A TECHO": 0,
  "SOPORTE A PARED": 1539,
};

export const SYSTEM_PRICE_BY_TYPE: Record<string, number> = {
  "SISTEMA DE BANDAS VERTICALES A CORD\u00D3N BLANCO": 21714,
  "SISTEMA DE BANDAS VERTICALES A CORD\u00D3N NEGRO": 23236,
  "SISTEMA DE BANDAS VERTICALES A BAST\u00D3N": 23914,

  "ACCESORIOS PARA BANDAS  VERTICALES": 0,
  "CORREDERA PARA RIEL DE BANDAS VERTICALES": 1242,
  "CONTRAPESO PARA BANDA VERTICAL BLANCO": 1393,
  "CONTRAPESO PARA BANDA VERTICAL NEGRO": 1492,
  "COMANDO PARA BANDA VERTICAL IZQUIERDO Y DERECHO BLANCO": 2717,
};

export const FABRIC_PRICE_BY_TYPE: Record<string, number> = {
  "SCREEN 5% Colores: Blanco/Natural/Gris/Negro/Linen-Linen/Gris-Gris/Gris-Negro": 16010,
  "SCREEN 5% BICOLOR Colores: Glaciar, Arena, Corteza, Cocoa": 22453,
  "PolyScreen (Screen de Poliester) (ancho m\u00E1ximo 2.50m) Color: Blanco,  Blanco/Gris,  Beige/Blanco": 8130,

  "BLACK OUT 550grs PREMIUM 100%  Colores: Blanco/Natural/Beige/Gris/Negro": 11482,
  "BLACK OUT 440grs PREMIUM 100%  Colores: Blanco/Natural/Gris/Negro": 10208,
  "BLACK OUT ECO FRIENDLY LIBRE DE PVC (ancho m\u00E1ximo 2.50m) Colores: Blanco/ Natural/Gris": 8222,

  "POLI\u00C9STER EGIPCIA ": 22680,
  "ZAFIRO (ancho m\u00E1ximo 2.50m) Colores: Blanco/ Natural / Beige / Gris / Gris Topo / Chocolate": 11342,
  "MILAN (ancho m\u00E1ximo 2m) Colores: Camel / Vis\u00F3n / Blanco": 19137,
  "MARRUECOS (ancho maximo 2.50m)": 14459,
  "MONACO Colores: Gris/Mostaza/Terra": 14459,
  "GRECIA (ancho maximo 2.50m) Colores: Blanco / Natural": 12404,
  "TRASLUCIDA LINO (ancho maximo 2.50m)": 9922,
  "TRASLUCIDA CENIZA (ancho maximo 2.50m)": 9922,
  "TRASLUCIDA CHOCOMEL (ancho maximo 2.50m)": 9922,
  "TRASLUCIDA GRIS OXFORD (ancho maximo 2.50m)": 9922,
  "ATENAS (ancho maximo 2.50m) Colores: Blanco / Natural": 9922,
};

function safeLookup(map: Record<string, number>, key: string | null | undefined): number {
  if (!key) return 0;
  const v = map[key];
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

export type BandaVerticalInput = {
  tipoTela: string;
  anchoTotal: number;
  altoFinal: number;
  tipoSistema: string;
  anchoFinal: number;
  tipoSoporte: string;
  cantSoportesAPared: number;
  cantidadCortinas: number;
};

export type BandaVerticalResult = {
  valorTela: number;
  valorSistema: number;
  precioUnidad: number;
  precioTotal: number;
  precioTotalConIva: number;
};

export function calcularBandaVertical(input: BandaVerticalInput): BandaVerticalResult {
  const valorTela = safeLookup(FABRIC_PRICE_BY_TYPE, input.tipoTela);
  const valorSistema = safeLookup(SYSTEM_PRICE_BY_TYPE, input.tipoSistema);
  const valorSoporte = safeLookup(SUPPORT_PRICE_BY_TYPE, input.tipoSoporte);

  const precioUnidad =
    (input.anchoTotal * input.altoFinal * valorTela) +
    (input.anchoFinal * valorSistema) +
    (valorSoporte * input.cantSoportesAPared);

  const precioTotal = input.cantidadCortinas * precioUnidad;
  const precioTotalConIva = precioTotal * (1 + IVA_RATE);

  return { valorTela, valorSistema, precioUnidad, precioTotal, precioTotalConIva };
}
