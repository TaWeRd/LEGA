// === ResumenCotizacion.tsx ===
// Cambios:
// - Se agregan gramaje/apertura en WhatsApp, Copiar, Resumen y Tabla
// - Se usa placeholder "—" cuando no hay valor seleccionado
// - Se integran nuevos campos: gramTelaSeleccionado y aperturaSeleccionada

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

  // ===========================================
  // TEXTO DETALLADO PARA WHATSAPP Y COPIAR
  // ===========================================
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
      texto += `• Tela: ${tela?.nombre || '—'}\n`;
      texto += `• Gramaje: ${cortina.gramTelaSeleccionado || '—'}\n`;
      texto += `• Apertura: ${cortina.aperturaSeleccionada || '—'}\n`;
      texto += `• Color: ${cortina.colorSeleccionado || '—'}\n`;
      texto += `• Sistema: ${sistema?.nombre || '—'}\n`;
      texto += `• Zócalo: ${cortina.zocaloForrado ? 'A la vista' : 'Forrado'}\n`;
      texto += `• Peso cadena: ${cortina.conPeso ? 'Sí' : 'No'}\n`;
      texto += `• Caja: ${cortina.caja ? 'Sí' : 'No'}\n`;

      if (cortina.ladoMando)
        texto += `• Mando: ${cortina.ladoMando === 'derecho' ? 'Derecho' : 'Izquierdo'}\n`;

      if (cortina.caidaTela)
        texto += `• Caída: ${cortina.caidaTela === 'detras' ? 'Por detrás' : 'Por delante'}\n`;

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

  // ===========================================
  // WHATSAPP + COPIAR + IMPRIMIR
  // ===========================================
  const compartirWhatsApp = () => {
    const r = validar();
    if (!r.valido) return toast({ title: 'Error', description: r.mensaje, variant: 'destructive' });

    window.open(`https://wa.me/?text=${encodeURIComponent(generarTexto())}`, '_blank');
    toast({ title: 'Éxito', description: 'Cotización lista para compartir' });
  };

  const copiarTexto = async () => {
    const r = validar();
    if (!r.valido) return toast({ title: 'Error', description: r.mensaje, variant: 'destructive' });

    try {
      await navigator.clipboard.writeText(generarTexto());
      toast({ title: 'Copiado', description: 'Cotización copiada al portapapeles' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo copiar', variant: 'destructive' });
    }
  };

  const abrirCotizacion = () => {
    const r = validar();
    if (!r.valido) return toast({ title: 'Error', description: r.mensaje, variant: 'destructive' });
    setModalOpen(true);
  };

  // ===========================================
  // RENDER
  // ===========================================
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

          {/* Cortinas Resumen */}
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

                  {/* Mostrar datos incluyendo gramaje y apertura */}
                  <p className="text-muted-foreground">{cortina.ancho}cm × {cortina.alto}cm</p>
                  <p className="text-muted-foreground">{tela?.nombre || '—'}</p>
                  <p className="text-muted-foreground">Gramaje: {cortina.gramTelaSeleccionado || '—'}</p>
                  <p className="text-muted-foreground">Apertura: {cortina.aperturaSeleccionada || '—'}</p>
                  <p className="text-muted-foreground">Color: {cortina.colorSeleccionado || '—'}</p>
                  <p className="text-muted-foreground">Sistema: {cortina.sistemaSeleccionado || '—'}</p>
                  <p className="text-muted-foreground">Lado del mando: {cortina.ladoMando || '—'}</p>
                  <p className="text-muted-foreground">Caida de tela: {cortina.caidaTela || '—'}</p>
                  <p className="text-muted-foreground">Zócalo forrado: {cortina.zocaloForrado ? 'Sí' : 'No'}</p>
                  <p className="text-muted-foreground">Peso cadena: {cortina.conPeso ? 'Sí' : 'No'}</p>
                  <p className="text-muted-foreground">Caja: {cortina.caja ? 'Sí' : 'No'}</p>
                  

                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-gold/20 to-primary/20 border border-gold/30">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total (sin IVA)</span>
              <span className="text-3xl font-body font-bold text-gold">
                ${totalGeneral.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-3">
            <Button onClick={abrirCotizacion} className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Generar Cotización Detallada
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

      {/* Modal Cotización Detallada */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="print:hidden">
            <DialogTitle className="flex items-center justify-between">
              <span>Cotización Detallada</span>
              <Button size="sm" variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1" /> Imprimir
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Parte imprimible */}
          <div className="print:p-8">
            
            {/* Encabezado */}
            <div className="border-b-2 border-gold pb-4 mb-6">
              <h1 className="text-3xl font-display font-bold text-primary">
                {precios.contacto.nombreEmpresa}
              </h1>
              <p className="text-muted-foreground">Cortinas Roller Profesionales</p>
            </div>

            {/* Tabla Detalle */}
            <h3 className="font-semibold text-lg mb-3">Detalle de Cortinas</h3>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Descripción</th>
                  <th className="border p-2 text-left">Medidas</th>
                  <th className="border p-2 text-right">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {cortinas.map((cortina, index) => {
                  const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
                  const sistema = precios.sistemas.find(s => s.id === cortina.sistemaSeleccionado);
                  const subtotal = calcularTotal(cortina);

                  return (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="border p-2">{index + 1}</td>

                      <td className="border p-2">
                        <p className="font-medium">{tela?.nombre || '—'}</p>
                        <p className="text-muted-foreground text-xs">
                          Gramaje: {cortina.gramTelaSeleccionado || '—'} |
                          Apertura: {cortina.aperturaSeleccionada || '—'} |
                          Color: {cortina.colorSeleccionado || '—'}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Sistema: {sistema?.nombre || '—'}
                        </p>
                      </td>

                      <td className="border p-2">
                        {cortina.ancho}cm × {cortina.alto}cm
                      </td>

                      <td className="border p-2 text-right font-semibold">
                        ${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr className="bg-gold/20 font-bold">
                  <td colSpan={3} className="border p-3 text-right">TOTAL (sin IVA):</td>
                  <td className="border p-3 text-right text-gold text-xl">
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
