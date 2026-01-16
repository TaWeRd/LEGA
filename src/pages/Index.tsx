import { useState, useEffect } from 'react';
import { usePrecios } from '@/hooks/usePrecios';
import { useCotizador } from '@/hooks/useCotizador';
import { crearCortinaNueva } from '@/types/cortina';
import { ClienteForm } from '@/components/cotizador/ClienteForm';
import { CortinaEditor } from '@/components/cotizador/CortinaEditor';
import { CortinaTabs } from '@/components/cotizador/CortinaTabs';
import { ResumenCotizacion } from '@/components/cotizador/ResumenCotizacion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RefreshCw, User, Home, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import HeroSection from '@/components/hero/HeroSection';
import MetricsSection from '@/components/hero/MetricsSection';
import ProductsShowcase from '@/components/hero/ProductsShowcase';
import FeaturesSection from '@/components/hero/FeaturesSection';
import CTASection from '@/components/hero/CTASection';
import Footer from '@/components/hero/Footer';

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
    reemplazarCortina,
    calcularTotalCortina,
    calcularTotalGeneral,
    validarCotizacion,
    porcentajeExtra,
    setPorcentajeExtra
  } = useCotizador(precios);

  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState<'home' | 'roller' | 'verticales' | 'toldos'>('home');

  const generarCotizacionDummy = () => {
    if (!precios.telas.length || !precios.sistemas.length) return;

    const randomFrom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const randomBetween = (min: number, max: number, step = 10) => {
      const range = Math.floor((max - min) / step) + 1;
      return min + step * Math.floor(Math.random() * range);
    };

    if (!cliente.nombre.trim()) {
      const nombres = ['Milton', 'Carla', 'Sofia', 'Nahuel', 'Bruno', 'Lucia', 'Diego'];
      const apellidos = ['Quinteros', 'Perez', 'Gimenez', 'Gonzalez', 'Rodriguez', 'Lopez'];
      const calles = ['Belgrano', 'San Martin', 'Mitre', 'Rivadavia', 'Sarmiento'];

      const nombre = `${randomFrom(nombres)} ${randomFrom(apellidos)}`;
      const direccion = `${randomFrom(calles)} ${randomBetween(100, 2500, 50)}`;
      const telefono = `11${randomBetween(20000000, 99999999, 1)}`;
      const email = `${nombre.toLowerCase().replace(' ', '.')}@mail.com`;

      setCliente({
        nombre,
        email,
        telefono,
        direccion
      });
    }

    cortinas.forEach((cortina, index) => {
      const tela = randomFrom(precios.telas);
      const sistema = randomFrom(precios.sistemas);
      const color = tela.colores.length ? randomFrom(tela.colores) : '';
      const gramaje = tela.gramTela?.length ? randomFrom(tela.gramTela) : '';
      const apertura = tela.apertura?.length ? randomFrom(tela.apertura) : '';
      const tipoTela = tela.tela || '';

      const nueva = {
        ...crearCortinaNueva(cortina.id),
        ancho: String(randomBetween(100, 300)),
        alto: String(randomBetween(100, 450)),
        telaSeleccionada: tela.id,
        sistemaSeleccionado: sistema.id,
        colorSeleccionado: color,
        gramTelaSeleccionado: gramaje,
        aperturaSeleccionada: apertura,
        zocaloForrado: Math.random() > 0.5,
        conPeso: Math.random() > 0.5,
        caja: Math.random() > 0.5,
        ladoMando: Math.random() > 0.5 ? 'derecho' : 'izquierdo',
        caidaTela: Math.random() > 0.5 ? 'detras' : 'delante'
      };

      reemplazarCortina(index, nueva);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 4800);
    return () => clearTimeout(timer);
  }, []);

  if (mostrarSplash) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />
        <img
          src="/img/logoUpdate.png"
          alt=""
          className="absolute inset-0 m-auto h-[120vmin] w-[120vmin] opacity-60 blur-3xl saturate-150"
        />
        <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-6">
          <img
            src="/img/logoUpdate.png"
            alt="LEGA Cortinas"
            className="w-[70vw] max-w-[420px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] animate-splash-zoom"
          />
          <div className="text-center animate-fade-in space-y-2">
            <h1 className="font-display text-4xl font-bold text-white tracking-tight">
              {precios.contacto.nombreEmpresa}
            </h1>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Cortinas Roller</p>
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
              <img
                src="/img/logoUpdate.png"
                alt="LEGA Cortinas"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="font-display text-lg font-semibold">{precios.contacto.nombreEmpresa}</h1>
                <p className="text-xs text-muted-foreground">Cotizador de Cortinas Roller</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setSeccionActiva('home')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    seccionActiva === 'home'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setSeccionActiva('roller')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    seccionActiva === 'roller'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  Cortinas roller
                </button>
                <button
                  onClick={() => setSeccionActiva('verticales')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    seccionActiva === 'verticales'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  Verticales
                </button>
                <button
                  onClick={() => setSeccionActiva('toldos')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    seccionActiva === 'toldos'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  Toldos
                </button>
              </nav>
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
              {seccionActiva === 'roller' && (
                <Button variant="outline" size="sm" onClick={generarCotizacionDummy}>
                  Datos demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {seccionActiva === 'home' ? (
        <div>
          <HeroSection />
          <MetricsSection />
          <ProductsShowcase />
          <FeaturesSection />
          <CTASection />
        </div>
      ) : (
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {seccionActiva === 'roller' ? (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Main content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Cliente */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl flex items-center gap-2">
                      <User className="w-5 h-5 text-gold" />
                      Datos del Cliente
                    </CardTitle>
                    <CardDescription>Informacion de contacto para la cotizacion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClienteForm cliente={cliente} onChange={setCliente} />
                  </CardContent>
                </Card>

                {/* Porcentaje Extra */}
                <Card className="shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-2xl flex items-center gap-2">
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
                        max={200}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>100%</span>
                        <span>200%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cortinas */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl flex items-center gap-2">
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
          ) : (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-2">
                  <Home className="w-5 h-5 text-gold" />
                  {seccionActiva === 'verticales' ? 'Cortinas Verticales' : 'Toldos'}
                </CardTitle>
                <CardDescription>Seccion en construccion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  Estamos preparando esta seccion. Muy pronto disponible.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Index;
