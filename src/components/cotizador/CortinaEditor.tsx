import { Cortina } from '@/types/cortina';
import { Precios } from '@/data/precios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler, Palette, Settings, Blinds, Grid2x2, SlidersHorizontal, Droplet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CortinaEditorProps {
  cortina: Cortina;
  precios: Precios;
  gramTelaSeleccionado?: string;
  aperturaSeleccionada?: string;
  onUpdate: (campo: keyof Cortina, valor: any, gramTelaSeleccionado?: string, aperturaSeleccionada?: string) => void;
  subtotal: number;
}

export const CortinaEditor = ({
  cortina,
  precios,
  gramTelaSeleccionado,
  aperturaSeleccionada,
  onUpdate,
  subtotal
}: CortinaEditorProps) => {
  const { toast } = useToast();
  const telaSeleccionada = precios.telas.find(t => t.id === cortina.telaSeleccionada);
  const anchoValue = Number(cortina.ancho);
  const altoValue = Number(cortina.alto);
  const minCobro = 100;
  const maxAncho = 300;
  const maxAlto = 450;
  const anchoInvalido = Number.isFinite(anchoValue) && anchoValue > maxAncho;
  const altoInvalido = Number.isFinite(altoValue) && altoValue > maxAlto;
  const gramajeActual = gramTelaSeleccionado ?? cortina.gramTelaSeleccionado;
  const aperturaActual = aperturaSeleccionada ?? cortina.aperturaSeleccionada;

  const validarMedida = (campo: 'ancho' | 'alto', valor: number) => {
    if (!Number.isFinite(valor) || valor <= 0) return;
    if (campo === 'ancho' && valor > maxAncho) {
      toast({
        title: 'Medida excedida',
        description: `El ancho no puede superar ${maxAncho} cm.`,
        variant: 'destructive'
      });
      return;
    }
    if (campo === 'alto' && valor > maxAlto) {
      toast({
        title: 'Medida excedida',
        description: `El alto no puede superar ${maxAlto} cm.`,
        variant: 'destructive'
      });
      return;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Medidas */}
      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Ruler className="w-5 h-5 text-gold" />
          Medidas
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ancho">Ancho (cm)</Label>
            <Input
              id="ancho"
              type="number"
              min={1}
              max={maxAncho}
              placeholder="Ej: 150"
              value={cortina.ancho}
              onChange={(e) => onUpdate('ancho', e.target.value)}
              onBlur={(e) => validarMedida('ancho', Number(e.currentTarget.value))}
              className={`bg-card ${anchoInvalido ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
            />
            {anchoValue > maxAncho && (
              <p className="text-xs text-destructive">Maximo permitido: {maxAncho} cm.</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="alto">Alto (cm)</Label>
            <Input
              id="alto"
              type="number"
              min={1}
              max={maxAlto}
              placeholder="Ej: 200"
              value={cortina.alto}
              onChange={(e) => onUpdate('alto', e.target.value)}
              onBlur={(e) => validarMedida('alto', Number(e.currentTarget.value))}
              className={`bg-card ${altoInvalido ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
            />
            {altoValue > maxAlto && (
              <p className="text-xs text-destructive">Maximo permitido: {maxAlto} cm.</p>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Minimo {minCobro}cm, pero puede ser menor y se cobra como {minCobro}cm. Ancho maximo {maxAncho}cm (si la tela lo permite). Alto maximo {maxAlto}cm.
        </p>
      </div>

      {/* Tela */}
      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Palette className="w-5 h-5 text-gold" />
          Tela
        </h4>
        <Select
          value={cortina.telaSeleccionada}
          onValueChange={(v) => {
            const tela = precios.telas.find(t => t.id === v);
            onUpdate('telaSeleccionada', v);
            onUpdate('gramTelaSeleccionado', tela?.gramTela?.[0] || '');
            onUpdate('aperturaSeleccionada', tela?.apertura?.[0] || '');
            onUpdate('colorSeleccionado', '');
          }}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Seleccionar tela" />
          </SelectTrigger>
          <SelectContent>
            {precios.telas.map((tela) => (
              <SelectItem key={tela.id} value={tela.id}>
                <span className="flex justify-between gap-4">
                  <span>{tela.nombre}</span>
                  <span className="text-gold font-medium"></span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Info */}
        {telaSeleccionada && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Tela:</span> {telaSeleccionada.tela.toString() || '-'} -{' '}
            <span className="font-medium text-foreground">Gramaje:</span> {gramajeActual || '-'} -{' '}
            <span className="font-medium text-foreground">Apertura:</span> {aperturaActual || '-'}
          </p>
        )}

        {/* Colores */}
        {telaSeleccionada && telaSeleccionada.colores.length > 0 && (
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-gold" />
              Color
            </Label>
            <div className="flex flex-wrap gap-3">
              {telaSeleccionada.colores.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate('colorSeleccionado', color)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    cortina.colorSeleccionado === color
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sistema */}
      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Settings className="w-5 h-5 text-gold" />
          Sistema
        </h4>
        <Select
          value={cortina.sistemaSeleccionado}
          onValueChange={(v) => onUpdate('sistemaSeleccionado', v)}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Seleccionar sistema" />
          </SelectTrigger>
          <SelectContent>
            {precios.sistemas.map((sistema) => (
              <SelectItem key={sistema.id} value={sistema.id}>
                <span className="flex justify-between gap-4">
                  <span>{sistema.nombre}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lado del mando */}
      <div className="space-y-3">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Blinds className="w-5 h-5 text-gold" />
          Lado del mando
        </h4>
        <div className="flex flex-wrap gap-3">
          {['izquierdo', 'derecho'].map((lado) => (
            <button
              key={lado}
              onClick={() => onUpdate('ladoMando', lado)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                cortina.ladoMando === lado
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
              }`}
            >
              {lado === 'izquierdo' ? 'Izquierdo' : 'Derecho'}
            </button>
          ))}
        </div>
      </div>

      {/* Caida de tela */}
      <div className="space-y-3">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Grid2x2 className="w-5 h-5 text-gold" />
          Caida de la tela
        </h4>
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'detras', label: 'Por detras' },
            { id: 'delante', label: 'Por delante' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onUpdate('caidaTela', item.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                cortina.caidaTela === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Opciones adicionales */}
      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gold" />
          Opciones adicionales
        </h4>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium">Zocalo a la vista</p>
          </div>
          <Switch
            checked={cortina.zocaloForrado}
            onCheckedChange={(v) => onUpdate('zocaloForrado', v)}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium">Peso de cadena</p>
          </div>
          <Switch
            checked={cortina.conPeso}
            onCheckedChange={(v) => onUpdate('conPeso', v)}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium">Caja</p>
          </div>
          <Switch
            checked={cortina.caja}
            onCheckedChange={(v) => onUpdate('caja', v)}
          />
        </div>
      </div>

      {/* Subtotal */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-gold/10 border border-gold/20">
        <div className="flex justify-between items-center">
          <span className="font-medium">Subtotal cortina</span>
          <span className="text-2xl font-body font-semibold text-gold">
            ${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
