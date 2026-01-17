export interface BandaVertical {
  id: number;
  tipoTela: string;
  anchoTotal: string;
  altoFinal: string;
  tipoSistema: string;
  anchoFinal: string;
  tipoSoporte: string;
  cantSoportesAPared: string;
  cantidadCortinas: string;
}

export const crearBandaVerticalNueva = (id: number): BandaVertical => ({
  id,
  tipoTela: "",
  anchoTotal: "",
  altoFinal: "",
  tipoSistema: "",
  anchoFinal: "",
  tipoSoporte: "",
  cantSoportesAPared: "",
  cantidadCortinas: "1",
});
