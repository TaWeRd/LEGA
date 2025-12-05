import { useState } from 'react';
import { Cliente, Cortina } from '@/types/cortina';
import { Precios } from '@/data/precios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Share2, MessageCircle, FileText, Calendar, User, Phone, Mail, MapPin, Printer, X } from 'lucide-react';
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

  const generarTexto = () => {
    const { contacto } = precios;
    let texto = `📋 COTIZACIÓN ${contacto.nombreEmpresa}\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    texto += `👤 Cliente: ${cliente.nombre}\n`;
    texto += `📞 Teléfono: ${cliente.telefono}\n`;
    if (cliente.email) texto += `📧 Email: ${cliente.email}\n`;
    if (cliente.direccion) texto += `📍 Dirección: ${cliente.direccion}\n`;
    texto += `📅 Fecha: ${new Date().toLocaleDateString('es-AR')}\n\n`;

    cortinas.forEach((cortina, index) => {
      const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
      const sistema = precios.sistemas.find(s => s.id === cortina.sistemaSeleccionado);
      
      texto += `🏠 CORTINA ${index + 1}\n`;
      texto += `• Medidas: ${cortina.ancho}cm × ${cortina.alto}cm\n`;
      texto += `• Tela: ${tela?.nombre || '-'}\n`;
      if (cortina.colorSeleccionado) texto += `• Color: ${cortina.colorSeleccionado}\n`;
      texto += `• Sistema: ${sistema?.nombre || '-'}\n`;
      texto += `• Zócalo: ${cortina.zocaloForrado ? 'A la vista' : 'Forrado'}\n`;
      texto += `• Peso cadena: ${cortina.conPeso ? 'Sí' : 'No'}\n`;
      if (cortina.ladoMando) texto += `• Mando: ${cortina.ladoMando === 'derecho' ? 'Derecho' : 'Izquierdo'}\n`;
      if (cortina.caidaTela) texto += `• Caída: ${cortina.caidaTela === 'detras' ? 'Por detrás' : 'Por delante'}\n`;
      texto += `💰 Subtotal: $${calcularTotal(cortina).toLocaleString('es-AR', { minimumFractionDigits: 2 })}\n\n`;
    });

    texto += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `💵 TOTAL: $${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}\n`;
    texto += `⚡ Precio sin IVA\n\n`;
    texto += `📞 ${contacto.telefono}\n`;
    texto += `📧 ${contacto.email}\n`;
    texto += `${contacto.nombreEmpresa} ✨`;

    return texto;
  };

  const compartirWhatsApp = () => {
    const resultado = validar();
    if (!resultado.valido) {
      toast({ title: 'Error', description: resultado.mensaje, variant: 'destructive' });
      return;
    }

    const texto = encodeURIComponent(generarTexto());
    window.open(`https://wa.me/?text=${texto}`, '_blank');
    toast({ title: 'Éxito', description: 'Cotización lista para compartir' });
  };

  const copiarTexto = async () => {
    const resultado = validar();
    if (!resultado.valido) {
      toast({ title: 'Error', description: resultado.mensaje, variant: 'destructive' });
      return;
    }

    try {
      await navigator.clipboard.writeText(generarTexto());
      toast({ title: 'Copiado', description: 'Cotización copiada al portapapeles' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo copiar', variant: 'destructive' });
    }
  };

  const abrirCotizacion = () => {
    const resultado = validar();
    if (!resultado.valido) {
      toast({ title: 'Error', description: resultado.mensaje, variant: 'destructive' });
      return;
    }
    setModalOpen(true);
  };

  const imprimirCotizacion = () => {
    window.print();
  };

  return (
    <>
      <Card className="shadow-soft border-gold/20 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardTitle className="font-display text-xl flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Resumen de Cotización
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Cliente */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Cliente</h4>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2"><User className="w-4 h-4 text-gold" /> {cliente.nombre || '—'}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> {cliente.telefono || '—'}</p>
              {cliente.email && <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> {cliente.email}</p>}
              {cliente.direccion && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {cliente.direccion}</p>}
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {new Date().toLocaleDateString('es-AR')}</p>
            </div>
          </div>

          {/* Cortinas */}
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
                  {cortina.ancho && cortina.alto && (
                    <p className="text-muted-foreground">{cortina.ancho}cm × {cortina.alto}cm</p>
                  )}
                  {tela && <p className="text-muted-foreground">{tela.nombre}</p>}
                  {cortina.colorSeleccionado && (
                    <p className="text-muted-foreground">Color: {cortina.colorSeleccionado}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-gold/20 to-primary/20 border border-gold/30">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total (sin IVA)</span>
              <span className="text-3xl font-display font-bold text-gold">
                ${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-3">
            <Button
              onClick={abrirCotizacion}
              className="w-full bg-gold hover:bg-gold/90 text-gold-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar Cotización Detallada
            </Button>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={compartirWhatsApp}
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={copiarTexto}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Cotización Detallada */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto print:max-w-none print:max-h-none print:overflow-visible">
          <DialogHeader className="print:hidden">
            <DialogTitle className="flex items-center justify-between">
              <span>Cotización Detallada</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={imprimirCotizacion}>
                  <Printer className="w-4 h-4 mr-1" /> Imprimir
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Contenido imprimible */}
          <div className="print:p-8" id="cotizacion-print">
            {/* Encabezado */}
            <div className="border-b-2 border-gold pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-display font-bold text-primary">
                    {precios.contacto.nombreEmpresa}
                  </h1>
                  <p className="text-muted-foreground">Cortinas Roller Profesionales</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>📞 {precios.contacto.telefono}</p>
                  <p>📧 {precios.contacto.email}</p>
                </div>
              </div>
            </div>

            {/* Título Cotización */}
            <div className="bg-primary/10 rounded-lg p-4 mb-6 text-center">
              <h2 className="text-2xl font-display font-bold text-primary">COTIZACIÓN</h2>
              <p className="text-muted-foreground">Fecha: {new Date().toLocaleDateString('es-AR')}</p>
            </div>

            {/* Datos del Cliente */}
            <div className="mb-6 p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-gold" /> Datos del Cliente
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium">Nombre:</span> {cliente.nombre}</div>
                <div><span className="font-medium">Teléfono:</span> {cliente.telefono}</div>
                {cliente.email && <div><span className="font-medium">Email:</span> {cliente.email}</div>}
                {cliente.direccion && <div className="col-span-2"><span className="font-medium">Dirección:</span> {cliente.direccion}</div>}
              </div>
            </div>

            {/* Detalle de Cortinas */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Detalle de Cortinas</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="border border-border p-2 text-left">#</th>
                    <th className="border border-border p-2 text-left">Descripción</th>
                    <th className="border border-border p-2 text-left">Medidas</th>
                    <th className="border border-border p-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cortinas.map((cortina, index) => {
                    const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
                    const sistema = precios.sistemas.find(s => s.id === cortina.sistemaSeleccionado);
                    const subtotal = calcularTotal(cortina);

                    return (
                      <tr key={cortina.id} className="hover:bg-muted/50">
                        <td className="border border-border p-2 font-medium">{index + 1}</td>
                        <td className="border border-border p-2">
                          <div className="space-y-1">
                            <p className="font-medium">{tela?.nombre || '-'}</p>
                            {cortina.colorSeleccionado && <p className="text-muted-foreground">Color: {cortina.colorSeleccionado}</p>}
                            <p className="text-muted-foreground">{sistema?.nombre || '-'}</p>
                            <p className="text-muted-foreground text-xs">
                              Zócalo: {cortina.zocaloForrado ? 'A la vista' : 'Forrado'} | 
                              Peso: {cortina.conPeso ? 'Sí' : 'No'}
                              {cortina.ladoMando && ` | Mando: ${cortina.ladoMando === 'derecho' ? 'Der.' : 'Izq.'}`}
                              {cortina.caidaTela && ` | Caída: ${cortina.caidaTela === 'detras' ? 'Detrás' : 'Delante'}`}
                            </p>
                          </div>
                        </td>
                        <td className="border border-border p-2 whitespace-nowrap">
                          {cortina.ancho}cm × {cortina.alto}cm
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
                    <td colSpan={3} className="border border-border p-3 text-right text-lg">
                      TOTAL (sin IVA):
                    </td>
                    <td className="border border-border p-3 text-right text-xl text-gold">
                      ${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Notas */}
            <div className="border-t border-border pt-4 text-sm text-muted-foreground">
              <p className="mb-2"><strong>Notas:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Precios expresados sin IVA</li>
                <li>Cotización válida por 15 días</li>
                <li>Medidas mínimas: 100cm × 100cm</li>
                <li>Tiempo de entrega: consultar disponibilidad</li>
              </ul>
            </div>

            {/* Pie */}
            <div className="mt-8 pt-4 border-t-2 border-gold text-center text-sm text-muted-foreground">
              <p className="font-semibold text-primary">{precios.contacto.nombreEmpresa}</p>
              <p>¡Gracias por confiar en nosotros!</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};