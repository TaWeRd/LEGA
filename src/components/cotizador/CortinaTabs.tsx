import { Cortina } from '@/types/cortina';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CortinaTabsProps {
  cortinas: Cortina[];
  activa: number;
  onSelect: (index: number) => void;
  onAgregar: () => void;
  onEliminar: (index: number) => void;
}

export const CortinaTabs = ({
  cortinas,
  activa,
  onSelect,
  onAgregar,
  onEliminar
}: CortinaTabsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {cortinas.map((cortina, index) => (
        <button
          key={cortina.id}
          onClick={() => onSelect(index)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            activa === index
              ? 'bg-primary text-primary-foreground shadow-soft'
              : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
          }`}
        >
          <span>Cortina {index + 1}</span>
          {cortinas.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEliminar(index);
              }}
              className={`p-0.5 rounded hover:bg-destructive/20 ${
                activa === index ? 'hover:bg-primary-foreground/20' : ''
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={onAgregar}
        className="flex items-center gap-1 border-dashed border-gold/50 text-gold hover:bg-gold/10 hover:text-gold"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </Button>
    </div>
  );
};
