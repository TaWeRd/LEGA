export interface Cortina {
  id: number;
  ancho: string;
  alto: string;
  telaSeleccionada: string;
  sistemaSeleccionado: string;
  zocaloForrado: boolean;
  conPeso: boolean;
  gramTelaSeleccionado: string;
  aperturaSeleccionada: string;
  caja: boolean;
  ladoMando: 'izquierdo' | 'derecho' | '';
  caidaTela: 'detras' | 'delante' | '';
  colorSeleccionado: string;
}

export interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export const crearCortinaNueva = (id: number): Cortina => ({
  id,
  ancho: '',
  alto: '',
  telaSeleccionada: '',
  sistemaSeleccionado: '',
  zocaloForrado: false,
  conPeso: false,
  gramTelaSeleccionado: '',
  aperturaSeleccionada: '',
  caja: false,
  ladoMando: '',
  caidaTela: '',
  colorSeleccionado: '',
});
