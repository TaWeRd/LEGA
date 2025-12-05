export interface Tela {
  id: string;
  nombre: string;
  precio: number;
  colores: string[];
}

export interface Sistema {
  id: string;
  nombre: string;
  precio: number;
}

export interface Adicionales {
  zocaloForrado: number;
  pesoCadena: number;
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
      nombre: 'SCREEN 5% 3005 (ancho máx 2.50m)', 
      precio: 14950, 
      colores: ['Blanco', 'Blanco/Beige', 'Beige', 'Blanco/Gris', 'Gris', 'Gris/Negro', 'Negro'] 
    },
    { 
      id: 'screen5_2005', 
      nombre: 'SCREEN 5% 2005 (ancho máx 2.50m)', 
      precio: 14105, 
      colores: ['Blanco', 'Blanco/Beige', 'Blanco/Gris', 'Negro'] 
    },
    { 
      id: 'mesh10', 
      nombre: 'MESH 10%', 
      precio: 8000, 
      colores: ['Blanco', 'Beige', 'Gris'] 
    },
    { 
      id: 'blackout_premium', 
      nombre: 'BLACK OUT 550grs PREMIUM', 
      precio: 14105, 
      colores: ['Blanco', 'Natural', 'Beige', 'Gris', 'Gris Topo', 'Negro'] 
    },
    { 
      id: 'blackout_eco', 
      nombre: 'BLACK OUT ECO FRIENDLY 440grs', 
      precio: 10400, 
      colores: ['Blanco', 'Natural', 'Gris'] 
    },
    { 
      id: 'blackout_economico', 
      nombre: 'BLACK OUT ECONÓMICO 405grs', 
      precio: 8000, 
      colores: ['Blanco', 'Natural', 'Gris'] 
    },
    { 
      id: 'lagoa', 
      nombre: 'Lagoa', 
      precio: 13000, 
      colores: ['Blanco'] 
    },
    { 
      id: 'berlin', 
      nombre: 'Berlin', 
      precio: 13000, 
      colores: ['Blanco', 'Natural', 'Beige', 'Gris', 'Gris oscuro', 'Negro'] 
    },
    { 
      id: 'dali', 
      nombre: 'Dali', 
      precio: 13000, 
      colores: ['Blanco', 'Natural'] 
    }
  ],
  sistemas: [
    { id: 'sistema32_blanco_plastico', nombre: 'Sistema 32mm cadena plástica blanca', precio: 14300 },
    { id: 'sistema32_metalica', nombre: 'Sistema 32mm cadena metálica', precio: 17500 },
    { id: 'sistema32_negro_plastico', nombre: 'Sistema 32mm cadena plástica negra', precio: 14300 },
    { id: 'sistema38_blanco_plastico', nombre: 'Sistema 38mm cadena plástica blanca', precio: 17500 },
    { id: 'sistema38_metalica', nombre: 'Sistema 38mm cadena metálica', precio: 19000 },
    { id: 'sistema38_negro_plastico', nombre: 'Sistema 38mm cadena plástica negra', precio: 17500 }
  ],
  adicionales: {
    zocaloForrado: 7000,
    pesoCadena: 4000
  },
  contacto: {
    telefono: '1123977924',
    email: 'rollerlega@mail.com',
    nombreEmpresa: 'LEGA CORTINAS'
  },
  version: '2.0.0',
  ultimaActualizacion: new Date().toLocaleDateString('es-AR')
};
