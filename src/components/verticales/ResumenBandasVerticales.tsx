import { useState } from "react";
import { BandaVertical } from "@/types/bandaVertical";
import { Cliente } from "@/types/cortina";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, FileText, Mail, MapPin, MessageCircle, Phone, Printer, Share2, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { calcularBandaVertical, IVA_RATE } from "@/pricing/bandasVerticales";

interface ResumenBandasVerticalesProps {
  cliente: Cliente;
  bandas: BandaVertical[];
  totalGeneral: number;
  totalGeneralConIva: number;
  validar: () => { valido: boolean; mensaje?: string };
}

const EMOJI = {
  documento: String.fromCodePoint(0x1F4C4),
  archivo: String.fromCodePoint(0x1F5C2, 0xFE0F),
  cliente: String.fromCodePoint(0x1F464),
  telefono: String.fromCodePoint(0x1F4DE),
  email: String.fromCodePoint(0x1F4E7),
  direccion: String.fromCodePoint(0x1F4CD),
  fecha: String.fromCodePoint(0x1F4C5),
  cortina: String.fromCodePoint(0x1F3E0),
  medidas: String.fromCodePoint(0x1F4CF),
  tela: String.fromCodePoint(0x1F9F5),
  detalle: String.fromCodePoint(0x1F4CB),
  sistema: String.fromCodePoint(0x2699, 0xFE0F),
  subtotal: String.fromCodePoint(0x1F9FE),
  total: String.fromCodePoint(0x1F4B5),
  empresa: String.fromCodePoint(0x1F3E2),
  correoEmpresa: String.fromCodePoint(0x1F4E9),
};

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const ResumenBandasVerticales = ({
  cliente,
  bandas,
  totalGeneral,
  totalGeneralConIva,
  validar,
}: ResumenBandasVerticalesProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const generarTexto = () => {
    let texto = `${EMOJI.documento} Cotizacion / Bandas Verticales\n`;
    texto += `${EMOJI.archivo} LEGA CORTINAS\n`;
    texto += `------------------------------\n\n`;
    texto += `${EMOJI.cliente} Cliente / Contacto\n`;
    texto += `${EMOJI.cliente} Cliente: ${cliente.nombre}\n`;
    if (cliente.telefono) texto += `${EMOJI.telefono} Telefono: ${cliente.telefono}\n`;
    if (cliente.email) texto += `${EMOJI.email} Email: ${cliente.email}\n`;
    if (cliente.direccion) texto += `${EMOJI.direccion} Direccion: ${cliente.direccion}\n`;
    texto += `${EMOJI.fecha} Fecha: ${new Date().toLocaleDateString("es-AR")}\n\n`;

    bandas.forEach((banda, index) => {
      const result = calcularBandaVertical({
        tipoTela: banda.tipoTela,
        anchoTotal: toNumber(banda.anchoTotal),
        altoFinal: toNumber(banda.altoFinal),
        tipoSistema: banda.tipoSistema,
        anchoFinal: toNumber(banda.anchoFinal),
        tipoSoporte: banda.tipoSoporte,
        cantSoportesAPared: toNumber(banda.cantSoportesAPared),
        cantidadCortinas: Math.max(toNumber(banda.cantidadCortinas), 1),
      });

      texto += `${EMOJI.cortina} Banda ${index + 1}\n`;
      texto += `${EMOJI.medidas} Medidas: ${banda.anchoTotal}m x ${banda.altoFinal}m\n`;
      texto += `${EMOJI.tela} Tela: ${banda.tipoTela || "-"}\n`;
      texto += `${EMOJI.sistema} Sistema: ${banda.tipoSistema || "-"}\n`;
      texto += `${EMOJI.detalle} Soporte: ${banda.tipoSoporte || "-"}\n`;
      texto += `${EMOJI.detalle} Ancho final: ${banda.anchoFinal || "-"}m\n`;
      texto += `${EMOJI.detalle} Cantidad: ${banda.cantidadCortinas || "-"}\n`;
      if (banda.tipoSoporte === "SOPORTE A PARED") {
        texto += `${EMOJI.detalle} Soportes pared: ${banda.cantSoportesAPared || "-"}\n`;
      }
      texto += `${EMOJI.subtotal} Subtotal: $${result.precioTotal.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
      })}\n\n`;
    });

    texto += `------------------------------\n`;
    texto += `${EMOJI.total} Total (sin IVA): $${totalGeneral.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
    })}\n`;
    texto += `${EMOJI.total} Total (con IVA): $${totalGeneralConIva.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
    })}\n\n`;
    texto += `${EMOJI.empresa} Empresa: LEGA CORTINAS\n`;
    texto += `${EMOJI.telefono} 1123977924\n`;
    texto += `${EMOJI.correoEmpresa} rollerlega@mail.com\n`;

    return texto;
  };

  const compartirWhatsApp = () => {
    const r = validar();
    if (!r.valido) return toast({ title: "Error", description: r.mensaje, variant: "destructive" });
    window.open(`https://wa.me/?text=${encodeURIComponent(generarTexto())}`, "_blank");
    toast({ title: "Exito", description: "Cotizacion lista para compartir" });
  };

  const copiarTexto = async () => {
    const r = validar();
    if (!r.valido) return toast({ title: "Error", description: r.mensaje, variant: "destructive" });
    try {
      await navigator.clipboard.writeText(generarTexto());
      toast({ title: "Copiado", description: "Cotizacion copiada al portapapeles" });
    } catch {
      toast({ title: "Error", description: "No se pudo copiar", variant: "destructive" });
    }
  };

  const abrirCotizacion = () => {
    const r = validar();
    if (!r.valido) return toast({ title: "Error", description: r.mensaje, variant: "destructive" });
    setModalOpen(true);
  };

  return (
    <>
      <Card className="shadow-soft border-gold/20 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardTitle className="font-display text-xl flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Resumen de Cotizacion
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Cliente</h4>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold" /> {cliente.nombre || "-"}
              </p>
              {cliente.telefono && (
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" /> {cliente.telefono}
                </p>
              )}
              {cliente.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" /> {cliente.email}
                </p>
              )}
              {cliente.direccion && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" /> {cliente.direccion}
                </p>
              )}
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" /> {new Date().toLocaleDateString("es-AR")}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Bandas</h4>
            {bandas.map((banda, index) => {
              const result = calcularBandaVertical({
                tipoTela: banda.tipoTela,
                anchoTotal: toNumber(banda.anchoTotal),
                altoFinal: toNumber(banda.altoFinal),
                tipoSistema: banda.tipoSistema,
                anchoFinal: toNumber(banda.anchoFinal),
                tipoSoporte: banda.tipoSoporte,
                cantSoportesAPared: toNumber(banda.cantSoportesAPared),
                cantidadCortinas: Math.max(toNumber(banda.cantidadCortinas), 1),
              });

              return (
                <div key={banda.id} className="p-3 rounded-lg bg-secondary/50 space-y-1 text-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Banda {index + 1}</span>
                    <span className="font-semibold text-gold">
                      ${result.precioTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {banda.anchoTotal}m x {banda.altoFinal}m
                  </p>
                  <p className="text-muted-foreground">Tela: {banda.tipoTela || "-"}</p>
                  <p className="text-muted-foreground">Sistema: {banda.tipoSistema || "-"}</p>
                  <p className="text-muted-foreground">Soporte: {banda.tipoSoporte || "-"}</p>
                  <p className="text-muted-foreground">Ancho final: {banda.anchoFinal || "-"}m</p>
                  <p className="text-muted-foreground">Cantidad: {banda.cantidadCortinas || "-"}</p>
                  {banda.tipoSoporte === "SOPORTE A PARED" && (
                    <p className="text-muted-foreground">
                      Soportes pared: {banda.cantSoportesAPared || "-"}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-gold/20 to-primary/20 border border-gold/30 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total (sin IVA)</span>
              <span className="text-2xl font-body font-bold text-gold">
                ${totalGeneral.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Total (con IVA {Math.round(IVA_RATE * 100)}%)</span>
              <span>
                ${totalGeneralConIva.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={abrirCotizacion}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar Cotizacion Detallada
            </Button>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={compartirWhatsApp} className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={copiarTexto} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[980px] max-w-[95vw] max-h-[90vh] overflow-y-auto print:relative print:left-0 print:top-0 print:transform-none print:max-w-none print:w-full print:h-auto print:overflow-visible print:border-none print:shadow-none print:rounded-none">
          <DialogHeader className="print:hidden">
            <DialogTitle className="flex items-center justify-between">
              <span>Cotizacion Detallada</span>
              <Button size="sm" variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1" /> Imprimir
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="print-area print:p-8 print:w-full print:max-w-none">
            <div className="flex items-center justify-between bg-secondary px-6 py-4 rounded-lg mb-4 print:w-full print:max-w-none">
              <div>
                <p className="font-display text-lg font-semibold">LEGA CORTINAS</p>
                <p className="text-xs text-muted-foreground">Bandas Verticales Profesionales</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Presupuesto</p>
                <p className="text-sm font-semibold">Fecha: {new Date().toLocaleDateString("es-AR")}</p>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden mb-6 print:w-full print:max-w-none">
              <div className="px-6 py-4 text-sm">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase text-xs tracking-wide">Cliente</p>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p>
                        <span className="font-medium">Nombre:</span> {cliente.nombre || "-"}
                      </p>
                      <p>
                        <span className="font-medium">Direccion:</span> {cliente.direccion || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase text-xs tracking-wide">Contacto</p>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p>
                        <span className="font-medium">Telefono:</span> {cliente.telefono || "-"}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {cliente.email || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="border border-border p-2 text-left">Descripcion</th>
                  <th className="border border-border p-2 text-center">Cantidad</th>
                  <th className="border border-border p-2 text-right">Precio Unit.</th>
                  <th className="border border-border p-2 text-right">Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {bandas.map((banda, index) => {
                  const result = calcularBandaVertical({
                    tipoTela: banda.tipoTela,
                    anchoTotal: toNumber(banda.anchoTotal),
                    altoFinal: toNumber(banda.altoFinal),
                    tipoSistema: banda.tipoSistema,
                    anchoFinal: toNumber(banda.anchoFinal),
                    tipoSoporte: banda.tipoSoporte,
                    cantSoportesAPared: toNumber(banda.cantSoportesAPared),
                    cantidadCortinas: Math.max(toNumber(banda.cantidadCortinas), 1),
                  });
                  const medidas = `${banda.anchoTotal}m x ${banda.altoFinal}m`;

                  return (
                    <tr key={banda.id} className="hover:bg-muted/50">
                      <td className="border border-border p-2">
                        <p className="font-medium">{index + 1}. {banda.tipoTela || "-"}</p>
                        <p className="text-muted-foreground text-xs">{medidas}</p>
                        <p className="text-muted-foreground text-xs">
                          Sistema: {banda.tipoSistema || "-"} | Soporte: {banda.tipoSoporte || "-"}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Ancho final: {banda.anchoFinal || "-"}m
                        </p>
                      </td>
                      <td className="border border-border p-2 text-center">
                        {Math.max(toNumber(banda.cantidadCortinas), 1)}
                      </td>
                      <td className="border border-border p-2 text-right">
                        ${result.precioUnidad.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-border p-2 text-right font-semibold">
                        ${result.precioTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gold/20 font-bold">
                  <td colSpan={3} className="border border-border p-3 text-right">TOTAL (sin IVA):</td>
                  <td className="border border-border p-3 text-right text-gold text-xl">
                    ${totalGeneral.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-secondary font-bold">
                  <td colSpan={3} className="border border-border p-3 text-right">
                    TOTAL (con IVA):
                  </td>
                  <td className="border border-border p-3 text-right text-gold text-xl">
                    ${totalGeneralConIva.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
