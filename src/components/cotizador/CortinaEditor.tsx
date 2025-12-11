import { Cortina } from '@/types/cortina';
import { Precios, Tela } from '@/data/precios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Ruler, Palette, Settings, Blinds, Grid2x2 } from 'lucide-react';

interface CortinaEditorProps {
  cortina: Cortina;
  precios: Precios;
  gramTelaSeleccionado: string;
  aperturaSeleccionada: string;
  onUpdate: (campo: keyof Cortina, valor: any, gramTelaSeleccionado?: string, aperturaSeleccionada?: string) => void;
  subtotal: number;
}

export const CortinaEditor = ({ cortina, precios, gramTelaSeleccionado, aperturaSeleccionada, onUpdate, subtotal }: CortinaEditorProps) => {
  const telaSeleccionada = precios.telas.find(t => t.id === cortina.telaSeleccionada);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Medidas */}
      <div className="space-y-4">
        <h4 className="font-display text-lg font-medium flex items-center gap-2">
          <Ruler className="w-5 h-5 text-gold" />
          Medidas
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ancho">Ancho (cm)</Label>
            <Input
              id="ancho"
              type="number"
              placeholder="Ej: 150"
              value={cortina.ancho}
              onChange={(e) => onUpdate('ancho', e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alto">Alto (cm)</Label>
            <Input
              id="alto"
              type="number"
              placeholder="Ej: 200"
              value={cortina.alto}
              onChange={(e) => onUpdate('alto', e.target.value)}
              className="bg-card"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Mínimo 100cm. Medidas menores se cobran como 100cm</p>
      </div>

      {/* Tela */}
      <div className="space-y-4">
        <h4 className="font-display text-lg font-medium flex items-center gap-2">
          <Palette className="w-5 h-5 text-gold" />
          Tela
        </h4>
        <Select
  value={cortina.telaSeleccionada}
  onValueChange={(v) => {
    const tela = precios.telas.find(t => t.id === v);

    onUpdate('telaSeleccionada', v);

    // Autocompletar gramaje y apertura al seleccionar tela
    onUpdate('gramTelaSeleccionado', tela?.gramTela?.[0] || '');
    onUpdate('aperturaSeleccionada', tela?.apertura?.[0] || '');

    // Resetear color al cambiar tela
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
        
        {/* info */}
        <div className="flex gap-6">
  {/* Gramaje */}
  {telaSeleccionada && telaSeleccionada.gramTela?.length > 0 && (
    <div className="space-y-3 w-1/2">
      <Label>Gramaje</Label>
      <div className="flex flex-wrap gap-2">
        {telaSeleccionada.gramTela.map((gram) => (
          <button
            key={gram}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              gramTelaSeleccionado === gram
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            }`}
          >
            {gram}
          </button>
        ))}
      </div>
    </div>
  )}

  {/* Apertura */}
  {telaSeleccionada && telaSeleccionada.apertura?.length > 0 && (
    <div className="space-y-3 w-1/2">
      <Label>Apertura</Label>
      <div className="flex flex-wrap gap-2">
        {telaSeleccionada.apertura.map((apertura) => (
          <button
            key={apertura}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              gramTelaSeleccionado === apertura
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            }`}
          >
            {apertura}
          </button>
        ))}
      </div>
    </div>
  )}
</div>

        {/* Colores */}
        {telaSeleccionada && telaSeleccionada.colores.length > 0 && (
          <div className="space-y-3">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
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
        <h4 className="font-display text-lg font-medium flex items-center gap-2">
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
                  <span className="text-gold font-medium">${sistema.precio.toLocaleString()}/m</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lado del mando */}
      <div className="space-y-3">
        <h4 className="font-display text-lg font-medium flex items-center gap-2">
          <Blinds className="w-5 h-5 text-gold" />
          Lado del mando
        </h4>
        {telaSeleccionada && telaSeleccionada.colores.length > 0 && (
          <div className="space-y-3">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
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
        <div className="space-y-3">

  <div className="flex flex-wrap gap-2">
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

      </div>

      {/* Caída de tela */}
      <div className="space-y-3">
        <h4 className="font-display text-lg font-medium flex items-center gap-2">
          <Grid2x2 className="w-5 h-5 text-gold" />
          Caída de la tela
        </h4>
        <div className="space-y-3">

  <div className="flex flex-wrap gap-2">
    {[
      { id: 'detras', label: 'Por detrás' },
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

      </div>

      {/* Opciones adicionales */}
      <div className="space-y-4">
        <h4 className="font-display text-lg font-medium">Opciones adicionales</h4>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium">Zócalo a la vista</p>
            <p className="text-sm text-muted-foreground">+${precios.adicionales.zocaloForrado.toLocaleString()}/m</p>
          </div>
          <Switch
            checked={cortina.zocaloForrado}
            onCheckedChange={(v) => onUpdate('zocaloForrado', v)}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium">Peso de cadena</p>
            <p className="text-sm text-muted-foreground">+${precios.adicionales.pesoCadena.toLocaleString()}</p>
          </div>
          <Switch
            checked={cortina.conPeso}
            onCheckedChange={(v) => onUpdate('conPeso', v)}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
          <div>
            <p className="font-medium">Caja</p>
            <p className="text-sm text-muted-foreground">+${precios.adicionales.caja.toLocaleString()}/m</p>
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
          <span className="text-2xl font-display font-semibold text-gold">
            ${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
