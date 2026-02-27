export type ProjectStatus = 'selling' | 'construction' | 'delivered' | 'upcoming';
export type ProjectType = 'residential' | 'commercial' | 'mixed';

export interface VirtualTour {
  key: 'amenities' | 'studio' | 'penthouse';
  url: string;
}

export interface ProjectContent {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  location: string;
  neighborhood: string;
  status: ProjectStatus;
  type: ProjectType;
  units: number | null;
  minArea: number | null;
  maxArea: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  deliveryDate: string;
  floors: number;
  heroImage: string;
  coverImage: string;
  gallery: string[];
  amenities: string[];
  features: string[];
  virtualTours?: VirtualTour[];
  featured?: boolean;
}

export interface NewsContent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Proyectos' | 'Empresa' | 'Mercado' | 'Noticias';
  author: string;
  publishedAt: string;
  image: string;
  gallery?: string[];
  readingTime: number;
  featured?: boolean;
  externalUrl?: string;
  source?: string;
  imageFit?: 'cover' | 'contain';
  imageBg?: string;
}

const r2ProjectsBase = 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/projects';
const r2NewsBase = 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news';

export const projects: ProjectContent[] = [
  {
    id: 'tower',
    slug: 'park-lofts-tower',
    name: 'Park Lofts Tower',
    tagline: 'El nuevo símbolo de vida moderna premium en Asunción. 101 metros. 27 pisos. Frente a Paseo La Galería.',
    shortDescription:
      'Obra maestra vertical en Av. Santa Teresa con calidad sin concesiones y estándar de lujo internacional.',
    description:
      'Park Lofts Tower es el nuevo símbolo de vida moderna premium en Asunción. Con 101 metros de altura sobre Avenida Santa Teresa, directamente frente a Paseo La Galería, esta obra maestra vertical de 27 pisos fue concebida con una sola visión: elevar los espacios de vivienda a un estándar de lujo internacional. Calidad sin concesiones, arquitectura que impacta y un modelo de operación pensado para renta de alto rendimiento.',
    location: 'Avenida Santa Teresa casi Aviadores del Chaco, frente a Paseo La Galería, Asunción',
    neighborhood: 'Eje Corporativo',
    status: 'pre-construction',
    type: 'mixed',
    units: null,
    minArea: null,
    maxArea: null,
    minPrice: null,
    maxPrice: null,
    deliveryDate: 'Q4 2027',
    floors: 27,
    heroImage: `${r2ProjectsBase}/tower/parkloftstowermain.jpg`,
    coverImage: `${r2ProjectsBase}/tower/parkloftstowerwholetower.jpg`,
    gallery: [
      `${r2ProjectsBase}/tower/parkloftstowermain.jpg`,
      `${r2ProjectsBase}/tower/parkloftstowerlobby.jpeg`,
      `${r2ProjectsBase}/tower/parkloftstowerinterior1.jpg`,
      `${r2ProjectsBase}/tower/parkloftstowerinterior2.jpg`,
      `${r2ProjectsBase}/tower/parkloftstowercafe.jpeg`,
      `${r2ProjectsBase}/tower/parkloftstowerrooftop.jpeg`,
      `${r2ProjectsBase}/tower/parkloftstowerwholetower.jpg`,
      `${r2ProjectsBase}/tower/parkloftstowerlocation.png`,
    ],
    amenities: [
      'Lobby de doble altura',
      'Rooftop con vistas panorámicas',
      'Espacios de co-working',
      'Gimnasio equipado',
      'Laundry & lock-off operativo',
      'Gestión orientada a renta corta',
    ],
    features: [
      'Ubicación premium con conectividad inmediata',
      'Tipologías eficientes para alta rotación',
      'Diseño contemporáneo y materiales de alto estándar',
      'Configuración pensada para operación hotelera liviana',
      'Modelo orientado a valorización de largo plazo',
      'Soporte comercial e inversión durante todo el ciclo del activo',
    ],
    virtualTours: [
      { key: 'amenities', url: 'https://storage.net-fs.com/hosting/7701681/28/' },
      { key: 'studio',    url: 'https://storage.net-fs.com/hosting/7701681/23/' },
      { key: 'penthouse', url: 'https://storage.net-fs.com/hosting/7701681/25/' },
    ],
    featured: true,
  },
  {
    id: 'airport',
    slug: 'park-lofts-airport',
    name: 'Park Lofts Airport',
    tagline: 'Proyecto orientado a renta corta, completamente comercializado',
    shortDescription:
      'Desarrollo ubicado en el corredor al aeropuerto, hoy disponible en reventa.',
    description:
      'Park Lofts Airport consolidó la propuesta de valor de la marca en el segmento de alquiler temporal. Con una ubicación estratégica para viajeros corporativos y turistas, alcanzó rápida absorción comercial y hoy representa una referencia de desempeño para inversores en reventa.',
    location: 'Areguá 985, Asunción 001509, Paraguay',
    neighborhood: 'Loma Pyta',
    status: 'delivered',
    type: 'mixed',
    units: null,
    minArea: null,
    maxArea: null,
    minPrice: null,
    maxPrice: null,
    deliveryDate: 'Entregado',
    floors: 4,
    heroImage: `${r2ProjectsBase}/airport/plairportmain.jpg`,
    coverImage: `${r2ProjectsBase}/airport/plairportmain.jpg`,
    gallery: [
      `${r2ProjectsBase}/airport/plairportmain.jpg`,
      `${r2ProjectsBase}/airport/plairportoutside1.jpg`,
      `${r2ProjectsBase}/airport/plairportoutside2.jpg`,
      `${r2ProjectsBase}/airport/pl-airportcoworking.jpg`,
      `${r2ProjectsBase}/airport/pl-airport-bathroom.jpg`,
    ],
    amenities: [
      'Recepción y control de acceso',
      'Áreas comunes de uso flexible',
      'Espacios de espera para huéspedes',
      'Laundry para estadías temporales',
      'Administración centralizada',
      'Estacionamientos de apoyo',
    ],
    features: [
      'Comercialización total en etapa temprana',
      'Perfil de demanda corporativa y turística',
      'Diseño funcional para estadías cortas',
      'Liquidez en mercado secundario',
      'Producto probado para inversor patrimonial',
      'Ubicación con alta conectividad logística',
    ],
    featured: true,
  },
  {
    id: 'recoleta',
    slug: 'park-lofts-recoleta',
    name: 'Park Lofts Recoleta',
    tagline: 'Vivienda compacta premium en una de las zonas más demandadas',
    shortDescription:
      'Proyecto actualmente en etapa final de obra, con unidades en reventa.',
    description:
      'Park Lofts Recoleta combina escala urbana, diseño contemporáneo y enfoque inversor. Está concebido para un público que valora ubicación, eficiencia en metraje y una experiencia residencial premium en uno de los barrios más consolidados de Asunción.',
    location: 'Charles De Gaulle 1585, Asunción 001414, Paraguay',
    neighborhood: 'Recoleta',
    status: 'construction',
    type: 'residential',
    units: null,
    minArea: null,
    maxArea: null,
    minPrice: null,
    maxPrice: null,
    deliveryDate: 'Q3 2026',
    floors: 10,
    heroImage: `${r2ProjectsBase}/recoleta/pl-recoleta-009.jpg`,
    coverImage: `${r2ProjectsBase}/recoleta/pl-recoleta-009.jpg`,
    gallery: [
      `${r2ProjectsBase}/recoleta/pl-recoleta-010.jpg`,
      `${r2ProjectsBase}/recoleta/pl-recoleta-011.jpg`,
      `${r2ProjectsBase}/recoleta/pl-recoleta-013.jpg`,
      `${r2ProjectsBase}/recoleta/pl-recoleta-014.jpg`,
    ],
    amenities: [
      'Lobby con diseño hotelero',
      'Terraza social',
      'Zona de trabajo compartido',
      'Espacio fitness',
      'Bicicleteros y storage',
      'Áreas técnicas de operación',
    ],
    features: [
      'Ubicación en corredor residencial consolidado',
      'Metrajes optimizados para inversión',
      'Marca y estándar constructivo homogéneo',
      'Buena profundidad de mercado para renta',
      'Formato adaptable a distintos perfiles de usuario',
      'Proyección de valorización por escasez de suelo en la zona',
    ],
    featured: true,
  },
  {
    id: 'rds',
    slug: 'residencias-del-sol',
    name: 'Residencias del Sol',
    tagline: 'Central. Tranquilo. Rodeado de lo mejor de Asunción.',
    shortDescription:
      'A minutos a pie del Paseo La Galería, el World Trade Center y el complejo Link Aviadores.',
    description:
      'Residencias del Sol se encuentra a pocos minutos a pie del Shopping Center Paseo La Galería, el World Trade Center Asunción y el moderno complejo empresarial y lifestyle Link Aviadores. Esta ubicación ofrece una combinación única: proximidad absoluta al centro de la ciudad con acceso peatonal a restaurantes de lujo, boutiques, torres de oficinas y opciones de ocio, junto con una calidad residencial verde y tranquila. Un entorno ideal para profesionales internacionales, expats y nómadas digitales — con alta demanda de alquiler y fuerte potencial de valorización.',
    location: 'PC6M+96M, Austria 2106, Asunción 001409, Paraguay',
    neighborhood: 'Recoleta',
    status: 'delivered',
    type: 'residential',
    units: null,
    minArea: null,
    maxArea: null,
    minPrice: null,
    maxPrice: null,
    deliveryDate: 'Entregado',
    floors: 4,
    heroImage: `${r2ProjectsBase}/residenciasdelsol/pl-delsol-main.jpg`,
    coverImage: `${r2ProjectsBase}/residenciasdelsol/pl-delsol-main.jpg`,
    gallery: [
      `${r2ProjectsBase}/residenciasdelsol/pl-delso-outside.jpg`,
      `${r2ProjectsBase}/residenciasdelsol/pl-delsol-lobby.jpg`,
      `${r2ProjectsBase}/residenciasdelsol/pl-delsol-pool.jpg`,
      `${r2ProjectsBase}/residenciasdelsol/pl-delsol-gym.jpg`,
    ],
    amenities: [
      'Control de acceso',
      'Áreas comunes funcionales',
      'Estacionamiento de residentes',
      'Espacios verdes',
      'Administración interna',
      'Mantenimiento programado',
    ],
    features: [
      'Proyecto completamente comercializado',
      'Entrega en estándares comprometidos',
      'Buena retención de valor para propietarios',
      'Alta adoptabilidad por usuarios finales',
      'Base de reventa activa',
      'Caso de éxito dentro del portafolio Park Lofts',
    ],
  },
  {
    id: 'los-arboles',
    slug: 'the-lofts-los-arboles',
    name: 'The Lofts - Los Árboles',
    tagline: 'Vivir en un barrio tranquilo, con el lifestyle a la vuelta de la esquina.',
    shortDescription:
      'Proyecto de micro-apartamentos en Paseo Los Árboles, área familiar con acceso inmediato a vida urbana.',
    description:
      'The Lofts - Los Árboles está ubicado directamente en Paseo Los Árboles, en una zona residencial cuidada y familiar — pero a solo pasos de la vida nocturna de Asunción, uno de los gimnasios más grandes de la ciudad y una amplia oferta de restaurantes, bares y cafés. Esta ubicación combina paz y retiro con energía urbana — ideal para inquilinos exigentes que valoran el contraste y lo abrazan. Un proyecto de micro-apartamentos que ofrece vida auténtica con alta demanda entre jóvenes profesionales y expats.',
    location: 'Capitán Juan Dimas Motta 493, Asunción 001408, Paraguay',
    neighborhood: 'Los Árboles',
    status: 'delivered',
    type: 'mixed',
    units: null,
    minArea: null,
    maxArea: null,
    minPrice: null,
    maxPrice: null,
    deliveryDate: 'Entregado',
    floors: 7,
    heroImage: `${r2ProjectsBase}/losarboles/losarbolesmain.jpg`,
    coverImage: `${r2ProjectsBase}/losarboles/losarbolesmain.jpg`,
    gallery: [
      `${r2ProjectsBase}/losarboles/losarbolesoutside.jpg`,
      `${r2ProjectsBase}/losarboles/losarboleslobby.jpg`,
    ],
    amenities: [
      'Amenities de escala boutique',
      'Espacios sociales',
      'Áreas funcionales para residentes',
      'Accesos controlados',
      'Mantenimiento centralizado',
      'Diseño de interiores contemporáneo',
    ],
    features: [
      'Modelo loft orientado a estilo de vida urbano',
      'Absorción comercial completa',
      'Escala eficiente de mantenimiento',
      'Buena apreciación de unidades en reventa',
      'Perfil de demanda joven y profesional',
      'Arquitectura con identidad de marca',
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export const projectsBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

export const newsroomArticles: NewsContent[] = [
  {
    id: 'recoleta-update-feb-2026',
    slug: 'actualizacion-obra-recoleta-febrero-2026',
    title: 'Actualización de obra: Park Lofts Recoleta apunta a entrega récord en julio 2026',
    excerpt:
      'Según el cronograma actual, la constructora Concremaq estima la finalización de Park Lofts Recoleta para principios de julio de 2026 — una velocidad récord para Paraguay.',
    content: [
      'Según el cronograma actual, la constructora prevé finalizar la obra a inicios de julio de 2026.',
      'Completar un edificio de 10 niveles y 89 departamentos en ese plazo representa una velocidad récord para Paraguay, logro que se alcanza a pesar de diversos imprevistos ocurridos durante el desarrollo del proyecto.',
      'Las fuertes lluvias registradas en marzo y abril de 2025 impidieron avanzar con las fundaciones según lo planificado, y el año en general presentó un nivel de precipitaciones superior al promedio histórico. A esto se sumaron otros factores, como los retrasos en el transporte internacional de materiales, en particular los ascensores provenientes de China, cuya llegada está prevista para el mes de mayo.',
      'No obstante, gracias a una intensa organización del trabajo, incluyendo jornadas extendidas y días adicionales, todo indica que la entrega de los departamentos, desde la perspectiva actual, se realizará en un plazo más corto que el habitual para proyectos de esta magnitud.',
    ],
    category: 'Proyectos',
    author: 'Equipo Park Lofts',
    publishedAt: '2026-02-22',
    image: 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news/recoleta/under%20construction/23.02.2026/recoletaconstructionrooftopbestview.JPG',
    gallery: [
      'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news/recoleta/under%20construction/23.02.2026/recoletaconstructionrooftopbestview.JPG',
      'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news/recoleta/under%20construction/23.02.2026/recoletaunderconstructionoutside.jpg',
      'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news/recoleta/under%20construction/23.02.2026/recoletaunderconstructioninside.jpg',
      'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news/recoleta/under%20construction/23.02.2026/recoletaunderconstructionrooftop1.JPG',
      'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/news/recoleta/under%20construction/23.02.2026/recoletaunderconstructionrooftop2.JPG',
    ],
    readingTime: 3,
  },
  {
    id: 'palada-rds',
    slug: 'palada-inicial-residencias-del-sol',
    title: 'Palada inicial de Residencias del Sol: el comienzo de un proyecto que ya es historia',
    excerpt:
      'El acto de palada inicial reunió al equipo, socios e inversores para dar inicio oficial a uno de los proyectos más representativos del portafolio Park Lofts.',
    content: [
      'La palada inicial de Residencias del Sol marcó el punto de partida oficial de uno de los proyectos más relevantes del historial de Park Lofts. El acto reunió al equipo fundador, socios estratégicos y a los primeros inversores del proyecto en el terreno donde hoy se levanta el edificio.',
      'El evento fue el primer hito público de un desarrollo que terminaría cerrando su comercialización por completo y siendo entregado en los plazos y estándares comprometidos. Este resultado valida el modelo constructivo y comercial que la empresa ha mantenido desde sus inicios.',
      'Residencias del Sol es hoy parte del track record que respalda la expansión de Park Lofts hacia nuevos proyectos en Asunción. Su historia demuestra que un producto bien concebido, en la ubicación adecuada y con un equipo comprometido, genera valor real y sostenido para todos los involucrados.',
    ],
    category: 'Noticias',
    author: 'Equipo Park Lofts',
    publishedAt: '2026-02-12',
    image: `${r2NewsBase}/Residencias%20del%20Sol/paladainicialresidenciasdelsol1.jpeg`,
    gallery: [
      `${r2NewsBase}/Residencias%20del%20Sol/paladainicialresidenciasdelsol1.jpeg`,
      `${r2NewsBase}/Residencias%20del%20Sol/paladainicialresidenciasdelsol2.jpeg`,
      `${r2NewsBase}/Residencias%20del%20Sol/paladainicialresidenciasdelsol3.jpeg`,
    ],
    readingTime: 3,
    featured: true,
  },
  {
    id: 'airport-progress',
    slug: 'progreso-park-lofts-airport',
    title: 'Park Lofts Airport ingresa en su etapa final de desarrollo',
    excerpt:
      'El proyecto avanza hacia el cierre con foco en la preparación operativa y la coordinación de la entrega de unidades a los inversores.',
    content: [
      'Park Lofts Airport ha ingresado oficialmente en su etapa final de desarrollo. El proyecto se encuentra en plena fase de cierre, con foco en los procedimientos administrativos, la preparación operativa y la coordinación de entrega de unidades a los inversores.',
      'En esta etapa, el equipo ha dado inicio a las comunicaciones formales con los inversores del proyecto, con el objetivo de confirmar la recepción de la información final y coordinar de manera ordenada el proceso de entrega.',
      'En paralelo, se desarrollan las tareas de coordinación logística y administrativa necesarias para garantizar una entrega eficiente y dentro de los estándares comprometidos desde el inicio del proyecto.',
      'Los próximos pasos incluyen la realización de inspecciones finales, la consolidación de la documentación legal y técnica requerida, y la programación de las entregas de cada unidad según la agenda acordada con cada inversor.',
    ],
    category: 'Proyectos',
    author: 'Equipo Park Lofts',
    publishedAt: '2026-02-26',
    image: 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/projects/airport/airport200.jpg',
    readingTime: 3,
  },
  {
    id: 'tower-location',
    slug: 'ubicacion-premium-park-lofts-tower',
    title: 'Ubicación premium: Park Lofts Tower',
    excerpt:
      'Por qué el eje corporativo de Asunción sigue siendo el punto más estratégico para invertir.',
    content: [
      'Park Lofts Tower se emplaza frente a uno de los polos urbanos de mayor dinamismo de la ciudad, con conectividad, servicios y demanda constante para alquiler temporal y corporativo.',
      'La localización es una variable decisiva en la sostenibilidad del activo. Por eso, cada decisión de implantación responde a criterios de profundidad de mercado, accesibilidad y potencial de valorización.',
    ],
    category: 'Mercado',
    author: 'Equipo Park Lofts',
    publishedAt: '2025-09-23',
    image: `${r2ProjectsBase}/tower/parkloftstowermain.jpg`,
    readingTime: 4,
  },
  {
    id: 'investor-model',
    slug: 'modelo-de-inversion-park-lofts',
    title: 'Modelo de inversión Park Lofts: renta corta y valor patrimonial',
    excerpt:
      'Rendimientos netos proyectados del 7 al 14%, tasas de ocupación superiores al 80% y un mercado donde la demanda supera cuatro veces a la oferta en el segmento compacto. Así opera el modelo Park Lofts.',
    content: [
      'En julio de 2024, Moody\'s otorgó a Paraguay su primera calificación de grado de inversión: Baa3. Los apartamentos en Asunción cotizan actualmente un 41% por debajo del promedio de otras capitales latinoamericanas, con la inflación más baja de la región, una carga impositiva máxima del 10% sobre rentas y una liquidez excepcional: los inmuebles se venden en promedio en 40 a 50 días y se alquilan en 20 a 35 días. Es el punto de entrada más favorable del continente para el inversor con visión de largo plazo.',
      'El contexto de demanda refuerza ese panorama. En el primer trimestre de 2025, Asunción fue declarada el destino de mejor desempeño mundial por el Informe de Turismo de la ONU, con un 53% más de llegadas internacionales respecto a 2024. La ciudad registró un crecimiento del 198% en nómadas digitales — el mayor del mundo, superando a Da Nang (+167%), Ciudad del Cabo (+156%) y Doha (+152%). El sistema territorial impositivo ofrece 0% sobre ingresos de fuente extranjera, residencia con requisitos accesibles y sin días mínimos de permanencia: una combinación única para el profesional global.',
      'Un estudio de big data de InfoCasas sobre la demanda de alquiler en Asunción por tamaño de unidad revela la oportunidad estructural en la que opera Park Lofts: en el segmento de apartamentos compactos de hasta 45 m², la demanda supera a la oferta en cuatro veces. El mercado de unidades de 60 a 150 m², en cambio, atraviesa una sobreoferta sin demanda equivalente. Park Lofts diseña sus studios de 20 a 33 m² específicamente en el lado óptimo de esa curva — alta absorción, poca competencia, primer movimiento.',
      'El modelo de inversión funciona sobre tres ejes: studios compactos en ubicaciones de alta rotación, tasas de ocupación en renta corta superiores al 80% con baja estacionalidad gracias a viajeros corporativos regionales y trabajadores remotos, y rendimientos netos proyectados de entre el 7% y el 14% tanto en renta larga como corta. Park Lofts Tower, a 50 metros de Paseo La Galería, ofrece noches desde USD 60 — frente a los USD 125 del Sheraton o los USD 77 del promedio Airbnb de la zona — con amenities de nivel hotelero: room service desde el lobby-café, concierge, valet parking, co-working y rooftop tropical.',
      'El track record respalda la propuesta: 5 proyectos, 350 unidades en desarrollo, USD 8,5 millones en ventas acumuladas y cero deuda. Park Lofts es además el primer desarrollador en Paraguay en ofrecer a inversores acreditados, family offices e institucionales la posibilidad de adquirir edificios completos — incluyendo titularidad del terreno, participación en el diseño y administración integral del activo terminado.',
    ],
    category: 'Empresa',
    author: 'Investor Relations',
    publishedAt: '2025-08-18',
    image: `${r2ProjectsBase}/tower/parkloftstowerlobby.jpeg`,
    readingTime: 5,
  },
  {
    id: 'asuncion-times-tower',
    slug: 'park-lofts-tower-redefining-luxury-urban-living',
    title: 'Asuncion Times: "Park Lofts Tower redefine la vida urbana de lujo en Asunción"',
    excerpt:
      'El medio de noticias en inglés más leído de Paraguay publicó un perfil extenso sobre Park Lofts Tower, destacando la arquitectura con respuesta climática, los estándares alemanes de construcción y las amenities de nivel hotelero.',
    content: [
      'Asuncion Times dedicó un artículo extenso a Park Lofts Tower, posicionándolo como un punto de inflexión para el mercado inmobiliario premium de la capital paraguaya. El artículo destaca la arquitectura con balcones profundos y ángulos solares optimizados, ventanas alemanas de doble vidrio con aislamiento acústico, electrodomésticos Samsung y alturas de techo de 3,5 metros en los pisos superiores.',
      'La publicación también resaltó las amenities de nivel hospitality del proyecto: valet parking, concierge, bistró con delivery a las unidades y espacios de co-working. Según el artículo, los cinco sitios de Park Lofts en Asunción están programados para abrir antes de diciembre de 2027.',
      'La cobertura en Asuncion Times representa un reconocimiento importante por parte de la prensa internacional en Paraguay, consolidando la presencia de Park Lofts ante audiencias de habla inglesa, inversores expatriados y nómadas digitales.',
    ],
    category: 'Noticias',
    author: 'Arami Amarilla — Asuncion Times',
    publishedAt: '2025-09-02',
    image: 'https://asunciontimes.com/wp-content/uploads/2024/05/The-Asuncion-Times-Logo-Black.png',
    readingTime: 4,
    externalUrl: 'https://asunciontimes.com/paraguay-news/local-news/park-lofts-tower-redefining-luxury-urban-living-in-asuncion/',
    source: 'Asuncion Times',
    imageFit: 'contain',
    imageBg: '#FFFFFF',
  },
  {
    id: 'forbes-py-tower',
    slug: 'forbes-park-lofts-nuevo-hito-real-estate',
    title: 'Forbes Paraguay: "Park Lofts marca un nuevo hito en el real estate local con un proyecto de US$ 10 millones"',
    excerpt:
      'Forbes Paraguay publicó un especial sobre el lanzamiento de Park Lofts Tower, destacando la inversión de US$ 10 millones, más de 230 unidades vendidas en menos de un año y el primer hotel integrado de la marca.',
    content: [
      'Forbes Paraguay cubrió en detalle el lanzamiento de Park Lofts Tower como un hito para el mercado inmobiliario local. El artículo describe un proyecto de 25 pisos y 120 unidades con una inversión total de US$ 10 millones, con unidades desde US$ 59.000 hasta un penthouse de US$ 500.000.',
      'La publicación destacó que Park Lofts vendió más de 230 unidades en menos de un año en sus proyectos anteriores, sin deuda. También se resaltó el lanzamiento del primer "Park Lofts Hotel" integrado en Paraguay, con amenities premium que incluyen rooftop pool, valet parking, room service y bistró interno.',
      'Forbes citó a Robin Loths sobre la visión de ofrecer a inversores acreditados y family offices una solución integral de inversión inmobiliaria. El artículo también menciona un incremento del 198% en la migración de nómadas digitales a Asunción en 2025.',
    ],
    category: 'Noticias',
    author: 'Forbes Paraguay',
    publishedAt: '2025-07-17',
    image: 'https://statics.forbes.com.py/forbes/img/global/forbes.py-o.svg',
    readingTime: 5,
    externalUrl: 'https://www.forbes.com.py/especiales/park-lofts-marca-nuevo-hito-real-estate-local-ambicioso-proyecto-us-10-millones-n75403',
    source: 'Forbes Paraguay',
    imageFit: 'contain',
    imageBg: '#1A1A1A',
  },
  {
    id: 'proyecta-tower',
    slug: 'proyecta-inversion-europea-real-estate-paraguay',
    title: 'Proyecta: "Inversión europea y visión innovadora para transformar el real estate en Paraguay"',
    excerpt:
      'La publicación especializada en arquitectura y construcción cubrió el modelo de negocio de Park Lofts, enfocado en renta temporal con ocupación superior al 85% y retornos de doble dígito.',
    content: [
      'Proyecta, referencia del sector de arquitectura y construcción en Paraguay, publicó un artículo detallado sobre Park Lofts Tower y el modelo de inversión europea que impulsa el proyecto. La nota describe cómo Park Lofts E.A.S., fundada por Robin Loths y Julian Sandt, introduce un enfoque de desarrollo inmobiliario hasta ahora inédito en el mercado local.',
      'Según la publicación, la empresa construye exclusivamente para renta temporal a través de plataformas como Airbnb y Booking.com, alcanzando tasas de ocupación superiores al 85% con retornos proyectados de doble dígito. El modelo apunta a inversores globales, nómadas digitales y el mercado de estadías cortas.',
      'La cobertura de Proyecta posiciona a Park Lofts como un caso de referencia en la profesionalización del segmento de vivienda compacta y alquiler temporal en Asunción.',
    ],
    category: 'Noticias',
    author: 'Betel Samaniego — Proyecta',
    publishedAt: '2025-07-16',
    image: 'https://proyecta.com.py/wp-content/uploads/2020/02/Logo-Revista-Proyecta-700-x-165-1.png',
    readingTime: 4,
    externalUrl: 'https://proyecta.com.py/park-lofts-tower-inversion-europea-y-vision-innovadora-para-transformar-el-real-estate-en-paraguay/',
    source: 'Proyecta',
    imageFit: 'contain',
    imageBg: '#1A1A1A',
  },
  {
    id: 'nomad-tax-investment',
    slug: 'the-nomad-tax-real-estate-investment-paraguay',
    title: 'The Nomad Tax: Park Lofts Tower como caso de inversión inmobiliaria en Paraguay',
    excerpt:
      'La plataforma internacional para expatriados e inversores destacó a Park Lofts Tower como un ecosistema de inversión, no solo un edificio, en su guía de real estate en Paraguay.',
    content: [
      'The Nomad Tax, una publicación enfocada en expatriados e inversores internacionales, incluyó a Park Lofts Tower como caso de estudio destacado en su guía de inversión inmobiliaria en Paraguay publicada en agosto de 2025.',
      'El artículo presenta a Julian Sandt como un inversor alemán que primero desarrolló edificios de studios para nómadas digitales en Paraguay y ahora escala su visión: "Park Loft Tower, su nuevo proyecto, no será solo un edificio sino un ecosistema para quienes vivan en él."',
      'La mención en The Nomad Tax amplía el alcance de Park Lofts ante una audiencia global de inversores, expatriados y profesionales que evalúan Paraguay como destino de inversión y relocalización.',
    ],
    category: 'Mercado',
    author: 'The Nomad Tax',
    publishedAt: '2025-08-12',
    image: 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/nomadtax.png',
    readingTime: 3,
    externalUrl: 'https://thenomadtax.com/en/2025/08/investing-in-real-estate-in-paraguay/',
    source: 'The Nomad Tax',
  },
  {
    id: 'haveyouradventure-recoleta',
    slug: 'have-your-adventure-airbnb-studios-asuncion',
    title: 'Have Your ADVENTURE: "Inversión accesible en Paraguay — Studios Airbnb en Asunción"',
    excerpt:
      'El blog internacional de viajes e inversión publicó un análisis detallado del modelo Park Lofts Recoleta, con proyecciones de renta y comparativa de retornos.',
    content: [
      'Have Your ADVENTURE, un blog de referencia para inversores y viajeros, publicó un análisis completo del proyecto Park Lofts Recoleta. El artículo detalla las 90 unidades de studio de entre 22 y 32 m², con precios de preventa desde US$ 34.500, posicionándolas como una de las opciones más accesibles del mercado.',
      'La publicación desglosa proyecciones de ingreso: renta a largo plazo de aproximadamente US$ 380/mes y renta Airbnb de US$ 600 a 800/mes, con comisiones de gestión del 10% (largo plazo) y 15% (Airbnb). El análisis concluye que Park Lofts apunta a un nicho desatendido en el mercado de vivienda compacta y accesible.',
      'El artículo también menciona la experiencia previa del equipo con el proyecto Palmanova Tower de 22 pisos y destaca el soporte multilingüe de la empresa como diferencial para inversores internacionales.',
    ],
    category: 'Mercado',
    author: 'Paul Trausner — Have Your ADVENTURE',
    publishedAt: '2025-02-21',
    image: `${r2ProjectsBase}/recoleta/pl-recoleta-009.jpg`,
    readingTime: 4,
    externalUrl: 'https://haveyouradventure.com/affordable-investment-in-paraguay-airbnb-apartments-in-asuncion/',
    source: 'Have Your ADVENTURE',
  },
  {
    id: 'infonegocios-recoleta',
    slug: 'infonegocios-park-lofts-recoleta-inversion',
    title: 'Infonegocios: "En Recoleta se erige Park Lofts con US$ 3 millones de inversión — minimalismo de alta rentabilidad"',
    excerpt:
      'Infonegocios Paraguay cubrió el avance de Park Lofts Recoleta: un edificio de 10 pisos con 89 studios en el barrio más demandado de Asunción, con US$ 3 millones de inversión y amenities de nivel premium.',
    content: [
      'Infonegocios Paraguay dedicó un artículo al proyecto Park Lofts Recoleta, destacándolo como la construcción más alta del área en ese momento. El edificio de 10 pisos concentra 89 studios diseñados con criterio minimalista para maximizar la eficiencia del espacio.',
      'Según Julián Sandt, socio director, "cada studio está diseñado para maximizar la eficiencia del espacio, ofreciendo un hogar atractivo tanto para residentes locales como para viajeros". El piso 10 incluye amenities de rooftop: coworking, gimnasio, piscina panorámica, salón de eventos y terraza con parrillero.',
      'La nota también señala que la empresa desarrolla en simultáneo un proyecto en Loma Pyta —ya agotado en ventas— y anuncia el próximo lanzamiento de una propiedad frente a Paseo Galería. Park Lofts apunta a profesionales jóvenes, viajeros internacionales y nómadas digitales que buscan ubicación, diseño y servicios integrados.',
    ],
    category: 'Noticias',
    author: 'Belén Rojas — Infonegocios Paraguay',
    publishedAt: '2025-03-06',
    image: `${r2NewsBase}/recoleta/under%20construction/23.02.2026/recoletaconstructionrooftopbestview.JPG`,
    readingTime: 3,
    externalUrl: 'https://infonegocios.com.py/infomicasa/en-recoleta-se-erige-park-lofts-con-us-3-millones-de-inversion-minimalismo-de-alta-rentabilidad',
    source: 'Infonegocios Paraguay',
  },
];

export const newsroomBySlug = Object.fromEntries(
  newsroomArticles.map((article) => [article.slug, article])
);
