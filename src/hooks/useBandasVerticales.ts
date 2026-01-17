import { useCallback, useMemo, useState } from "react";
import { Cliente } from "@/types/cortina";
import { BandaVertical, crearBandaVerticalNueva } from "@/types/bandaVertical";
import { calcularBandaVertical } from "@/pricing/bandasVerticales";

const toNumber = (value: string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const useBandasVerticales = () => {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const [bandas, setBandas] = useState<BandaVertical[]>([crearBandaVerticalNueva(1)]);
  const [bandaActiva, setBandaActiva] = useState(0);

  const agregarBanda = useCallback(() => {
    const nueva = crearBandaVerticalNueva(bandas.length + 1);
    setBandas((prev) => [...prev, nueva]);
    setBandaActiva(bandas.length);
  }, [bandas.length]);

  const eliminarBanda = useCallback((index: number) => {
    if (bandas.length === 1) return;
    setBandas((prev) => prev.filter((_, i) => i !== index));
    setBandaActiva((prev) => Math.min(prev, bandas.length - 2));
  }, [bandas.length]);

  const actualizarBanda = useCallback((index: number, campo: keyof BandaVertical, valor: string) => {
    setBandas((prev) => {
      const nuevas = [...prev];
      nuevas[index] = { ...nuevas[index], [campo]: valor };
      return nuevas;
    });
  }, []);

  const calcularPrecioBanda = useCallback((banda: BandaVertical) => {
    return calcularBandaVertical({
      tipoTela: banda.tipoTela,
      anchoTotal: toNumber(banda.anchoTotal),
      altoFinal: toNumber(banda.altoFinal),
      tipoSistema: banda.tipoSistema,
      anchoFinal: toNumber(banda.anchoFinal),
      tipoSoporte: banda.tipoSoporte,
      cantSoportesAPared: toNumber(banda.cantSoportesAPared),
      cantidadCortinas: Math.max(toNumber(banda.cantidadCortinas, 1), 1),
    });
  }, []);

  const totalGeneral = useMemo(() => {
    return bandas.reduce((total, banda) => total + calcularPrecioBanda(banda).precioTotal, 0);
  }, [bandas, calcularPrecioBanda]);

  const totalGeneralConIva = useMemo(() => {
    return bandas.reduce((total, banda) => total + calcularPrecioBanda(banda).precioTotalConIva, 0);
  }, [bandas, calcularPrecioBanda]);

  const validarBandas = useCallback((): { valido: boolean; mensaje?: string } => {
    if (!cliente.nombre.trim()) {
      return { valido: false, mensaje: "Por favor ingresa el nombre del cliente" };
    }
    if (!cliente.direccion.trim()) {
      return { valido: false, mensaje: "Por favor ingresa la direccion del cliente" };
    }

    for (let i = 0; i < bandas.length; i += 1) {
      const b = bandas[i];
      if (!b.tipoTela || !b.tipoSistema || !b.tipoSoporte) {
        return { valido: false, mensaje: `Completa los datos de la banda ${i + 1}` };
      }
      if (!b.anchoTotal || !b.altoFinal || !b.anchoFinal) {
        return { valido: false, mensaje: `Completa las medidas de la banda ${i + 1}` };
      }
      const cantidad = toNumber(b.cantidadCortinas, 0);
      if (cantidad <= 0) {
        return { valido: false, mensaje: `La cantidad debe ser mayor a 0 en la banda ${i + 1}` };
      }
      if (b.tipoSoporte === "SOPORTE A PARED" && toNumber(b.cantSoportesAPared, 0) <= 0) {
        return { valido: false, mensaje: `Indica la cantidad de soportes en la banda ${i + 1}` };
      }
    }

    return { valido: true };
  }, [bandas, cliente]);

  return {
    cliente,
    setCliente,
    bandas,
    bandaActiva,
    setBandaActiva,
    agregarBanda,
    eliminarBanda,
    actualizarBanda,
    calcularPrecioBanda,
    totalGeneral,
    totalGeneralConIva,
    validarBandas,
  };
};
