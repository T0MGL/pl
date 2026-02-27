import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import FadeIn from '@/components/animations/FadeIn';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { newsroomArticles, newsroomBySlug } from '@/lib/content';

type Locale = 'es' | 'en' | 'de';

interface NewsDetailPageProps {
  params: { locale: string; slug: string };
}

const copyByLocale = {
  es: { back: 'Volver a Newsroom', min: 'min', by: 'Por', readOriginal: 'Leer artículo original', category: { Proyectos: 'Proyectos', Mercado: 'Mercado', Empresa: 'Empresa', Noticias: 'Noticias' } },
  en: { back: 'Back to Newsroom', min: 'min', by: 'By', readOriginal: 'Read original article', category: { Proyectos: 'Projects', Mercado: 'Market', Empresa: 'Company', Noticias: 'News' } },
  de: { back: 'Zurück zum Newsroom', min: 'Min', by: 'Von', readOriginal: 'Originalartikel lesen', category: { Proyectos: 'Projekte', Mercado: 'Markt', Empresa: 'Unternehmen', Noticias: 'News' } },
} as const;

const towerLocationCopyByLocale = {
  es: {
    eyebrow: 'Ubicación estratégica',
    title: 'Frente a Paseo La Galería, en el eje más consolidado de Asunción',
    lead:
      'Park Lofts Tower se integra al corredor corporativo con mayor densidad de servicios premium de la ciudad. Esta posición fortalece la demanda de estadías cortas y mejora la resiliencia comercial del activo.',
    points: [
      'Acceso inmediato a centros corporativos, gastronomía y retail de alto nivel.',
      'Conectividad rápida hacia aeropuerto, eje financiero y principales avenidas.',
      'Entorno con demanda sostenida para alquiler temporal ejecutivo.',
    ],
    mapLabel: 'Ver ubicación en Google Maps',
    mapCaption: 'Intersección Av. Santa Teresa y Aviadores del Chaco.',
    imageCaption: 'Vista del entorno inmediato del proyecto en el eje corporativo.',
  },
  en: {
    eyebrow: 'Strategic location',
    title: 'In front of Paseo La Galeria, within Asuncion strongest urban corridor',
    lead:
      'Park Lofts Tower is positioned inside the city highest-demand corporate node. This placement supports short-stay rental absorption and strengthens long-term asset competitiveness.',
    points: [
      'Immediate access to premium corporate, retail and hospitality infrastructure.',
      'Fast connectivity to airport routes, financial district and key avenues.',
      'Consistent executive short-stay demand across the surrounding area.',
    ],
    mapLabel: 'Open location in Google Maps',
    mapCaption: 'Avenida Santa Teresa and Aviadores del Chaco intersection.',
    imageCaption: 'Aerial view of the project immediate surroundings.',
  },
  de: {
    eyebrow: 'Strategische Lage',
    title: 'Direkt gegenüber Paseo La Galeria im stärksten Korridor Asuncions',
    lead:
      'Park Lofts Tower liegt im nachfragestärksten Unternehmensknoten der Stadt. Diese Position unterstützt die Auslastung im Kurzzeitsegment und erhöht die langfristige Wettbewerbsfähigkeit des Assets.',
    points: [
      'Direkter Zugang zu Corporate-, Retail- und Hospitality-Infrastruktur.',
      'Schnelle Anbindung an Flughafenachsen, Finanzviertel und Hauptverkehrsadern.',
      'Stabile Nachfrage im Executive-Kurzzeitmietsegment im direkten Umfeld.',
    ],
    mapLabel: 'Standort in Google Maps öffnen',
    mapCaption: 'Kreuzung Avenida Santa Teresa und Aviadores del Chaco.',
    imageCaption: 'Luftaufnahme des unmittelbaren Projektumfelds.',
  },
} as const;

const articleTranslations = {
  'palada-inicial-residencias-del-sol': {
    en: {
      title: 'Residencias del Sol groundbreaking: the start of a landmark project',
      excerpt: 'The groundbreaking ceremony brought together the team, partners and investors to officially launch one of Park Lofts most representative projects.',
      content: [
        'The groundbreaking of Residencias del Sol marked the official start of one of the most significant projects in Park Lofts history. The ceremony brought together the founding team, strategic partners and early investors at the site where the building now stands.',
        'The event was the first public milestone of a development that would go on to be fully sold out and delivered on time and to the standards promised. This outcome validates the construction and commercial model the company has maintained since its inception.',
        'Residencias del Sol is now part of the track record that supports Park Lofts expansion into new projects in Asunción. Its story demonstrates that a well-conceived product, in the right location and with a committed team, generates real and sustained value for all involved.',
      ],
    },
    de: {
      title: 'Spatenstich für Residencias del Sol: der Beginn eines wegweisenden Projekts',
      excerpt: 'Die Zeremonie brachte Team, Partner und Investoren zusammen, um eines der bedeutendsten Projekte von Park Lofts offiziell zu starten.',
      content: [
        'Der Spatenstich für Residencias del Sol markierte den offiziellen Beginn eines der bedeutendsten Projekte in der Geschichte von Park Lofts. Die Zeremonie brachte das Gründungsteam, strategische Partner und frühe Investoren auf dem Grundstück zusammen, auf dem das Gebäude heute steht.',
        'Die Veranstaltung war der erste öffentliche Meilenstein einer Entwicklung, die vollständig vermarktet und termingerecht in den vereinbarten Standards übergeben wurde. Dieses Ergebnis bestätigt das Bau- und Vermarktungsmodell, das das Unternehmen von Anfang an verfolgt hat.',
        'Residencias del Sol ist heute Teil des Track Records, der die Expansion von Park Lofts in neue Projekte in Asunción unterstützt. Diese Geschichte zeigt, dass ein gut konzipiertes Produkt am richtigen Standort mit einem engagierten Team echten und nachhaltigen Wert für alle Beteiligten schafft.',
      ],
    },
  },
  'progreso-park-lofts-airport': {
    en: {
      title: 'Park Lofts Airport enters its final development phase',
      excerpt: 'The project officially transitions to its closing stage, with focus on operational readiness and coordinating unit delivery to investors.',
      content: [
        'Park Lofts Airport has officially entered its final development phase. The project is now in a full closing stage, focused on administrative procedures, operational readiness and the coordination of unit delivery to investors.',
        'At this stage, the team has begun formal communications with the project\'s investors to confirm receipt of final project information and coordinate the delivery process in an orderly manner.',
        'In parallel, the team is executing the logistical and administrative coordination required to ensure an efficient delivery that meets the standards committed to since the project\'s inception.',
        'Next steps include final inspections, consolidation of the required legal and technical documentation, and the scheduling of individual unit deliveries in alignment with each investor\'s agreed timeline.',
      ],
    },
    de: {
      title: 'Park Lofts Airport tritt in die finale Entwicklungsphase ein',
      excerpt: 'Das Projekt wechselt offiziell in die Abschlussphase mit Fokus auf operativer Vorbereitung und Koordination der Übergabe an Investoren.',
      content: [
        'Park Lofts Airport ist offiziell in seine finale Entwicklungsphase eingetreten. Das Projekt befindet sich nun in der vollständigen Abschlussphase, mit Fokus auf administrativen Verfahren, operativer Vorbereitung und der Koordination der Einheitenübergabe an die Investoren.',
        'In dieser Phase hat das Team formelle Kommunikation mit den Projektinvestoren aufgenommen, um den Empfang der abschließenden Projektinformationen zu bestätigen und den Übergabeprozess geordnet zu koordinieren.',
        'Parallel dazu werden die logistischen und administrativen Koordinationsmaßnahmen durchgeführt, die eine effiziente Übergabe gemäß den von Anfang an zugesicherten Standards gewährleisten.',
        'Die nächsten Schritte umfassen abschließende Inspektionen, die Konsolidierung der erforderlichen rechtlichen und technischen Dokumentation sowie die Terminplanung der Einheitenübergaben in Abstimmung mit dem vereinbarten Zeitplan jedes Investors.',
      ],
    },
  },
  'ubicacion-premium-park-lofts-tower': {
    en: {
      title: 'Premium location: Park Lofts Tower',
      excerpt: 'Why Asuncion corporate axis remains a strategic location for real estate investment.',
      content: [
        'Park Lofts Tower is positioned in one of the most dynamic urban nodes in Asuncion, with strong connectivity and sustained demand.',
        'Location remains a core value driver for both occupancy performance and long-term capital appreciation.',
      ],
    },
    de: {
      title: 'Premium-Lage: Park Lofts Tower',
      excerpt: 'Warum die Corporate-Achse von Asuncion ein strategischer Investmentstandort bleibt.',
      content: [
        'Park Lofts Tower befindet sich in einem der dynamischsten urbanen Knotenpunkte Asuncions mit hoher Konnektivität und stabiler Nachfrage.',
        'Die Lage bleibt ein zentraler Treiber für Auslastung und langfristige Wertsteigerung.',
      ],
    },
  },
  'modelo-de-inversion-park-lofts': {
    en: {
      title: 'Park Lofts investment model: short-stay income and capital value',
      excerpt: 'Projected net yields of 7–14%, occupancy rates above 80%, and a market where demand outpaces supply four times over in the compact segment. That is how the Park Lofts model works.',
      content: [
        'In July 2024, Moody\'s awarded Paraguay its first investment grade rating: Baa3. Apartments in Asunción currently trade around 41% below the average of other Latin American capitals, with the region\'s lowest inflation rate, a maximum tax burden of 10% on rental income and exceptional market liquidity — properties sell on average within 40 to 50 days and are rented out within 20 to 35 days. It is the most favourable entry point on the continent for the long-term investor.',
        'The demand context reinforces this picture. In Q1 2025, Asunción was ranked the world\'s best-performing destination by the UN Tourism Report, with 53% more international arrivals compared to 2024. The city recorded 198% growth in digital nomads — the highest in the world, ahead of Da Nang (+167%), Cape Town (+156%) and Doha (+152%). The territorial tax system offers 0% on foreign-sourced income, residency with accessible requirements and no minimum days of presence: a unique combination for the globally mobile professional.',
        'A big data study by InfoCasas on rental demand in Asunción by unit size reveals the structural opportunity in which Park Lofts operates: in the compact apartment segment up to 45 m², demand outpaces supply by four times. The 60 to 150 m² market, by contrast, faces oversupply with no equivalent demand. Park Lofts designs its studios at 20 to 33 m² — precisely on the optimal side of that curve: high absorption, low competition, first-mover advantage.',
        'The investment model rests on three pillars: compact studios in high-turnover locations, short-stay occupancy rates consistently above 80% with low seasonality driven by regional corporate travellers and remote workers, and projected net yields of 7% to 14% across both long-term and short-term rental. Park Lofts Tower, 50 metres from Paseo La Galería, starts at USD 60 per night — vs USD 125 at the Sheraton and USD 77 at the Airbnb average for the area — with hotel-grade amenities: lobby-café room service, concierge, valet parking, co-working and a tropical rooftop.',
        'The track record supports the proposition: 5 projects, 350 units in development, USD 8.5 million in cumulative sales and zero debt. Park Lofts is also the first developer in Paraguay to offer accredited investors, family offices and institutional buyers the option to acquire entire buildings — including land title, involvement in design and full-service management of the completed asset.',
      ],
    },
    de: {
      title: 'Investmentmodell von Park Lofts: Kurzzeitmiete und Kapitalwert',
      excerpt: 'Prognostizierte Nettorenditen von 7–14%, Auslastungsraten über 80% und ein Markt, in dem die Nachfrage das Angebot im Kompaktsegment viermal übersteigt. So funktioniert das Park Lofts Modell.',
      content: [
        'Im Juli 2024 erhielt Paraguay von Moody\'s erstmals ein Investment-Grade-Rating: Baa3. Apartments in Asunción werden derzeit rund 41% unter dem Durchschnitt anderer lateinamerikanischer Hauptstädte gehandelt — bei der niedrigsten Inflationsrate der Region, einer maximalen Steuerlast von 10% auf Mieteinnahmen und außergewöhnlicher Marktliquidität: Immobilien werden im Schnitt in 40 bis 50 Tagen verkauft und in 20 bis 35 Tagen vermietet. Der günstigste Einstiegspunkt des Kontinents für den langfristig orientierten Investor.',
        'Das Nachfrageumfeld stärkt dieses Bild. Im ersten Quartal 2025 wurde Asunción vom UN-Tourismusbericht zum weltweit besten Zielort ernannt — mit 53% mehr internationalen Ankünften gegenüber 2024. Die Stadt verzeichnete ein Wachstum von 198% bei digitalen Nomaden, das weltweit höchste, vor Da Nang (+167%), Kapstadt (+156%) und Doha (+152%). Das territoriale Steuersystem bietet 0% auf ausländische Einkommensquellen, eine Aufenthaltserlaubnis mit einfachen Anforderungen und kein Mindestaufenthaltsgebot: eine einzigartige Kombination für den global mobilen Fachmann.',
        'Eine Big-Data-Studie von InfoCasas zur Mietnachfrage in Asunción nach Wohnungsgröße zeigt die strukturelle Chance, in der Park Lofts agiert: Im Segment kompakter Wohnungen bis 45 m² übersteigt die Nachfrage das Angebot um das Vierfache. Der Markt für 60 bis 150 m² leidet hingegen unter einem Überangebot ohne entsprechende Nachfrage. Park Lofts entwickelt seine Studios mit 20 bis 33 m² gezielt auf der optimalen Seite dieser Kurve: hohe Absorption, wenig Wettbewerb, First-Mover-Vorteil.',
        'Das Investitionsmodell basiert auf drei Säulen: kompakte Studios in Hochrotationslagen, Kurzzeitmiete-Auslastungsraten konstant über 80% mit geringer Saisonalität dank regionaler Geschäftsreisender und Remote Worker sowie prognostizierte Nettorenditen von 7% bis 14% — sowohl im Lang- als auch im Kurzzeitmietbereich. Park Lofts Tower, 50 Meter vom Paseo La Galería entfernt, bietet Nächte ab USD 60 — gegenüber USD 125 im Sheraton und USD 77 im Airbnb-Durchschnitt der Umgebung — mit Hotel-Amenities: Zimmerservice aus dem Lobby-Café, Concierge, Valet Parking, Co-Working und tropischem Rooftop.',
        'Der Track Record untermauert das Angebot: 5 Projekte, 350 Einheiten in Entwicklung, USD 8,5 Millionen kumulierte Verkäufe und null Schulden. Park Lofts ist zudem der erste Entwickler in Paraguay, der akkreditierten Investoren, Family Offices und institutionellen Käufern die Möglichkeit bietet, gesamte Gebäude zu erwerben — inklusive Grundstückseigentum, Mitsprache beim Design und vollständiger Verwaltung des fertigen Assets.',
      ],
    },
  },
  'actualizacion-obra-recoleta-febrero-2026': {
    en: {
      title: 'Construction update: Park Lofts Recoleta on track for record delivery in July 2026',
      excerpt: 'According to the current schedule, the construction firm expects to complete Park Lofts Recoleta by early July 2026 — a record speed for Paraguay.',
      content: [
        'According to the current schedule, the construction firm expects to complete the building by early July 2026.',
        'Completing a 10-storey building with 89 apartments within this timeframe represents a record speed for Paraguay — an achievement reached despite several unforeseen events during the project\'s development.',
        'Heavy rainfall in March and April 2025 prevented the foundation work from advancing as planned, and the year as a whole saw precipitation levels above the historical average. Additional factors included delays in the international transport of materials, particularly the elevators from China, whose arrival is scheduled for May.',
        'Nevertheless, thanks to intensive work organisation — including extended working days and additional shifts — everything points to the apartments being delivered within a shorter timeframe than is typical for projects of this scale in Paraguay.',
      ],
    },
    de: {
      title: 'Baufortschritt: Park Lofts Recoleta auf Rekordkurs zur Fertigstellung Juli 2026',
      excerpt: 'Dem aktuellen Zeitplan zufolge rechnet das Bauunternehmen mit der Fertigstellung von Park Lofts Recoleta Anfang Juli 2026 — Rekordgeschwindigkeit für Paraguay.',
      content: [
        'Dem aktuellen Zeitplan zufolge rechnet das Bauunternehmen mit der Fertigstellung des Gebäudes Anfang Juli 2026.',
        'Die Fertigstellung eines 10-stöckigen Gebäudes mit 89 Wohnungen in diesem Zeitraum stellt eine Rekordgeschwindigkeit für Paraguay dar — ein Erfolg, der trotz verschiedener unvorhergesehener Ereignisse während der Projektentwicklung erzielt wird.',
        'Starke Regenfälle im März und April 2025 verhinderten den geplanten Fortschritt bei den Fundamentarbeiten, und das Jahr insgesamt verzeichnete Niederschlagsmengen über dem historischen Durchschnitt. Hinzu kamen Verzögerungen beim internationalen Materialtransport, insbesondere der Aufzüge aus China, deren Ankunft für Mai geplant ist.',
        'Dank intensiver Arbeitsorganisation — einschließlich verlängerter Arbeitstage und zusätzlicher Schichten — deutet jedoch alles darauf hin, dass die Wohnungen in einem kürzeren Zeitraum übergeben werden, als für Projekte dieser Größenordnung in Paraguay üblich ist.',
      ],
    },
  },
  'park-lofts-tower-redefining-luxury-urban-living': {
    en: {
      title: 'Asuncion Times: "Park Lofts Tower redefines luxury urban living in Asuncion"',
      excerpt: 'Paraguay\'s leading English-language outlet published an in-depth feature on Park Lofts Tower, highlighting climate-responsive design, German construction standards and hospitality-grade amenities.',
      content: [
        'Asuncion Times published an extensive feature on Park Lofts Tower, positioning it as a turning point for Asuncion\'s premium real estate market. The article highlights climate-responsive architecture with deep balconies and optimized sun angles, German double-glass soundproof windows, Samsung appliances and 3.5-meter ceiling heights on upper floors.',
        'The publication also highlighted the project\'s hospitality-level amenities: valet parking, concierge, bistro with in-unit delivery and co-working spaces. According to the article, all five Park Lofts sites in Asuncion are scheduled to open before December 2027.',
        'The Asuncion Times coverage represents an important recognition from international press in Paraguay, consolidating Park Lofts\' presence among English-speaking audiences, expat investors and digital nomads.',
      ],
    },
    de: {
      title: 'Asuncion Times: "Park Lofts Tower definiert urbanes Luxuswohnen in Asuncion neu"',
      excerpt: 'Paraguays führendes englischsprachiges Medium veröffentlichte ein umfassendes Porträt über Park Lofts Tower — klimaresponsive Architektur, deutsche Baustandards und Hospitality-Amenities.',
      content: [
        'Asuncion Times widmete Park Lofts Tower einen ausführlichen Beitrag und positionierte das Projekt als Wendepunkt für den Premium-Immobilienmarkt in Asuncion. Der Artikel hebt klimaresponsive Architektur mit tiefen Balkonen und optimierten Sonnenwinkeln, deutsche Doppelglas-Schallschutzfenster, Samsung-Geräte und 3,5 Meter Deckenhöhe in den oberen Etagen hervor.',
        'Die Publikation betonte auch die Hospitality-Amenities des Projekts: Valet Parking, Concierge, Bistro mit Lieferservice in die Einheiten und Co-Working-Spaces. Laut dem Artikel sind alle fünf Park Lofts Standorte in Asuncion für eine Eröffnung vor Dezember 2027 geplant.',
        'Die Berichterstattung in Asuncion Times stellt eine wichtige Anerkennung durch die internationale Presse in Paraguay dar und festigt die Präsenz von Park Lofts bei englischsprachigen Zielgruppen, Expat-Investoren und digitalen Nomaden.',
      ],
    },
  },
  'forbes-park-lofts-nuevo-hito-real-estate': {
    en: {
      title: 'Forbes Paraguay: "Park Lofts sets a new milestone in local real estate with a US$ 10 million project"',
      excerpt: 'Forbes Paraguay published a feature on the Park Lofts Tower launch, highlighting the US$ 10 million investment, over 230 units sold in under a year, and the brand\'s first integrated hotel.',
      content: [
        'Forbes Paraguay covered the launch of Park Lofts Tower in detail as a milestone for the local real estate market. The article describes a 25-story, 120-unit project with a total investment of US$ 10 million, with units from US$ 59,000 to a US$ 500,000 penthouse.',
        'The publication highlighted that Park Lofts sold over 230 units in less than a year across its earlier projects, with no debt. The launch of Paraguay\'s first integrated "Park Lofts Hotel" was also featured, with premium amenities including a rooftop pool, valet parking, room service and an internal bistro.',
        'Forbes quoted Robin Loths on the vision of providing accredited investors and family offices with a comprehensive real estate investment solution. The article also mentions a 198% increase in digital nomad migration to Asuncion in 2025.',
      ],
    },
    de: {
      title: 'Forbes Paraguay: "Park Lofts setzt neuen Meilenstein im lokalen Immobilienmarkt mit US$ 10 Mio. Projekt"',
      excerpt: 'Forbes Paraguay berichtete über den Launch von Park Lofts Tower — US$ 10 Mio. Investition, über 230 verkaufte Einheiten in weniger als einem Jahr und das erste integrierte Hotel der Marke.',
      content: [
        'Forbes Paraguay berichtete ausführlich über den Launch von Park Lofts Tower als Meilenstein für den lokalen Immobilienmarkt. Der Artikel beschreibt ein 25-stöckiges Projekt mit 120 Einheiten und einer Gesamtinvestition von US$ 10 Millionen — von US$ 59.000 bis zum US$ 500.000-Penthouse.',
        'Die Publikation hob hervor, dass Park Lofts in weniger als einem Jahr über 230 Einheiten in früheren Projekten verkaufte — ohne Verschuldung. Auch der Launch des ersten integrierten "Park Lofts Hotel" in Paraguay wurde vorgestellt, mit Premium-Amenities wie Rooftop-Pool, Valet Parking, Zimmerservice und internem Bistro.',
        'Forbes zitierte Robin Loths zur Vision, akkreditierten Investoren und Family Offices eine umfassende Immobilien-Investmentlösung zu bieten. Der Artikel erwähnt zudem einen Anstieg der Digital-Nomad-Migration nach Asuncion um 198% im Jahr 2025.',
      ],
    },
  },
  'proyecta-inversion-europea-real-estate-paraguay': {
    en: {
      title: 'Proyecta: "European investment and innovative vision to transform real estate in Paraguay"',
      excerpt: 'The architecture and construction trade publication covered Park Lofts\' business model: temporary rental focus with 85%+ occupancy and double-digit projected returns.',
      content: [
        'Proyecta, Paraguay\'s leading architecture and construction publication, published a detailed article on Park Lofts Tower and the European investment model behind the project. The piece describes how Park Lofts E.A.S., founded by Robin Loths and Julian Sandt, introduces a development approach unprecedented in the local market.',
        'According to the publication, the company builds exclusively for temporary rental through platforms like Airbnb and Booking.com, achieving occupancy rates above 85% with projected double-digit returns. The model targets global investors, digital nomads and the short-stay market.',
        'Proyecta\'s coverage positions Park Lofts as a benchmark in the professionalization of the compact housing and temporary rental segment in Asuncion.',
      ],
    },
    de: {
      title: 'Proyecta: "Europäische Investition und innovative Vision für die Transformation des Immobilienmarkts in Paraguay"',
      excerpt: 'Die Fachzeitschrift für Architektur und Bauwesen berichtete über das Geschäftsmodell von Park Lofts: Kurzzeitmietfokus mit über 85% Auslastung und zweistelligen Renditeprognosen.',
      content: [
        'Proyecta, Paraguays führende Fachzeitschrift für Architektur und Bauwesen, veröffentlichte einen detaillierten Artikel über Park Lofts Tower und das europäische Investitionsmodell hinter dem Projekt. Der Beitrag beschreibt, wie Park Lofts E.A.S., gegründet von Robin Loths und Julian Sandt, einen bisher einzigartigen Entwicklungsansatz im lokalen Markt einführt.',
        'Laut der Publikation baut das Unternehmen ausschließlich für temporäre Vermietung über Plattformen wie Airbnb und Booking.com — mit Auslastungsraten über 85% und zweistelligen Renditeprognosen. Das Modell richtet sich an globale Investoren, digitale Nomaden und den Kurzzeitmietermarkt.',
        'Die Berichterstattung von Proyecta positioniert Park Lofts als Referenz für die Professionalisierung des Segments kompakter Wohnungen und temporärer Vermietung in Asuncion.',
      ],
    },
  },
  'the-nomad-tax-real-estate-investment-paraguay': {
    en: {
      title: 'The Nomad Tax: Park Lofts Tower as a real estate investment case study in Paraguay',
      excerpt: 'The international expat and investor platform featured Park Lofts Tower as an investment ecosystem — not just a building — in its Paraguay real estate guide.',
      content: [
        'The Nomad Tax, a publication focused on expatriates and international investors, included Park Lofts Tower as a featured case study in its Paraguay real estate investment guide published in August 2025.',
        'The article presents Julian Sandt as a German investor who first developed studio buildings for digital nomads in Paraguay and is now scaling his vision: "Park Loft Tower, his new project, will not just be a building but an ecosystem for those who live in it."',
        'The mention in The Nomad Tax expands Park Lofts\' reach to a global audience of investors, expatriates and professionals evaluating Paraguay as an investment and relocation destination.',
      ],
    },
    de: {
      title: 'The Nomad Tax: Park Lofts Tower als Fallstudie für Immobilieninvestment in Paraguay',
      excerpt: 'Die internationale Expat- und Investorenplattform stellte Park Lofts Tower als Investment-Ökosystem vor — nicht nur ein Gebäude — in ihrem Paraguay-Immobilienguide.',
      content: [
        'The Nomad Tax, eine auf Expatriates und internationale Investoren ausgerichtete Publikation, nahm Park Lofts Tower als prominente Fallstudie in ihren Paraguay-Immobilien-Investmentguide auf, der im August 2025 veröffentlicht wurde.',
        'Der Artikel stellt Julian Sandt als deutschen Investor vor, der zunächst Studio-Gebäude für digitale Nomaden in Paraguay entwickelte und nun seine Vision skaliert: "Park Loft Tower, sein neues Projekt, wird nicht nur ein Gebäude sein, sondern ein Ökosystem für seine Bewohner."',
        'Die Erwähnung bei The Nomad Tax erweitert die Reichweite von Park Lofts auf eine globale Zielgruppe von Investoren, Expatriates und Fachleuten, die Paraguay als Investitions- und Relocation-Ziel evaluieren.',
      ],
    },
  },
  'have-your-adventure-airbnb-studios-asuncion': {
    en: {
      title: 'Have Your ADVENTURE: "Affordable investment in Paraguay — Airbnb Studios in Asuncion"',
      excerpt: 'The international travel and investment blog published a detailed analysis of the Park Lofts Recoleta model, with rental projections and return comparisons.',
      content: [
        'Have Your ADVENTURE, a reference blog for investors and travelers, published a complete analysis of the Park Lofts Recoleta project. The article details 90 studio units ranging from 22 to 32 sqm, with pre-sale prices starting at US$ 34,500, positioning them as one of the most accessible options in the market.',
        'The publication breaks down income projections: long-term rental at approximately US$ 380/month and Airbnb rental at US$ 600-800/month, with management fees of 10% (long-term) and 15% (Airbnb). The analysis concludes that Park Lofts targets an underserved niche in the compact and affordable housing market.',
        'The article also mentions the team\'s prior experience with the 22-story Palmanova Tower project and highlights the company\'s multilingual support as a differentiator for international investors.',
      ],
    },
    de: {
      title: 'Have Your ADVENTURE: "Erschwingliche Investition in Paraguay — Airbnb-Studios in Asuncion"',
      excerpt: 'Der internationale Reise- und Investmentblog veröffentlichte eine detaillierte Analyse des Park Lofts Recoleta Modells mit Mietprognosen und Renditeanalysen.',
      content: [
        'Have Your ADVENTURE, ein Referenz-Blog für Investoren und Reisende, veröffentlichte eine umfassende Analyse des Park Lofts Recoleta Projekts. Der Artikel beschreibt 90 Studio-Einheiten von 22 bis 32 m² mit Vorverkaufspreisen ab US$ 34.500 — eine der zugänglichsten Optionen am Markt.',
        'Die Publikation schlüsselt Einkommensprognosen auf: Langzeitmiete bei ca. US$ 380/Monat und Airbnb-Miete bei US$ 600-800/Monat, mit Verwaltungsgebühren von 10% (Langzeit) und 15% (Airbnb). Die Analyse kommt zum Schluss, dass Park Lofts eine unterversorgte Nische im Markt für kompakte und erschwingliche Wohnungen bedient.',
        'Der Artikel erwähnt auch die Vorerfahrung des Teams mit dem 22-stöckigen Palmanova Tower Projekt und hebt den mehrsprachigen Support des Unternehmens als Differenzierungsmerkmal für internationale Investoren hervor.',
      ],
    },
  },
  'infonegocios-park-lofts-recoleta-inversion': {
    en: {
      title: 'Infonegocios: "Park Lofts rises in Recoleta with a US$ 3 million investment — high-yield minimalism"',
      excerpt: 'Infonegocios Paraguay covered Park Lofts Recoleta: a 10-story building with 89 studios in Asuncion\'s most sought-after neighbourhood, backed by US$ 3 million in investment and premium rooftop amenities.',
      content: [
        'Infonegocios Paraguay published a feature on Park Lofts Recoleta, describing it as the tallest construction in the area at the time. The 10-story building houses 89 studios designed with a minimalist approach to maximise space efficiency.',
        'According to Julián Sandt, managing partner, "each studio is designed to maximise space efficiency, providing an attractive home for both local residents and travellers." The 10th floor includes premium rooftop amenities: coworking space, gym, panoramic pool, event venue and a terrace with a grill area.',
        'The article also notes that the company is simultaneously developing a project in Loma Pyta — already sold out — and announces an upcoming property launch near Paseo Galería. Park Lofts targets young professionals, international travellers and digital nomads seeking location, design and integrated services.',
      ],
    },
    de: {
      title: 'Infonegocios: "Park Lofts entsteht in Recoleta mit US$ 3 Mio. Investition — hochrentables Minimalismus-Konzept"',
      excerpt: 'Infonegocios Paraguay berichtete über Park Lofts Recoleta: ein 10-stöckiges Gebäude mit 89 Studios im gefragtesten Viertel Asuncions, mit US$ 3 Mio. Investition und Premium-Rooftop-Amenities.',
      content: [
        'Infonegocios Paraguay veröffentlichte einen Bericht über Park Lofts Recoleta und beschrieb es als das zu diesem Zeitpunkt höchste Gebäude in der Gegend. Das 10-stöckige Gebäude beherbergt 89 Studios, die nach minimalistischen Prinzipien für maximale Raumeffizienz konzipiert wurden.',
        'Laut Julián Sandt, geschäftsführender Gesellschafter, "ist jedes Studio so gestaltet, dass es die Raumnutzung maximiert und sowohl für Einheimische als auch für Reisende ein attraktives Zuhause bietet." Im 10. Stockwerk befinden sich Premium-Rooftop-Amenities: Coworking-Bereich, Fitnessstudio, Panoramapool, Eventraum und Dachterrasse mit Grillbereich.',
        'Der Artikel weist auch darauf hin, dass das Unternehmen gleichzeitig ein Projekt in Loma Pyta entwickelt — bereits ausverkauft — und kündigt einen bevorstehenden Immobilien-Launch nahe Paseo Galería an. Park Lofts richtet sich an junge Fachleute, internationale Reisende und digitale Nomaden, die Lage, Design und integrierte Services suchen.',
      ],
    },
  },
} as const;

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const article = newsroomBySlug[params.slug as keyof typeof newsroomBySlug];
  if (!article) return {};
  return { title: `${article.title} — Park Lofts Paraguay`, description: article.excerpt };
}

export function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }));
}

function formatDate(dateStr: string, locale: Locale) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === 'es' ? 'es-PY' : locale === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const baseArticle = newsroomBySlug[params.slug as keyof typeof newsroomBySlug];
  if (!baseArticle) notFound();

  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  const copy = copyByLocale[locale];

  const translatedEntry = articleTranslations[baseArticle.slug as keyof typeof articleTranslations];
  const translated = locale === 'es' ? undefined : translatedEntry?.[locale as 'en' | 'de'];
  const article = translated
    ? { ...baseArticle, title: translated.title, excerpt: translated.excerpt, content: translated.content }
    : baseArticle;
  const isTowerLocationArticle = article.slug === 'ubicacion-premium-park-lofts-tower';
  const hasGallery = Array.isArray(baseArticle.gallery) && baseArticle.gallery.length > 1;
  const mapEmbedSrc = 'https://www.google.com/maps?q=-25.284075,-57.561825&z=16&output=embed';
  const mapExternalUrl = 'https://maps.app.goo.gl/nz8k1f5xyzTSQAnF6';
  const locationFallbackImage =
    'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/projects/tower/parkloftstowerlocation.png';
  const towerLocationCopy = towerLocationCopyByLocale[locale];

  return (
    <>
      <section className="pt-36 pb-14 bg-cream">
        <Container narrow>
          <FadeIn><Eyebrow withLine className="mb-8">{copy.category[article.category]}</Eyebrow></FadeIn>
          <h1 className="font-display text-4xl md:text-6xl font-light text-charcoal leading-tight mb-6">{article.title}</h1>
          <p className="font-body text-base text-slate leading-relaxed mb-8">{article.excerpt}</p>
          <div className="flex items-center gap-5 font-body text-xs text-slate uppercase tracking-wide">
            <span>{formatDate(article.publishedAt, locale)}</span>
            <span>{article.readingTime} {copy.min}</span>
            <span>{copy.by} {article.author}</span>
          </div>
        </Container>
      </section>

      <section className="pb-14 bg-cream">
        <Container>
          <div
            className={`${baseArticle.imageFit === 'contain' ? '' : 'img-zoom-wrapper'} relative aspect-[16/8] overflow-hidden border border-stone`}
            style={{ backgroundColor: baseArticle.imageBg ?? undefined }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className={baseArticle.imageFit === 'contain' ? 'object-contain p-12' : 'object-cover'}
              priority
            />
          </div>
        </Container>
      </section>

      <section className="pt-14 pb-0">
        <Container narrow>
          <div className="space-y-8">
            {article.content.map((paragraph: string) => (
              <p key={paragraph} className="font-body text-lg text-charcoal-600 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {baseArticle.externalUrl && (
            <div className="mt-12 pt-8 border-t border-stone">
              <a
                href={baseArticle.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-body text-sm uppercase tracking-widest text-gold hover:text-charcoal transition-colors duration-300"
              >
                <span>{copy.readOriginal}</span>
                <span className="font-body text-xs text-slate">— {baseArticle.source}</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          )}
        </Container>
      </section>

      {hasGallery && (
        <section className="py-14 bg-cream-100">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {baseArticle.gallery!.map((src, i) => (
                <div key={src} className={`relative overflow-hidden border border-stone ${i === 0 ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={src}
                    alt={`${article.title} — foto ${i + 1}`}
                    fill
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {isTowerLocationArticle && (
        <section className="py-14">
          <Container>
            <div className="border border-stone bg-white p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">{towerLocationCopy.eyebrow}</p>
                  <h3 className="mt-4 font-display text-3xl font-light leading-tight text-charcoal">{towerLocationCopy.title}</h3>
                  <p className="mt-5 font-body text-base leading-relaxed text-slate">{towerLocationCopy.lead}</p>
                  <ul className="mt-7 space-y-3">
                    {towerLocationCopy.points.map((point) => (
                      <li key={point} className="font-body text-sm leading-relaxed text-charcoal-600">
                        • {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={mapExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline mt-8 inline-flex"
                  >
                    {towerLocationCopy.mapLabel}
                  </a>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-7">
                  <div className="overflow-hidden border border-stone">
                    <iframe
                      src={mapEmbedSrc}
                      title="Ubicacion de Park Lofts Tower"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-[380px] w-full lg:h-[420px]"
                    />
                    <p className="border-t border-stone px-4 py-3 font-body text-xs text-slate">{towerLocationCopy.mapCaption}</p>
                  </div>
                  <div className="overflow-hidden border border-stone">
                    <Image
                      src={locationFallbackImage}
                      alt="Mapa de ubicacion de Park Lofts Tower"
                      width={2048}
                      height={933}
                      className="w-full aspect-[16/7] object-cover object-center"
                    />
                    <p className="border-t border-stone px-4 py-3 font-body text-xs text-slate">{towerLocationCopy.imageCaption}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="pb-14">
        <Container narrow>
          <div className="pt-8 border-t border-stone">
            <Link href={`/${params.locale}/newsroom`} className="btn-outline inline-flex">
              {copy.back}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
