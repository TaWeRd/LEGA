import { Cliente } from '@/types/cortina';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail, MapPin } from 'lucide-react';

interface ClienteFormProps {
  cliente: Cliente;
  onChange: (cliente: Cliente) => void;
}

export const ClienteForm = ({ cliente, onChange }: ClienteFormProps) => {
  const handleChange = (campo: keyof Cliente, valor: string) => {
    onChange({ ...cliente, [campo]: valor });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium">
            <User className="w-4 h-4 text-gold" />
            Nombre completo *
          </Label>
          <Input
            id="nombre"
            placeholder="Ingresa el nombre"
            value={cliente.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className="bg-card border-border focus:border-gold focus:ring-gold/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono" className="flex items-center gap-2 text-sm font-medium">
            <Phone className="w-4 h-4 text-gold" />
            Teléfono *
          </Label>
          <Input
            id="telefono"
            type="tel"
            placeholder="Número de teléfono"
            value={cliente.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            className="bg-card border-border focus:border-gold focus:ring-gold/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
            <Mail className="w-4 h-4 text-gold" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={cliente.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-card border-border focus:border-gold focus:ring-gold/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="direccion" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-gold" />
            Dirección
          </Label>
          <Input
            id="direccion"
            placeholder="Dirección de instalación"
            value={cliente.direccion}
            onChange={(e) => handleChange('direccion', e.target.value)}
            className="bg-card border-border focus:border-gold focus:ring-gold/20"
          />
        </div>
      </div>
    </div>
  );
};
