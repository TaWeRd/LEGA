import { useState, useEffect } from 'react';
import { usePrecios } from '@/hooks/usePrecios';
import { useCotizador } from '@/hooks/useCotizador';
import { ClienteForm } from '@/components/cotizador/ClienteForm';
import { CortinaEditor } from '@/components/cotizador/CortinaEditor';
import { CortinaTabs } from '@/components/cotizador/CortinaTabs';
import { ResumenCotizacion } from '@/components/cotizador/ResumenCotizacion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RefreshCw, User, Home, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const Index = () => {
  const { precios, cargando, recargar } = usePrecios();
  const {
    cliente,
    setCliente,
    cortinas,
    cortinaActiva,
    setCortinaActiva,
    agregarCortina,
    eliminarCortina,
    actualizarCortina,
    calcularTotalCortina,
    calcularTotalGeneral,
    validarCotizacion,
    porcentajeExtra,
    setPorcentajeExtra
  } = useCotizador(precios);

  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (mostrarSplash) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-cream to-background">
        <div className="text-center animate-fade-in space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-gold rounded-2xl flex items-center justify-center shadow-lg">
            <Home className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">
            {precios.contacto.nombreEmpresa}
          </h1>
          <p className="text-muted-foreground">Cotizador Profesional</p>
          <div className="flex justify-center gap-1 pt-4">
            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-gold rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-lg font-semibold">{precios.contacto.nombreEmpresa}</h1>
                <p className="text-xs text-muted-foreground">Cotizador de Cortinas Roller</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={recargar}
              disabled={cargando}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${cargando ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar precios</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Cliente */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-gold" />
                  Datos del Cliente
                </CardTitle>
                <CardDescription>Información de contacto para la cotización</CardDescription>
              </CardHeader>
              <CardContent>
                <ClienteForm cliente={cliente} onChange={setCliente} />
              </CardContent>
            </Card>

            {/* Porcentaje Extra */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Percent className="w-5 h-5 text-gold" />
                  Porcentaje Extra
                </CardTitle>
                <CardDescription>Ajuste adicional al precio de cada cortina</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Porcentaje:</Label>
                    <span className="text-2xl font-bold text-primary">{porcentajeExtra}%</span>
                  </div>
                  <Slider
                    value={[porcentajeExtra]}
                    onValueChange={(value) => setPorcentajeExtra(value[0])}
                    max={100}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cortinas */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Home className="w-5 h-5 text-gold" />
                  Cortinas
                </CardTitle>
                <CardDescription>Configura cada cortina del pedido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <CortinaTabs
                  cortinas={cortinas}
                  activa={cortinaActiva}
                  onSelect={setCortinaActiva}
                  onAgregar={agregarCortina}
                  onEliminar={eliminarCortina}
                />
                
                <CortinaEditor
                  cortina={cortinas[cortinaActiva]}
                  precios={precios}
                  onUpdate={(campo, valor) => actualizarCortina(cortinaActiva, campo, valor)}
                  subtotal={calcularTotalCortina(cortinas[cortinaActiva])}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Resumen */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <ResumenCotizacion
                cliente={cliente}
                cortinas={cortinas}
                precios={precios}
                calcularTotal={calcularTotalCortina}
                totalGeneral={calcularTotalGeneral()}
                validar={validarCotizacion}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>📞 {precios.contacto.telefono} • 📧 {precios.contacto.email}</p>
          <p className="mt-1">© {new Date().getFullYear()} {precios.contacto.nombreEmpresa} - Calidad en tus ambientes</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
