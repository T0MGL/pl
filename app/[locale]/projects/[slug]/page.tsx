import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/home/ContactCTA';
import VirtualTourSection from '@/components/sections/project/VirtualTourSection';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { projects, projectsBySlug } from '@/lib/content';

type Locale = 'es' | 'en' | 'de';

interface ProjectPageProps {
  params: { locale: string; slug: string };
}

const copyByLocale = {
  es: {
    status: { selling: 'En venta', 'pre-construction': 'Pre-construcción', construction: 'En construcción', delivered: 'Entregado', upcoming: 'Próximamente' },
    labels: {
      location: 'Ubicación',
      address: 'Dirección',
      floors: 'Pisos',
      delivery: 'Entrega',
      overview: 'Resumen del proyecto',
      features: 'Características del proyecto',
      inquiryTitleSale: 'Consultar inversión',
      inquiryTitleResale: 'Consultar disponibilidad en reventa',
      inquiryBody: 'Nuestro equipo comercial le acompaña en cada paso para elegir la mejor opción.',
      commercialStatus: 'Estado comercial',
      price: 'Precio',
      unknown: 'A consultar',
      sold: 'Agotado / Reventa',
      speak: 'Hablar con un asesor',
      brochure: 'Solicitar brochure',
      gallery: 'Galería',
      amenities: 'Amenities & Servicios',
      ctaEyebrow: 'Asesoría personalizada',
      ctaHeadlinePrefix: '¿Interesado en',
      ctaBody: 'Comparta su objetivo de inversión y le presentaremos alternativas alineadas a su perfil.',
      cta: 'Hablar con un asesor',
      ctaSecondary: 'Ver otros proyectos',
    },
    genericDescription: (name: string) =>
      `${name} integra ubicación estratégica, diseño contemporáneo y ejecución con estándar Park Lofts. El proyecto está orientado a una demanda urbana activa y a un enfoque de inversión de largo plazo.`,
    genericTagline: (name: string) => `${name} — proyecto urbano de alto estándar en Asunción`,
    genericFeatures: [
      'Ubicación en corredor urbano de alta demanda',
      'Arquitectura orientada a eficiencia y funcionalidad',
      'Estándar constructivo consistente en todas las etapas',
      'Modelo comercial alineado a inversión patrimonial',
      'Configuración apta para mercado de renta corta',
      'Acompañamiento del equipo durante el proceso de compra',
    ],
    genericAmenities: [
      'Accesos controlados',
      'Áreas comunes funcionales',
      'Espacios de uso social',
      'Servicios para operación diaria',
      'Mantenimiento centralizado',
      'Diseño interior contemporáneo',
    ],
  },
  en: {
    status: { selling: 'For sale', 'pre-construction': 'Pre-construction', construction: 'Under construction', delivered: 'Delivered', upcoming: 'Coming soon' },
    labels: {
      location: 'Location',
      address: 'Address',
      floors: 'Floors',
      delivery: 'Delivery',
      overview: 'Project overview',
      features: 'Project highlights',
      inquiryTitleSale: 'Investment inquiry',
      inquiryTitleResale: 'Resale availability inquiry',
      inquiryBody: 'Our commercial team supports you through each step to evaluate the best option.',
      commercialStatus: 'Commercial status',
      price: 'Price',
      unknown: 'On request',
      sold: 'Sold out / Resale',
      speak: 'Speak with an advisor',
      brochure: 'Request brochure',
      gallery: 'Gallery',
      amenities: 'Amenities & Services',
      ctaEyebrow: 'Personal advisory',
      ctaHeadlinePrefix: 'Interested in',
      ctaBody: 'Share your investment objective and we will present options aligned with your profile.',
      cta: 'Speak with an advisor',
      ctaSecondary: 'View other projects',
    },
    genericDescription: (name: string) =>
      `${name} combines strategic location, contemporary design, and Park Lofts execution standards. The project is built for active urban demand and long-term investment vision.`,
    genericTagline: (name: string) => `${name} — high-standard urban project in Asuncion`,
    genericFeatures: [
      'Location in a high-demand urban corridor',
      'Architecture focused on efficiency and functionality',
      'Consistent construction standards across all phases',
      'Commercial model aligned with capital preservation',
      'Configuration suited for short-stay rental market',
      'End-to-end support from our advisory team',
    ],
    genericAmenities: [
      'Controlled access',
      'Functional shared areas',
      'Social-use spaces',
      'Daily operation support services',
      'Centralized maintenance',
      'Contemporary interior design',
    ],
  },
  de: {
    status: { selling: 'Zu verkaufen', 'pre-construction': 'Vorverkauf', construction: 'Im Bau', delivered: 'Übergeben', upcoming: 'Demnächst' },
    labels: {
      location: 'Lage',
      address: 'Adresse',
      floors: 'Etagen',
      delivery: 'Fertigstellung',
      overview: 'Projektüberblick',
      features: 'Projektmerkmale',
      inquiryTitleSale: 'Investment-Anfrage',
      inquiryTitleResale: 'Anfrage zum Wiederverkauf',
      inquiryBody: 'Unser Team begleitet Sie bei der Bewertung der passenden Option.',
      commercialStatus: 'Vermarktungsstatus',
      price: 'Preis',
      unknown: 'Auf Anfrage',
      sold: 'Ausverkauft / Wiederverkauf',
      speak: 'Mit einem Berater sprechen',
      brochure: 'Broschüre anfordern',
      gallery: 'Galerie',
      amenities: 'Ausstattung & Services',
      ctaEyebrow: 'Persönliche Beratung',
      ctaHeadlinePrefix: 'Interesse an',
      ctaBody: 'Teilen Sie uns Ihr Investitionsziel mit und wir schlagen passende Optionen vor.',
      cta: 'Mit einem Berater sprechen',
      ctaSecondary: 'Weitere Projekte ansehen',
    },
    genericDescription: (name: string) =>
      `${name} verbindet strategische Lage, zeitgemäßes Design und die Ausführungsstandards von Park Lofts. Das Projekt ist auf urbane Nachfrage und langfristige Kapitalentwicklung ausgerichtet.`,
    genericTagline: (name: string) => `${name} — urbanes Projekt mit hohem Standard in Asuncion`,
    genericFeatures: [
      'Lage in einem stark nachgefragten Stadtkorridor',
      'Architektur mit Fokus auf Effizienz und Funktion',
      'Konsistente Bauqualität über alle Phasen hinweg',
      'Vermarktungsmodell mit Fokus auf Werterhalt',
      'Geeignet für den Kurzzeitmietmarkt',
      'Begleitung durch unser Team im gesamten Kaufprozess',
    ],
    genericAmenities: [
      'Kontrollierte Zugänge',
      'Funktionale Gemeinschaftsbereiche',
      'Soziale Aufenthaltsflächen',
      'Services für den täglichen Betrieb',
      'Zentrale Instandhaltung',
      'Zeitgemäßes Interior-Design',
    ],
  },
} as const;

const SITE_URL = 'https://www.parkloftsparaguay.com';

const keywordsByLocale: Record<string, (project: { name: string; neighborhood: string }) => string[]> = {
  es: ({ name, neighborhood }) => [
    `${name.toLowerCase()} precio`,
    `${name.toLowerCase()} asuncion`,
    `apartamentos ${neighborhood.toLowerCase()} asuncion`,
    'inversión inmobiliaria paraguay',
    'renta corta asuncion',
    'departamentos en venta asuncion paraguay',
    'park lofts paraguay',
  ],
  en: ({ name, neighborhood }) => [
    `${name} asuncion`,
    `${name} price`,
    `apartments ${neighborhood} asuncion`,
    'real estate investment paraguay',
    'buy apartment asuncion paraguay',
    'short stay rental asuncion',
    'park lofts paraguay',
  ],
  de: ({ name, neighborhood }) => [
    `${name} Asuncion`,
    `Wohnung ${neighborhood} Asuncion`,
    'Immobilieninvestment Paraguay',
    'Park Lofts Paraguay',
    'Kurzzeitmiete Asuncion',
  ],
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsBySlug[params.slug as keyof typeof projectsBySlug];
  if (!project) return {};

  const locale = params.locale ?? 'es';
  const canonical =
    locale === 'es'
      ? `${SITE_URL}/projects/${project.slug}`
      : `${SITE_URL}/${locale}/projects/${project.slug}`;

  const titleByLocale: Record<string, string> = {
    es: `${project.name} — Apartamento de Lujo en Asunción | Park Lofts Paraguay`,
    en: `${project.name} — Luxury Apartment in Asuncion | Park Lofts Paraguay`,
    de: `${project.name} — Luxuswohnung in Asunción | Park Lofts Paraguay`,
    pt: `${project.name} — Apartamento de Luxo em Assunção | Park Lofts Paraguay`,
  };

  const descByLocale: Record<string, string> = {
    es: `${project.shortDescription} Ubicado en ${project.neighborhood}, Asunción. Inversión en renta corta con estándar Park Lofts.`,
    en: `${project.shortDescription} Located in ${project.neighborhood}, Asuncion. Short-stay rental investment with Park Lofts standards.`,
    de: `${project.shortDescription} Lage: ${project.neighborhood}, Asunción. Kurzzeitmiete-Investment nach Park Lofts Standards.`,
    pt: `${project.shortDescription} Localizado em ${project.neighborhood}, Assunção. Investimento em aluguel de curta duração com padrões Park Lofts.`,
  };

  const title = titleByLocale[locale] ?? titleByLocale.es;
  const description = descByLocale[locale] ?? descByLocale.es;
  const keywords = (keywordsByLocale[locale] ?? keywordsByLocale.es)({ name: project.name, neighborhood: project.neighborhood });

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 800,
          alt: `${project.name} — ${project.neighborhood}, Asunción | Park Lofts Paraguay`,
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/projects/${project.slug}`,
        en: `${SITE_URL}/en/projects/${project.slug}`,
        de: `${SITE_URL}/de/projects/${project.slug}`,
        'x-default': `${SITE_URL}/projects/${project.slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsBySlug[params.slug as keyof typeof projectsBySlug];
  if (!project) notFound();

  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  const copy = copyByLocale[locale];
  const isResale = project.status === 'delivered';

  const galleryAltByIndex = (i: number): string => {
    const descriptors: Record<string, string[]> = {
      es: [
        `${project.name} — vista exterior, ${project.neighborhood} Asunción`,
        `${project.name} — lobby de entrada premium`,
        `${project.name} — interior del apartamento tipo estudio`,
        `${project.name} — interior, acabados de lujo`,
        `${project.name} — cafetería y área social`,
        `${project.name} — rooftop con vistas panorámicas`,
        `${project.name} — edificio completo, ${project.neighborhood}`,
        `${project.name} — mapa de ubicación, ${project.location}`,
      ],
      en: [
        `${project.name} — exterior view, ${project.neighborhood} Asuncion`,
        `${project.name} — premium entrance lobby`,
        `${project.name} — studio apartment interior`,
        `${project.name} — interior, luxury finishes`,
        `${project.name} — cafe and social area`,
        `${project.name} — rooftop with panoramic views`,
        `${project.name} — full building, ${project.neighborhood}`,
        `${project.name} — location map, ${project.location}`,
      ],
      de: [
        `${project.name} — Außenansicht, ${project.neighborhood} Asunción`,
        `${project.name} — Premium-Eingangsbereich`,
        `${project.name} — Studio-Wohnung Innenbereich`,
        `${project.name} — Innenbereich, Luxusausstattung`,
        `${project.name} — Café und Sozialbereich`,
        `${project.name} — Rooftop mit Panoramablick`,
        `${project.name} — Gesamtgebäude, ${project.neighborhood}`,
        `${project.name} — Lageplan, ${project.location}`,
      ],
    };
    const arr = descriptors[locale] ?? descriptors.es;
    return arr[i] ?? `${project.name} — ${project.neighborhood}, Asunción (${i + 1})`;
  };

  return (
    <>
      {/* BreadcrumbList — enables breadcrumb rich results in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Park Lofts Paraguay',
                item: SITE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: locale === 'en' ? 'Projects' : locale === 'de' ? 'Projekte' : 'Proyectos',
                item:
                  locale === 'es'
                    ? `${SITE_URL}/projects`
                    : `${SITE_URL}/${locale}/projects`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: project.name,
                item:
                  locale === 'es'
                    ? `${SITE_URL}/projects/${project.slug}`
                    : `${SITE_URL}/${locale}/projects/${project.slug}`,
              },
            ],
          }),
        }}
      />

      {/* RealEstateListing — enables rich results for real estate properties */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Apartment',
            name: project.name,
            description: locale === 'es' ? project.description : copyByLocale[locale as Locale]?.genericDescription(project.name),
            url:
              locale === 'es'
                ? `${SITE_URL}/projects/${project.slug}`
                : `${SITE_URL}/${locale}/projects/${project.slug}`,
            image: project.gallery.slice(0, 4).map((img, i) => ({
              '@type': 'ImageObject',
              url: img,
              name: galleryAltByIndex(i),
            })),
            address: {
              '@type': 'PostalAddress',
              streetAddress: project.location,
              addressLocality: 'Asunción',
              addressRegion: project.neighborhood,
              addressCountry: 'PY',
            },
            numberOfRooms: project.units ?? undefined,
            numberOfFloors: project.floors,
            floorSize: project.minArea
              ? { '@type': 'QuantitativeValue', value: project.minArea, unitCode: 'MTK' }
              : undefined,
            offers: {
              '@type': 'Offer',
              seller: { '@id': `${SITE_URL}/#organization` },
              availability:
                project.status === 'selling'
                  ? 'https://schema.org/InStock'
                  : project.status === 'delivered'
                    ? 'https://schema.org/LimitedAvailability'
                    : project.status === 'pre-construction'
                      ? 'https://schema.org/PreSale'
                      : 'https://schema.org/PreOrder',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      <section className="relative h-[75vh] min-h-[600px] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={`${project.name} — ${project.neighborhood}, Asunción | Park Lofts Paraguay`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        <div className="absolute bottom-0 left-0 right-0">
          <Container className="pb-12">
            <FadeIn>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="eyebrow text-gold-light">{copy.status[project.status]}</span>
              </div>
            </FadeIn>
            <TextReveal text={project.name} as="h1" className="font-display text-hero font-light text-white mb-4" />
            <FadeIn delay={0.3}>
              <p className="font-body text-lg text-white/70">
                {locale === 'es' ? project.tagline : copy.genericTagline(project.name)}
              </p>
            </FadeIn>
          </Container>
        </div>
      </section>

      <div className="bg-charcoal">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-charcoal-700">
            {[
              { label: copy.labels.location, value: project.neighborhood },
              { label: copy.labels.address, value: project.location },
              { label: copy.labels.floors, value: `${project.floors}` },
              { label: copy.labels.delivery, value: project.deliveryDate },
            ].map(({ label, value }) => (
              <div key={label} className="py-6 px-4 md:px-8">
                <span className="eyebrow text-charcoal-400 block mb-1">{label}</span>
                <span className="font-body text-sm text-white">{value}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <section className="section-py">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <FadeIn>
                <Eyebrow withLine className="mb-8">{copy.labels.overview}</Eyebrow>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="font-body text-lg text-charcoal-600 leading-relaxed mb-8">
                  {locale === 'es' ? project.description : copy.genericDescription(project.name)}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h3 className="font-display text-2xl font-light text-charcoal mb-6">{copy.labels.features}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(locale === 'es' ? project.features : copy.genericFeatures).map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-4 bg-gold shrink-0" />
                      <span className="font-body text-sm text-slate">{feature}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={0.3} direction="left">
                <div className="sticky top-28 bg-cream-200 p-8 border border-stone">
                  <h3 className="font-display text-2xl font-light text-charcoal mb-2">
                    {isResale ? copy.labels.inquiryTitleResale : copy.labels.inquiryTitleSale}
                  </h3>
                  <p className="font-body text-sm text-slate mb-6">{copy.labels.inquiryBody}</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between">
                      <span className="font-body text-xs text-slate uppercase tracking-wide">
                        {copy.labels.commercialStatus}
                      </span>
                      <span className="font-body text-sm font-medium text-charcoal">
                        {isResale ? copy.labels.sold : copy.labels.unknown}
                      </span>
                    </div>
                    <div className="divider" />
                    <div className="flex justify-between">
                      <span className="font-body text-xs text-slate uppercase tracking-wide">{copy.labels.price}</span>
                      <span className="font-body text-sm font-medium text-charcoal">{copy.labels.unknown}</span>
                    </div>
                    <div className="divider" />
                    <div className="flex justify-between">
                      <span className="font-body text-xs text-slate uppercase tracking-wide">{copy.labels.floors}</span>
                      <span className="font-body text-sm font-medium text-charcoal">{project.floors}</span>
                    </div>
                  </div>

                  <Link href={`/${params.locale}/contact?project=${project.slug}`} className="btn-primary w-full text-center block mb-3">
                    {copy.labels.speak}
                  </Link>
                  <button className="btn-outline w-full text-center">{copy.labels.brochure}</button>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-py bg-cream-200">
        <Container>
          <FadeIn>
            <Eyebrow withLine className="mb-12">{copy.labels.gallery}</Eyebrow>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="img-zoom-wrapper relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img}
                    alt={galleryAltByIndex(i)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {project.virtualTours && project.virtualTours.length > 0 && (
        <VirtualTourSection tours={project.virtualTours} locale={params.locale} />
      )}

      <section className="section-py">
        <Container>
          <FadeIn>
            <Eyebrow withLine className="mb-8">{copy.labels.amenities}</Eyebrow>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(locale === 'es' ? project.amenities : copy.genericAmenities).map((amenity, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-4 border border-stone hover:border-gold transition-colors duration-300">
                  <span className="h-1 w-4 bg-gold shrink-0" />
                  <span className="font-body text-sm text-charcoal">{amenity}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA
        locale={params.locale}
        t={{
          eyebrow: copy.labels.ctaEyebrow,
          headline: `${copy.labels.ctaHeadlinePrefix}\n${project.name}?`,
          body: copy.labels.ctaBody,
          cta: copy.labels.cta,
          ctaSecondary: copy.labels.ctaSecondary,
        }}
      />
    </>
  );
}
