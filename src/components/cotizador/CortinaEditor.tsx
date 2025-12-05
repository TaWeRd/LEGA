import { Cortina } from '@/types/cortina';
import { Precios, Tela } from '@/data/precios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Ruler, Palette, Settings, Circle } from 'lucide-react';

interface CortinaEditorProps {
  cortina: Cortina;
  precios: Precios;
  onUpdate: (campo: keyof Cortina, valor: any) => void;
  subtotal: number;
}

export const CortinaEditor = ({ cortina, precios, onUpdate, subtotal }: CortinaEditorProps) => {
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
          onValueChange={(v) => onUpdate('telaSeleccionada', v)}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Seleccionar tela" />
          </SelectTrigger>
          <SelectContent>
            {precios.telas.map((tela) => (
              <SelectItem key={tela.id} value={tela.id}>
                <span className="flex justify-between gap-4">
                  <span>{tela.nombre}</span>
                  <span className="text-gold font-medium">${tela.precio.toLocaleString()}/m²</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
      </div>

      {/* Lado del mando */}
      <div className="space-y-3">
        <Label>Lado del mando</Label>
        <RadioGroup
          value={cortina.ladoMando}
          onValueChange={(v) => onUpdate('ladoMando', v)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="izquierdo" id="izquierdo" />
            <Label htmlFor="izquierdo" className="cursor-pointer">Izquierdo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="derecho" id="derecho" />
            <Label htmlFor="derecho" className="cursor-pointer">Derecho</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Caída de tela */}
      <div className="space-y-3">
        <Label>Caída de la tela</Label>
        <RadioGroup
          value={cortina.caidaTela}
          onValueChange={(v) => onUpdate('caidaTela', v)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="detras" id="detras" />
            <Label htmlFor="detras" className="cursor-pointer">Por detrás</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delante" id="delante" />
            <Label htmlFor="delante" className="cursor-pointer">Por delante</Label>
          </div>
        </RadioGroup>
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
