import type { Zone, Category, Business, Product, Promotion, User } from './types'

// Zonas del norte del Estado de México
export const dummyZones: Zone[] = [
  { id: 'z1', name: 'Coacalco de Berriozábal', slug: 'coacalco', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z2', name: 'Tultitlán', slug: 'tultitlan', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z3', name: 'Tultepec', slug: 'tultepec', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z4', name: 'Cuautitlán', slug: 'cuautitlan', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z5', name: 'Cuautitlán Izcalli', slug: 'cuautitlan-izcalli', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z6', name: 'Ecatepec', slug: 'ecatepec', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z7', name: 'Tecámac', slug: 'tecamac', estado: 'Estado de México', codigoPostal: '55700' },
  { id: 'z8', name: 'Melchor Ocampo', slug: 'melchor-ocampo', estado: 'Estado de México', codigoPostal: '55700' },
]

// Categorías con subcategorías (hasta 3 niveles)
export const dummyCategories: Category[] = [
  // Nivel 1
  { id: 'c1', name: 'Muebles', slug: 'muebles', icon: 'sofa', level: 1 },
  { id: 'c2', name: 'Automotriz', slug: 'automotriz', icon: 'car', level: 1 },
  { id: 'c3', name: 'Comida', slug: 'comida', icon: 'utensils', level: 1 },
  { id: 'c4', name: 'Vidrio y Aluminio', slug: 'vidrio-aluminio', icon: 'door', level: 1 },
  { id: 'c5', name: 'Talleres', slug: 'talleres', icon: 'wrench', level: 1 },
  { id: 'c6', name: 'Electrónica', slug: 'electronica', icon: 'smartphone', level: 1 },
  { id: 'c7', name: 'Hogar', slug: 'hogar', icon: 'home', level: 1 },
  { id: 'c8', name: 'Ropa y Accesorios', slug: 'ropa-accesorios', icon: 'shirt', level: 1 },
  
  // Nivel 2 - Muebles
  { id: 'c1-1', name: 'Salas', slug: 'salas', parentId: 'c1', level: 2 },
  { id: 'c1-2', name: 'Comedores', slug: 'comedores', parentId: 'c1', level: 2 },
  { id: 'c1-3', name: 'Recámaras', slug: 'recamaras', parentId: 'c1', level: 2 },
  { id: 'c1-4', name: 'Oficina', slug: 'oficina', parentId: 'c1', level: 2 },
  
  // Nivel 2 - Automotriz
  { id: 'c2-1', name: 'Refacciones', slug: 'refacciones', parentId: 'c2', level: 2 },
  { id: 'c2-2', name: 'Accesorios Auto', slug: 'accesorios-auto', parentId: 'c2', level: 2 },
  { id: 'c2-3', name: 'Llantas', slug: 'llantas', parentId: 'c2', level: 2 },
  
  // Nivel 2 - Comida
  { id: 'c3-1', name: 'Restaurantes', slug: 'restaurantes', parentId: 'c3', level: 2 },
  { id: 'c3-2', name: 'Comida Rápida', slug: 'comida-rapida', parentId: 'c3', level: 2 },
  { id: 'c3-3', name: 'Panaderías', slug: 'panaderias', parentId: 'c3', level: 2 },
  { id: 'c3-4', name: 'Carnicerías', slug: 'carnicerias', parentId: 'c3', level: 2 },
  
  // Nivel 2 - Vidrio y Aluminio
  { id: 'c4-1', name: 'Ventanas', slug: 'ventanas', parentId: 'c4', level: 2 },
  { id: 'c4-2', name: 'Puertas', slug: 'puertas', parentId: 'c4', level: 2 },
  { id: 'c4-3', name: 'Cancelería', slug: 'canceleria', parentId: 'c4', level: 2 },
  
  // Nivel 3 - Salas
  { id: 'c1-1-1', name: 'Salas Modulares', slug: 'salas-modulares', parentId: 'c1-1', level: 3 },
  { id: 'c1-1-2', name: 'Sofás Cama', slug: 'sofas-cama', parentId: 'c1-1', level: 3 },
  { id: 'c1-1-3', name: 'Sillones', slug: 'sillones', parentId: 'c1-1', level: 3 },
  
  // Nivel 3 - Recámaras
  { id: 'c1-3-1', name: 'Camas', slug: 'camas', parentId: 'c1-3', level: 3 },
  { id: 'c1-3-2', name: 'Colchones', slug: 'colchones', parentId: 'c1-3', level: 3 },
  { id: 'c1-3-3', name: 'Closets', slug: 'closets', parentId: 'c1-3', level: 3 },
]

// Negocios de ejemplo
export const dummyBusinesses: Business[] = [
  {
    id: 'b1',
    name: 'Muebles García',
    slug: 'muebles-garcia',
    description: 'Fabricamos muebles de madera de alta calidad con más de 20 años de experiencia. Salas, comedores, recámaras y muebles a la medida.',
    logo: '/images/businesses/muebles-garcia-logo.png',
    coverImage: '/images/businesses/muebles-garcia-cover.png',
    ownerId: 'owner1',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    address: 'Av. López Portillo #234, Col. Centro',
    phone: '55 1234 5678',
    email: 'contacto@mueblesgarcia.mx',
    categoryIds: ['c1', 'c1-1', 'c1-2', 'c1-3'],
    rating: 4.8,
    reviewCount: 156,
    isActive: true,
    createdAt: '2023-01-15',
    location: { lat: 19.6258, lng: -99.1103 },
    businessHours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:00', close: '15:00' },
      sunday: { closed: true }
    }
  },
  {
    id: 'b2',
    name: 'AutoPartes del Norte',
    slug: 'autopartes-norte',
    description: 'Refacciones automotrices originales y genéricas. Amplio surtido para todas las marcas. Servicio de instalación disponible.',
    logo: '/images/businesses/autopartes-logo.jpg',
    coverImage: '/images/businesses/autopartes-cover.jpg',
    ownerId: 'owner2',
    zoneId: 'z2',
    zoneName: 'Tultitlán',
    address: 'Blvd. Tultitlán #567, Col. Industrial',
    phone: '55 9876 5432',
    email: 'ventas@autopartesnorte.mx',
    categoryIds: ['c2', 'c2-1', 'c2-2'],
    rating: 4.5,
    reviewCount: 89,
    isActive: true,
    createdAt: '2022-08-20',
    location: { lat: 19.6467, lng: -99.1678 },
    businessHours: {
      monday: { open: '08:00', close: '18:30' },
      tuesday: { open: '08:00', close: '18:30' },
      wednesday: { open: '08:00', close: '18:30' },
      thursday: { open: '08:00', close: '18:30' },
      friday: { open: '08:00', close: '18:30' },
      saturday: { open: '09:00', close: '14:00' },
      sunday: { closed: true }
    }
  },
  {
    id: 'b3',
    name: 'Tacos El Güero',
    slug: 'tacos-el-guero',
    description: 'Los mejores tacos de la zona desde 1995. Tacos al pastor, bistec, suadero y más. Salsas caseras y ambiente familiar.',
    logo: '/images/businesses/tacos-logo.jpg',
    coverImage: '/images/businesses/tacos-cover.jpg',
    ownerId: 'owner3',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    address: 'Calle Morelos #45, Col. San Lorenzo',
    phone: '55 5555 1234',
    email: 'tacosguero@gmail.com',
    categoryIds: ['c3', 'c3-2'],
    rating: 4.9,
    reviewCount: 342,
    isActive: true,
    createdAt: '2021-03-10',
    location: { lat: 19.6312, lng: -99.1156 },
    businessHours: {
      monday: { open: '10:00', close: '22:00' },
      tuesday: { open: '10:00', close: '22:00' },
      wednesday: { open: '10:00', close: '22:00' },
      thursday: { open: '10:00', close: '22:00' },
      friday: { open: '10:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '20:00' }
    }
  },
  {
    id: 'b4',
    name: 'Vidrios y Aluminios López',
    slug: 'vidrios-lopez',
    description: 'Fabricación e instalación de ventanas, puertas, cancelería y todo tipo de trabajos en vidrio y aluminio. Cotización sin costo.',
    logo: '/images/businesses/vidrios-logo.jpg',
    coverImage: '/images/businesses/vidrios-cover.jpg',
    ownerId: 'owner4',
    zoneId: 'z3',
    zoneName: 'Tultepec',
    address: 'Av. Independencia #789, Centro',
    phone: '55 4321 8765',
    email: 'vidrioslopez@outlook.com',
    categoryIds: ['c4', 'c4-1', 'c4-2', 'c4-3'],
    rating: 4.6,
    reviewCount: 67,
    isActive: true,
    createdAt: '2023-06-05',
    location: { lat: 19.6856, lng: -99.1289 },
    businessHours: {
      monday: { open: '08:30', close: '18:00' },
      tuesday: { open: '08:30', close: '18:00' },
      wednesday: { open: '08:30', close: '18:00' },
      thursday: { open: '08:30', close: '18:00' },
      friday: { open: '08:30', close: '18:00' },
      saturday: { open: '09:00', close: '14:00' },
      sunday: { closed: true }
    }
  },
  {
    id: 'b5',
    name: 'Taller Mecánico Hernández',
    slug: 'taller-hernandez',
    description: 'Servicio mecánico automotriz completo. Afinaciones, frenos, suspensión, diagnóstico computarizado y más.',
    logo: '/images/businesses/taller-logo.jpg',
    coverImage: '/images/businesses/taller-cover.jpg',
    ownerId: 'owner5',
    zoneId: 'z4',
    zoneName: 'Cuautitlán',
    address: 'Calle Hidalgo #156, Col. Centro',
    phone: '55 6789 0123',
    email: 'tallerhernandez@gmail.com',
    categoryIds: ['c5', 'c2'],
    rating: 4.7,
    reviewCount: 198,
    isActive: true,
    createdAt: '2020-11-22',
    location: { lat: 19.6745, lng: -99.1767 },
    businessHours: {
      monday: { open: '08:00', close: '19:00' },
      tuesday: { open: '08:00', close: '19:00' },
      wednesday: { open: '08:00', close: '19:00' },
      thursday: { open: '08:00', close: '19:00' },
      friday: { open: '08:00', close: '19:00' },
      saturday: { open: '09:00', close: '15:00' },
      sunday: { closed: true }
    }
  },
  {
    id: 'b6',
    name: 'Panadería La Espiga de Oro',
    slug: 'panaderia-espiga-oro',
    description: 'Pan artesanal recién horneado todos los días. Pasteles para toda ocasión, pan dulce y salado tradicional mexicano.',
    logo: '/images/businesses/panaderia-logo.jpg',
    coverImage: '/images/businesses/panaderia-cover.jpg',
    ownerId: 'owner6',
    zoneId: 'z5',
    zoneName: 'Cuautitlán Izcalli',
    address: 'Plaza Central #23, Local 5',
    phone: '55 1122 3344',
    email: 'espigadeoro@yahoo.com',
    categoryIds: ['c3', 'c3-3'],
    rating: 4.8,
    reviewCount: 276,
    isActive: true,
    createdAt: '2019-05-18',
    location: { lat: 19.6512, lng: -99.2034 },
    businessHours: {
      monday: { open: '06:00', close: '20:00' },
      tuesday: { open: '06:00', close: '20:00' },
      wednesday: { open: '06:00', close: '20:00' },
      thursday: { open: '06:00', close: '20:00' },
      friday: { open: '06:00', close: '20:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '07:00', close: '15:00' }
    }
  },
]

// Productos de ejemplo
export const dummyProducts: Product[] = [
  // Productos de Muebles García
  {
    id: 'p1',
    name: 'Sala Modular Premium 5 Piezas',
    slug: 'p1',
    description: 'Elegante sala modular de 5 piezas tapizada en tela de alta resistencia. Incluye 2 sofás de 3 plazas, 1 loveseat y 2 puff. Color gris oxford.',
    price: 28999,
    compareAtPrice: 34999,
    images: ['/images/products/sala-modular-1.jpg', '/images/products/sala-modular-2.jpg'],
    categoryId: 'c1-1-1',
    categoryName: 'Salas Modulares',
    businessId: 'b1',
    businessName: 'Muebles García',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    attributes: [
      { name: 'Material', value: 'Tela de alta resistencia' },
      { name: 'Color', value: 'Gris Oxford' },
      { name: 'Piezas', value: '5' },
      { name: 'Garantía', value: '2 años' }
    ],
    stock: 5,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-10',
    rating: 4.9,
    reviewCount: 45
  },
  {
    id: 'p2',
    name: 'Comedor de Madera 6 Sillas',
    slug: 'comedor-madera-6',
    description: 'Comedor de madera de pino macizo con acabado barnizado. Mesa rectangular para 6 personas con 6 sillas tapizadas.',
    price: 15999,
    compareAtPrice: 19999,
    images: ['/images/products/comedor-1.jpg'],
    categoryId: 'c1-2',
    categoryName: 'Comedores',
    businessId: 'b1',
    businessName: 'Muebles García',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    attributes: [
      { name: 'Material', value: 'Pino macizo' },
      { name: 'Acabado', value: 'Barnizado natural' },
      { name: 'Capacidad', value: '6 personas' }
    ],
    stock: 3,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-08',
    rating: 4.7,
    reviewCount: 28
  },
  {
    id: 'p3',
    name: 'Recámara King Size Completa',
    slug: 'recamara-king-completa',
    description: 'Set de recámara completo: cama king size, 2 burós, cómoda con espejo y colchón ortopédico incluido.',
    price: 42999,
    compareAtPrice: 52000,
    images: ['/images/products/recamara-1.jpg'],
    categoryId: 'c1-3',
    categoryName: 'Recámaras',
    businessId: 'b1',
    businessName: 'Muebles García',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    attributes: [
      { name: 'Tamaño', value: 'King Size' },
      { name: 'Incluye', value: 'Cama, burós, cómoda, colchón' },
      { name: 'Material', value: 'MDF enchapado' }
    ],
    stock: 2,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-05',
    rating: 4.8,
    reviewCount: 19
  },
  // Productos de AutoPartes
  {
    id: 'p4',
    name: 'Amortiguadores Monroe Gas (Par)',
    slug: 'amortiguadores-monroe-gas',
    description: 'Par de amortiguadores Monroe Gas-Matic para sedan compacto. Tecnología de gas para mejor rendimiento y durabilidad.',
    price: 2499,
    compareAtPrice: 2999,
    images: ['/images/products/amortiguadores-1.jpg'],
    categoryId: 'c2-1',
    categoryName: 'Refacciones',
    businessId: 'b2',
    businessName: 'AutoPartes del Norte',
    zoneId: 'z2',
    zoneName: 'Tultitlán',
    attributes: [
      { name: 'Marca', value: 'Monroe' },
      { name: 'Tipo', value: 'Gas-Matic' },
      { name: 'Compatibilidad', value: 'Sedan compacto' }
    ],
    stock: 20,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-12',
    rating: 4.6,
    reviewCount: 67
  },
  {
    id: 'p5',
    name: 'Kit de Balatas Cerámicas Wagner',
    slug: 'balatas-ceramicas-wagner',
    description: 'Kit de balatas cerámicas Wagner para frenos delanteros. Menor ruido, menos polvo y mejor frenado.',
    price: 899,
    images: ['/images/products/balatas-1.jpg'],
    categoryId: 'c2-1',
    categoryName: 'Refacciones',
    businessId: 'b2',
    businessName: 'AutoPartes del Norte',
    zoneId: 'z2',
    zoneName: 'Tultitlán',
    attributes: [
      { name: 'Marca', value: 'Wagner' },
      { name: 'Material', value: 'Cerámica' },
      { name: 'Posición', value: 'Delanteras' }
    ],
    stock: 35,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-11',
    rating: 4.5,
    reviewCount: 43
  },
  // Productos de Tacos El Güero
  {
    id: 'p6',
    name: 'Orden de Tacos al Pastor (5 pzas)',
    slug: 'tacos-pastor-5',
    description: 'Orden de 5 tacos al pastor con piña, cilantro y cebolla. Incluye salsa verde y roja.',
    price: 75,
    images: ['/images/products/tacos-pastor-1.jpg'],
    categoryId: 'c3-2',
    categoryName: 'Comida Rápida',
    businessId: 'b3',
    businessName: 'Tacos El Güero',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    attributes: [
      { name: 'Piezas', value: '5' },
      { name: 'Incluye', value: 'Salsa verde y roja' }
    ],
    stock: 100,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-15',
    rating: 4.9,
    reviewCount: 234
  },
  {
    id: 'p7',
    name: 'Gringa de Pastor',
    slug: 'gringa-pastor',
    description: 'Deliciosa gringa con tortilla de harina, pastor, queso fundido y piña.',
    price: 45,
    images: ['/images/products/gringa-1.jpg'],
    categoryId: 'c3-2',
    categoryName: 'Comida Rápida',
    businessId: 'b3',
    businessName: 'Tacos El Güero',
    zoneId: 'z1',
    zoneName: 'Coacalco de Berriozábal',
    attributes: [
      { name: 'Tortilla', value: 'Harina' },
      { name: 'Relleno', value: 'Pastor con queso' }
    ],
    stock: 100,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-14',
    rating: 4.8,
    reviewCount: 156
  },
  // Productos de Vidrios López
  {
    id: 'p8',
    name: 'Ventana de Aluminio Blanco 1.2x1.0m',
    slug: 'ventana-aluminio-blanco',
    description: 'Ventana corrediza de aluminio blanco con vidrio de 6mm. Incluye mosquitero e instalación.',
    price: 2800,
    compareAtPrice: 3200,
    images: ['/images/products/ventana-1.jpg'],
    categoryId: 'c4-1',
    categoryName: 'Ventanas',
    businessId: 'b4',
    businessName: 'Vidrios y Aluminios López',
    zoneId: 'z3',
    zoneName: 'Tultepec',
    attributes: [
      { name: 'Material', value: 'Aluminio blanco' },
      { name: 'Medidas', value: '1.2m x 1.0m' },
      { name: 'Vidrio', value: '6mm claro' },
      { name: 'Incluye', value: 'Mosquitero e instalación' }
    ],
    stock: 10,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-09',
    rating: 4.7,
    reviewCount: 34
  },
  {
    id: 'p9',
    name: 'Cancel para Baño 90x180cm',
    slug: 'cancel-bano',
    description: 'Cancel de vidrio templado para baño con marco de aluminio cromado. Vidrio de 8mm de seguridad.',
    price: 4500,
    images: ['/images/products/cancel-1.jpg'],
    categoryId: 'c4-3',
    categoryName: 'Cancelería',
    businessId: 'b4',
    businessName: 'Vidrios y Aluminios López',
    zoneId: 'z3',
    zoneName: 'Tultepec',
    attributes: [
      { name: 'Material', value: 'Vidrio templado 8mm' },
      { name: 'Marco', value: 'Aluminio cromado' },
      { name: 'Medidas', value: '90cm x 180cm' }
    ],
    stock: 6,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-07',
    rating: 4.6,
    reviewCount: 21
  },
  // Más productos
  {
    id: 'p10',
    name: 'Servicio de Afinación Mayor',
    slug: 'afinacion-mayor',
    description: 'Afinación mayor completa: cambio de bujías, filtros (aire, aceite, gasolina), aceite sintético y diagnóstico computarizado.',
    price: 1800,
    compareAtPrice: 2200,
    images: ['/images/products/afinacion-1.jpg'],
    categoryId: 'c5',
    categoryName: 'Talleres',
    businessId: 'b5',
    businessName: 'Taller Mecánico Hernández',
    zoneId: 'z4',
    zoneName: 'Cuautitlán',
    attributes: [
      { name: 'Incluye', value: 'Bujías, filtros, aceite sintético' },
      { name: 'Diagnóstico', value: 'Computarizado' },
      { name: 'Garantía', value: '3 meses' }
    ],
    stock: 50,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-13',
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: 'p11',
    name: 'Pastel de Tres Leches',
    slug: 'pastel-tres-leches',
    description: 'Delicioso pastel de tres leches con decoración de crema batida y fresas. Tamaño para 15 personas.',
    price: 450,
    images: ['/images/products/pastel-1.jpg'],
    categoryId: 'c3-3',
    categoryName: 'Panaderías',
    businessId: 'b6',
    businessName: 'Panadería La Espiga de Oro',
    zoneId: 'z5',
    zoneName: 'Cuautitlán Izcalli',
    attributes: [
      { name: 'Sabor', value: 'Tres Leches' },
      { name: 'Porciones', value: '15 personas' },
      { name: 'Decoración', value: 'Crema y fresas' }
    ],
    stock: 8,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-14',
    rating: 4.9,
    reviewCount: 112
  },
  {
    id: 'p12',
    name: 'Conchas Surtidas (Docena)',
    slug: 'conchas-surtidas',
    description: 'Docena de conchas recién horneadas surtidas: chocolate, vainilla y fresa.',
    price: 60,
    images: ['/images/products/conchas-1.jpg'],
    categoryId: 'c3-3',
    categoryName: 'Panaderías',
    businessId: 'b6',
    businessName: 'Panadería La Espiga de Oro',
    zoneId: 'z5',
    zoneName: 'Cuautitlán Izcalli',
    attributes: [
      { name: 'Cantidad', value: '12 piezas' },
      { name: 'Sabores', value: 'Chocolate, vainilla, fresa' }
    ],
    stock: 50,
    isActive: true,
    isFeatured: false,
    createdAt: '2024-01-15',
    rating: 4.7,
    reviewCount: 78
  },
]

// Promociones de ejemplo
export const dummyPromotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Inauguración Muebles García',
    description: '20% de descuento en toda la tienda por nuestra gran inauguración',
    discountType: 'percentage',
    discountValue: 20,
    businessId: 'b1',
    startDate: '2024-01-01',
    endDate: '2024-02-28',
    isActive: true,
    bannerImage: '/images/promos/muebles-promo.jpg'
  },
  {
    id: 'promo2',
    title: 'Martes de Tacos',
    description: 'Todos los martes 2x1 en tacos al pastor',
    discountType: 'percentage',
    discountValue: 50,
    businessId: 'b3',
    productIds: ['p6'],
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    bannerImage: '/images/promos/tacos-promo.jpg'
  },
  {
    id: 'promo3',
    title: 'Semana del Aluminio',
    description: '$500 de descuento en ventanas de aluminio',
    discountType: 'fixed',
    discountValue: 500,
    businessId: 'b4',
    productIds: ['p8'],
    startDate: '2024-01-15',
    endDate: '2024-01-31',
    isActive: true,
    bannerImage: '/images/promos/ventanas-promo.jpg'
  },
]

// Usuarios de ejemplo
export const dummyUsers: User[] = [
  {
    id: 'admin1',
    email: 'admin@zonalocal.mx',
    name: 'Administrador Principal',
    role: 'admin',
    phone: '55 1111 0000',
    createdAt: '2023-01-01'
  },
  {
    id: 'owner1',
    email: 'garcia@mueblesgarcia.mx',
    name: 'Roberto García',
    role: 'owner',
    businessId: 'b1',
    phone: '55 1234 5678',
    createdAt: '2023-01-15'
  },
  {
    id: 'owner2',
    email: 'lopez@autopartes.mx',
    name: 'Miguel López',
    role: 'owner',
    businessId: 'b2',
    phone: '55 9876 5432',
    createdAt: '2022-08-20'
  },
  {
    id: 'customer1',
    email: 'cliente@gmail.com',
    name: 'María Hernández',
    role: 'customer',
    phone: '55 2222 3333',
    createdAt: '2024-01-01'
  },
]

// Helper functions
export function getCategoriesTree(): Category[] {
  const level1 = dummyCategories.filter(c => c.level === 1)
  return level1.map(cat => ({
    ...cat,
    children: dummyCategories
      .filter(c => c.parentId === cat.id)
      .map(sub => ({
        ...sub,
        children: dummyCategories.filter(c => c.parentId === sub.id)
      }))
  }))
}

export function getProductsByZone(zoneId: string): Product[] {
  return dummyProducts.filter(p => p.zoneId === zoneId && p.isActive)
}

export function getProductsByCategory(categoryId: string): Product[] {
  // Get products from this category and all its subcategories
  const categoryIds = [categoryId]
  dummyCategories.forEach(c => {
    if (c.parentId === categoryId) {
      categoryIds.push(c.id)
      dummyCategories.forEach(sub => {
        if (sub.parentId === c.id) {
          categoryIds.push(sub.id)
        }
      })
    }
  })
  return dummyProducts.filter(p => categoryIds.includes(p.categoryId) && p.isActive)
}

export function getFeaturedProducts(): Product[] {
  return dummyProducts.filter(p => p.isFeatured && p.isActive)
}

export function getBusinessesByZone(zoneId: string): Business[] {
  return dummyBusinesses.filter(b => b.zoneId === zoneId && b.isActive)
}
