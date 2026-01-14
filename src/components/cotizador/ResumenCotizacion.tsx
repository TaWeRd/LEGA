import { useState } from 'react';
import { Cliente, Cortina } from '@/types/cortina';
import { Precios } from '@/data/precios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Share2, MessageCircle, FileText, Calendar, User, Phone, Mail, MapPin, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ResumenCotizacionProps {
  cliente: Cliente;
  cortinas: Cortina[];
  precios: Precios;
  calcularTotal: (cortina: Cortina) => number;
  totalGeneral: number;
  validar: () => { valido: boolean; mensaje?: string };
}

export const ResumenCotizacion = ({
  cliente,
  cortinas,
  precios,
  calcularTotal,
  totalGeneral,
  validar
}: ResumenCotizacionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const totalCampos = 2 + cortinas.length * 7;
  const completados =
    (cliente.nombre.trim() ? 1 : 0) +
    (cliente.direccion.trim() ? 1 : 0) +
    cortinas.reduce((acc, c) => {
      let count = 0;
      if (c.ancho) count += 1;
      if (c.alto) count += 1;
      if (c.telaSeleccionada) count += 1;
      if (c.sistemaSeleccionado) count += 1;
      if (c.colorSeleccionado) count += 1;
      if (c.ladoMando) count += 1;
      if (c.caidaTela) count += 1;
      return acc + count;
    }, 0);
  const avance = totalCampos > 0 ? Math.round((completados / totalCampos) * 100) : 0;
  const cotizacionCompleta = avance === 100;

  const generarTexto = () => {
    const { contacto } = precios;
    let texto = `COTIZACION ${contacto.nombreEmpresa}\n`;
    texto += `------------------------------\n\n`;
    texto += `Cliente: ${cliente.nombre}\n`;
    if (cliente.telefono) texto += `Telefono: ${cliente.telefono}\n`;
    if (cliente.email) texto += `Email: ${cliente.email}\n`;
    if (cliente.direccion) texto += `Direccion: ${cliente.direccion}\n`;
    texto += `Fecha: ${new Date().toLocaleDateString('es-AR')}\n\n`;

    cortinas.forEach((cortina, index) => {
      const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
      const sistema = precios.sistemas.find(s => s.id === cortina.sistemaSeleccionado);

      texto += `CORTINA ${index + 1}\n`;
      texto += `Medidas: ${cortina.ancho}cm x ${cortina.alto}cm\n`;
      texto += `Tela: ${tela?.nombre || '-'}\n`;
      texto += `Gramaje: ${cortina.gramTelaSeleccionado || '-'}\n`;
      texto += `Apertura: ${cortina.aperturaSeleccionada || '-'}\n`;
      texto += `Color: ${cortina.colorSeleccionado || '-'}\n`;
      texto += `Sistema: ${sistema?.nombre || '-'}\n`;
      texto += `Zocalo: ${cortina.zocaloForrado ? 'A la vista' : 'Forrado'}\n`;
      texto += `Peso cadena: ${cortina.conPeso ? 'Si' : 'No'}\n`;
      texto += `Caja: ${cortina.caja ? 'Si' : 'No'}\n`;
      if (cortina.ladoMando) {
        texto += `Mando: ${cortina.ladoMando === 'derecho' ? 'Derecho' : 'Izquierdo'}\n`;
      }
      if (cortina.caidaTela) {
        texto += `Caida: ${cortina.caidaTela === 'detras' ? 'Por detras' : 'Por delante'}\n`;
      }
      texto += `Subtotal: $${calcularTotal(cortina).toLocaleString('es-AR', { minimumFractionDigits: 2 })}\n\n`;
    });

    texto += `------------------------------\n`;
    texto += `TOTAL: $${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}\n\n`;
    texto += `${contacto.telefono}\n`;
    texto += `${contacto.email}\n`;
    texto += `${contacto.nombreEmpresa}\n`;

    return texto;
  };

  const compartirWhatsApp = () => {
    const r = validar();
    if (!r.valido) return toast({ title: 'Error', description: r.mensaje, variant: 'destructive' });
    window.open(`https://wa.me/?text=${encodeURIComponent(generarTexto())}`, '_blank');
    toast({ title: 'Exito', description: 'Cotizacion lista para compartir' });
  };

  const copiarTexto = async () => {
    const r = validar();
    if (!r.valido) return toast({ title: 'Error', description: r.mensaje, variant: 'destructive' });
    try {
      await navigator.clipboard.writeText(generarTexto());
      toast({ title: 'Copiado', description: 'Cotizacion copiada al portapapeles' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo copiar', variant: 'destructive' });
    }
  };

  const abrirCotizacion = () => {
    const r = validar();
    if (!r.valido) return toast({ title: 'Error', description: r.mensaje, variant: 'destructive' });
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
              <p className="flex items-center gap-2"><User className="w-4 h-4 text-gold" /> {cliente.nombre || '-'}</p>
              {cliente.telefono && <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> {cliente.telefono}</p>}
              {cliente.email && <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> {cliente.email}</p>}
              {cliente.direccion && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {cliente.direccion}</p>}
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {new Date().toLocaleDateString('es-AR')}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Cortinas</h4>
            {cortinas.map((cortina, index) => {
              const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
              const subtotal = calcularTotal(cortina);

              return (
                <div key={cortina.id} className="p-3 rounded-lg bg-secondary/50 space-y-1 text-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Cortina {index + 1}</span>
                    <span className="font-semibold text-gold">
                      ${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{cortina.ancho}cm x {cortina.alto}cm</p>
                  <p className="text-muted-foreground">{tela?.nombre || '-'}</p>
                  <p className="text-muted-foreground">Gramaje: {cortina.gramTelaSeleccionado || '-'}</p>
                  <p className="text-muted-foreground">Apertura: {cortina.aperturaSeleccionada || '-'}</p>
                  <p className="text-muted-foreground">Color: {cortina.colorSeleccionado || '-'}</p>
                  <p className="text-muted-foreground">Sistema: {cortina.sistemaSeleccionado || '-'}</p>
                  <p className="text-muted-foreground">Lado del mando: {cortina.ladoMando || '-'}</p>
                  <p className="text-muted-foreground">Caida de tela: {cortina.caidaTela || '-'}</p>
                  <p className="text-muted-foreground">Zocalo forrado: {cortina.zocaloForrado ? 'Si' : 'No'}</p>
                  <p className="text-muted-foreground">Peso cadena: {cortina.conPeso ? 'Si' : 'No'}</p>
                  <p className="text-muted-foreground">Caja: {cortina.caja ? 'Si' : 'No'}</p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-gold/20 to-primary/20 border border-gold/30">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total (sin IVA)</span>
              <span className="text-3xl font-body font-bold text-gold">
                ${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={abrirCotizacion}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground"
              disabled={!cotizacionCompleta}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar Cotizacion Detallada
            </Button>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={compartirWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white"
                disabled={!cotizacionCompleta}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={copiarTexto} className="flex-1" disabled={!cotizacionCompleta}>
                <Share2 className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Avance de cotizacion</span>
              <span>{avance}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
              <div className="h-full bg-gold transition-all" style={{ width: `${avance}%` }} />
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
                <p className="font-display text-lg font-semibold">{precios.contacto.nombreEmpresa}</p>
                <p className="text-xs text-muted-foreground">Cortinas Roller Profesionales</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Presupuesto</p>
                <p className="text-sm font-semibold">Fecha: {new Date().toLocaleDateString('es-AR')}</p>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden mb-6 print:w-full print:max-w-none">
              <div className="px-6 py-4 text-sm">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase text-xs tracking-wide">Cliente</p>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p><span className="font-medium">Nombre:</span> {cliente.nombre || '-'}</p>
                      <p><span className="font-medium">Direccion:</span> {cliente.direccion || '-'}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase text-xs tracking-wide">Contacto</p>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p><span className="font-medium">Telefono:</span> {cliente.telefono || '-'}</p>
                      <p><span className="font-medium">Email:</span> {cliente.email || '-'}</p>
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
                {cortinas.map((cortina, index) => {
                  const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
                  const sistema = precios.sistemas.find(s => s.id === cortina.sistemaSeleccionado);
                  const subtotal = calcularTotal(cortina);
                  const medidas = `${cortina.ancho}cm x ${cortina.alto}cm`;

                  return (
                    <tr key={cortina.id} className="hover:bg-muted/50">
                      <td className="border border-border p-2">
                        <p className="font-medium">{index + 1}. {tela?.nombre || '-'}</p>
                        <p className="text-muted-foreground text-xs">{medidas}</p>
                        <p className="text-muted-foreground text-xs">
                          Gramaje: {cortina.gramTelaSeleccionado || '-'} | Apertura: {cortina.aperturaSeleccionada || '-'}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Color: {cortina.colorSeleccionado || '-'} | Sistema: {sistema?.nombre || '-'}
                        </p>
                      </td>
                      <td className="border border-border p-2 text-center">1</td>
                      <td className="border border-border p-2 text-right">
                        ${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="border border-border p-2 text-right font-semibold">
                        ${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gold/20 font-bold">
                  <td colSpan={3} className="border border-border p-3 text-right">TOTAL:</td>
                  <td className="border border-border p-3 text-right text-gold text-xl">
                    ${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
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
