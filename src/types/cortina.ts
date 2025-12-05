export interface Cortina {
  id: number;
  ancho: string;
  alto: string;
  telaSeleccionada: string;
  sistemaSeleccionado: string;
  zocaloForrado: boolean;
  conPeso: boolean;
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
  zocaloForrado: true,
  conPeso: false,
  ladoMando: '',
  caidaTela: '',
  colorSeleccionado: ''
});
