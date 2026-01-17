import { BandaVertical } from "@/types/bandaVertical";
import {
  FABRIC_PRICE_BY_TYPE,
  SUPPORT_PRICE_BY_TYPE,
  SYSTEM_PRICE_BY_TYPE,
} from "@/pricing/bandasVerticales";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ruler, Palette, Settings, Boxes } from "lucide-react";

interface BandaVerticalEditorProps {
  banda: BandaVertical;
  onUpdate: (campo: keyof BandaVertical, valor: string) => void;
}

export const BandaVerticalEditor = ({ banda, onUpdate }: BandaVerticalEditorProps) => {
  const telas = Object.keys(FABRIC_PRICE_BY_TYPE);
  const sistemas = Object.keys(SYSTEM_PRICE_BY_TYPE);
  const soportes = Object.keys(SUPPORT_PRICE_BY_TYPE);
  const mostrarSoportes = banda.tipoSoporte === "SOPORTE A PARED";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Ruler className="w-5 h-5 text-gold" />
          Medidas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="anchoTotal">Ancho total (m)</Label>
            <Input
              id="anchoTotal"
              type="number"
              min={0}
              step="0.01"
              placeholder="Ej: 2.50"
              value={banda.anchoTotal}
              onChange={(e) => onUpdate("anchoTotal", e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="altoFinal">Alto final (m)</Label>
            <Input
              id="altoFinal"
              type="number"
              min={0}
              step="0.01"
              placeholder="Ej: 2.30"
              value={banda.altoFinal}
              onChange={(e) => onUpdate("altoFinal", e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="anchoFinal">Ancho final (m)</Label>
            <Input
              id="anchoFinal"
              type="number"
              min={0}
              step="0.01"
              placeholder="Ej: 2.40"
              value={banda.anchoFinal}
              onChange={(e) => onUpdate("anchoFinal", e.target.value)}
              className="bg-card"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Palette className="w-5 h-5 text-gold" />
          Tela
        </h4>
        <Select value={banda.tipoTela} onValueChange={(v) => onUpdate("tipoTela", v)}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Seleccionar tela" />
          </SelectTrigger>
          <SelectContent>
            {telas.map((tela) => (
              <SelectItem key={tela} value={tela}>
                {tela}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Settings className="w-5 h-5 text-gold" />
          Sistema
        </h4>
        <Select value={banda.tipoSistema} onValueChange={(v) => onUpdate("tipoSistema", v)}>
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="Seleccionar sistema" />
          </SelectTrigger>
          <SelectContent>
            {sistemas.map((sistema) => (
              <SelectItem key={sistema} value={sistema}>
                {sistema}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h4 className="font-display text-xl font-medium flex items-center gap-2">
          <Boxes className="w-5 h-5 text-gold" />
          Soporte y cantidad
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="tipoSoporte">Tipo de soporte</Label>
            <Select value={banda.tipoSoporte} onValueChange={(v) => onUpdate("tipoSoporte", v)}>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Seleccionar soporte" />
              </SelectTrigger>
              <SelectContent>
                {soportes.map((soporte) => (
                  <SelectItem key={soporte} value={soporte}>
                    {soporte}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cantidadCortinas">Cantidad</Label>
            <Input
              id="cantidadCortinas"
              type="number"
              min={1}
              step="1"
              placeholder="Ej: 1"
              value={banda.cantidadCortinas}
              onChange={(e) => onUpdate("cantidadCortinas", e.target.value)}
              className="bg-card"
            />
          </div>
        </div>

        {mostrarSoportes && (
          <div className="space-y-2 max-w-xs">
            <Label htmlFor="cantSoportesAPared">Soportes a pared</Label>
            <Input
              id="cantSoportesAPared"
              type="number"
              min={0}
              step="1"
              placeholder="Ej: 2"
              value={banda.cantSoportesAPared}
              onChange={(e) => onUpdate("cantSoportesAPared", e.target.value)}
              className="bg-card"
            />
          </div>
        )}
      </div>
    </div>
  );
};
