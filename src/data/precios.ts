export interface Tela {
  id: string;
  nombre: string;
  precio: number;
  apertura?: string[];
  gramTela?: string[];
  colores: string[];
  tela: string;
}

export interface Sistema {
  id: string;
  nombre: string;
  precio: number;
}

export interface Adicionales {
  zocaloForrado: number;
  pesoCadena: number;
  caja:number;
}

export interface Contacto {
  telefono: string;
  email: string;
  nombreEmpresa: string;
}

export interface Precios {
  telas: Tela[];
  sistemas: Sistema[];
  adicionales: Adicionales;
  contacto: Contacto;
  version: string;
  ultimaActualizacion: string;
}

export const PRECIOS_LOCALES: Precios = {
  telas: [
    { 
      id: 'screen5_3005', 
      nombre: 'SCREEN  ', 
      precio: 14950,
      apertura: ['5%'],
      gramTela: ['420G'],
      colores: ['Blanco', 'Blanco/Beige', 'Beige', 'Blanco/Gris', 'Gris', 'Gris/Negro', 'Negro'],
      tela:'PVC Poliester' 
    },
    { 
      id: 'screen5_2005', 
      nombre: 'SCREEN BASIC', 
      precio: 14105,
      apertura: ['5%'],
      gramTela: ['385G'],
      colores: ['Blanco', 'Blanco/Beige', 'Blanco/Gris', 'Negro'],
      tela:'PVC Poliester'  
    },
    { 
      id: 'mesh10', 
      nombre: 'MESH', 
      precio: 8000,
      apertura: ['10%'],
      gramTela: ['350G'],
      colores: ['Blanco', 'Beige', 'Gris'],
      tela:'PVC'  
    },
    { 
      id: 'blackout_premium', 
      nombre: 'BLACK OUT PREMIUM', 
      precio: 14105,
      apertura: ['100% Opacidad'],
      gramTela: ['520G'], 
      colores: ['Blanco', 'Natural', 'Beige', 'Gris', 'Gris Topo', 'Negro'],
      tela:'PVC Fibra de vidrio' 
    },
    { 
      id: 'blackout_eco', 
      nombre: 'BLACK OUT ECO FRIENDLY', 
      precio: 10400, 
      apertura: ['100% Opacidad'],
      gramTela: ['440G'],
      colores: ['Blanco', 'Natural', 'Gris'],
      tela:'PVC Poliester' 
    },
    { 
      id: 'blackout_economico', 
      nombre: 'BLACK OUT ECONÓMICO', 
      precio: 8000, 
      apertura: ['100% Opacidad'],
      gramTela: ['405G'],
      colores: ['Blanco', 'Natural', 'Gris'],
      tela:'PVC Poliester' 
    },
    { 
      id: 'screen5_99225', 
      nombre: 'MALAGA', 
      precio: 14105, 
      apertura: ['Translucida'],
      gramTela: ['320G'],
      colores: ['Arena'],
      tela:'Poliester lino'  
    },
    { 
      id: 'lagoa', 
      nombre: 'LAGOA', 
      precio: 13000, 
      apertura: ['Translucida'],
      gramTela: ['320G'],
      colores: ['Blanco'],
      tela:'Poliester algodon'  
    },
    { 
      id: 'berlin', 
      nombre: 'BERLIN', 
      precio: 13000, 
      apertura: ['Translucida'],
      gramTela: ['320G'],
      colores: ['Blanco', 'Natural', 'Beige', 'Gris', 'Gris oscuro', 'Negro'],
      tela:'Poliester' 
    },
    { 
      id: 'dali', 
      nombre: 'DALI', 
      precio: 13000, 
      apertura: ['Translucida'],
      gramTela: ['320G'],
      colores: ['Blanco', 'Natural'],
      tela:'PVC Poliester' 
    }
  ],
  sistemas: [
    { id: 'sistema32_blanco_plastico', nombre: ' 32mm cadena plástica blanca', precio: 14300 },
    { id: 'sistema32_metalica', nombre: ' 32mm cadena metálica', precio: 17500 },
    { id: 'sistema32_negro_plastico', nombre: ' 32mm cadena plástica negra', precio: 14300 },
    { id: 'sistema38_blanco_plastico', nombre: ' 38mm cadena plástica blanca', precio: 17500 },
    { id: 'sistema38_metalica', nombre: ' 38mm cadena metálica', precio: 19000 },
    { id: 'sistema38_negro_plastico', nombre: ' 38mm cadena plástica negra', precio: 17500 },
    { id: 'sistema50_blanco_plastico', nombre: ' 50mm cadena plástica blanca', precio: 31000 },
    { id: 'sistema50_metalica', nombre: ' 50mm cadena metálica', precio: 35000 }
  ],
  adicionales: {
    zocaloForrado: 7000,
    pesoCadena: 4000,
    caja: 4000
  },
  contacto: {
    telefono: '1123977924',
    email: 'rollerlega@mail.com',
    nombreEmpresa: 'LEGA CORTINAS'
  },
  version: '2.0.0',
  ultimaActualizacion: new Date().toLocaleDateString('es-AR')
};
