import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import FadeIn from '@/components/animations/FadeIn';
import { ScrollRevealContainer, ScrollRevealItem, TextReveal } from '@/components/animations/ScrollReveal';
import ContactCTA from '@/components/sections/home/ContactCTA';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { partnerAssets } from '@/lib/partners';

type Locale = 'es' | 'en' | 'de' | 'pt';

const SITE_URL = 'https://www.parkloftsparaguay.com';

const aboutMetaByLocale: Record<Locale, { title: string; description: string; keywords: string[] }> = {
  es: {
    title: 'Sobre Nosotros — Park Lofts Paraguay | Desarrolladora Inmobiliaria Premium',
    description:
      'Conocé al equipo y la visión detrás de Park Lofts Paraguay. Desarrolladora inmobiliaria de mayor crecimiento en Paraguay con estándares alemanes. Misión, valores y filosofía constructiva.',
    keywords: [
      'park lofts paraguay equipo',
      'desarrolladora inmobiliaria asuncion',
      'inmobiliaria alemana paraguay',
      'constructora premium paraguay',
      'calidad alemana paraguay',
    ],
  },
  en: {
    title: 'About Us — Park Lofts Paraguay | Premium Real Estate Developer',
    description:
      "Meet the team and vision behind Park Lofts Paraguay — the fastest-growing premium real estate developer in Paraguay, built to German construction standards.",
    keywords: [
      'park lofts paraguay team',
      'real estate developer asuncion',
      'german quality paraguay',
      'premium property developer paraguay',
      'luxury developer asuncion',
    ],
  },
  de: {
    title: 'Über uns — Park Lofts Paraguay | Premium-Immobilienentwickler',
    description:
      'Das Team und die Vision hinter Park Lofts Paraguay — dem am schnellsten wachsenden Premium-Immobilienentwickler Paraguays mit deutschen Baustandards.',
    keywords: [
      'Park Lofts Paraguay Team',
      'Immobilienentwickler Asuncion',
      'deutsche Qualität Paraguay',
      'Bauunternehmen Paraguay',
    ],
  },
  pt: {
    title: 'Sobre nós — Park Lofts Paraguay | Incorporadora Imobiliária Premium',
    description:
      'Conheça a equipe e a visão por trás da Park Lofts Paraguay — a incorporadora imobiliária premium de maior crescimento no Paraguai com padrões de construção alemães.',
    keywords: [
      'park lofts paraguai equipe',
      'incorporadora imobiliária assunção',
      'qualidade alemã paraguai',
      'construtora premium paraguai',
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (['es', 'en', 'de', 'pt'].includes(params.locale) ? params.locale : 'es') as Locale;
  const meta = aboutMetaByLocale[locale];
  const canonical = locale === 'es' ? `${SITE_URL}/about` : `${SITE_URL}/${locale}/about`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [
        {
          url: 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/allprojects.png',
          width: 1200,
          height: 630,
          alt: 'Park Lofts Paraguay — Equipo y Proyectos',
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/about`,
        en: `${SITE_URL}/en/about`,
        de: `${SITE_URL}/de/about`,
        pt: `${SITE_URL}/pt/about`,
        'x-default': `${SITE_URL}/about`,
      },
    },
  };
}

const copyByLocale = {
  es: {
    eyebrow: 'Sobre nosotros',
    hero: 'Construimos el futuro\ncon estilo,\nsubstancia y visión',
    body: 'Park Lofts es la empresa constructora de mayor crecimiento en Paraguay. Nuestro equipo experto alemán aporta años de experiencia en arquitectura, desarrollo de proyectos y construcción residencial de alto estándar — llevando la calidad alemana al potencial inmobiliario paraguayo.',
    mission: 'Misión',
    missionText: 'Llevar la vida urbana a un nuevo nivel y generar el máximo retorno para nuestros clientes — acompañando cada proyecto con precisión, pasión y un compromiso inquebrantable con la calidad, desde el análisis del terreno hasta la entrega llave en mano.',
    vision: 'Visión',
    visionText: 'Con cada edificio, moldeamos activamente el futuro de Asunción mediante arquitectura atemporal, layouts inteligentes y conceptos de vida sostenible — creando activos inmobiliarios que generan valor para propietarios, inversores y el paisaje urbano del mañana.',
    principles: 'Principios',
    principlesTitle: 'Cómo trabajamos\nen cada proyecto',
    philosophy: 'Filosofía',
    philosophyTitle: 'Construido con precisión,\npasión y calidad\nsin concesiones',
    philosophyBody: 'Desde el análisis del terreno hasta la planificación, ejecución y entrega llave en mano — acompañamos cada proyecto con el mismo compromiso inquebrantable. Con cada edificio, moldeamos activamente el futuro de Asunción mediante arquitectura atemporal y conceptos de vida sostenible.',
    network: 'Ecosistema',
    networkTitle: 'Red comercial y\nrespaldo institucional',
    networkBody: 'Trabajamos con canales de distribución, brokers y entidades institucionales que amplían nuestro alcance comercial y refuerzan la confianza de mercado para nuestros inversores.',
    team: 'Equipo',
    teamTitle: 'Un equipo multidisciplinario\npara un mercado exigente',
    ctaEyebrow: 'Trabajemos juntos',
    ctaHeadline: 'Conversemos sobre\nsu próxima inversión',
    ctaBody: 'Le ayudamos a evaluar opciones de inversión dentro de nuestro portafolio activo — apartamentos estudio diseñados para el máximo retorno en el mercado de alquiler en auge de Asunción.',
    cta: 'Iniciar conversación',
    ctaSecondary: 'Ver proyectos',
  },
  en: {
    eyebrow: 'About us',
    hero: 'We build the future\nwith style,\nsubstance and vision',
    body: "Park Lofts is Paraguay's fastest-growing construction development company. Our German expert team brings years of experience in architecture, project development, and high-end residential building — delivering German quality to Paraguay's most dynamic real estate market.",
    mission: 'Mission',
    missionText: "To take urban living to a new level and deliver maximum returns for our clients — accompanying each project with precision, passion, and an uncompromising commitment to quality from site analysis through to turnkey handover.",
    vision: 'Vision',
    visionText: "With every building, we actively shape Asunción's future through timeless architecture, smart layouts, and sustainable living concepts — creating real estate that adds value for owner-occupiers, investors, and the cityscape of tomorrow.",
    principles: 'Principles',
    principlesTitle: 'How we work\non every project',
    philosophy: 'Philosophy',
    philosophyTitle: 'Built with precision,\npassion and\nuncompromising quality',
    philosophyBody: "From site analysis to planning, execution, and handover of turnkey apartments — we accompany each project with the same unwavering commitment. With every building, we actively shape Asunción's future through timeless architecture, smart layouts, and sustainable living concepts.",
    network: 'Ecosystem',
    networkTitle: 'Commercial network\nand institutional backing',
    networkBody: 'We work with distribution channels, brokers and institutional entities that strengthen our market reach and build investor confidence in every project we develop.',
    team: 'Team',
    teamTitle: 'A multidisciplinary team\nfor a demanding market',
    ctaEyebrow: "Let's work together",
    ctaHeadline: "Let's discuss\nyour next investment",
    ctaBody: "We help you evaluate investment options within our active portfolio — studio apartments built for maximum returns in Asunción's booming rental market.",
    cta: 'Start conversation',
    ctaSecondary: 'View projects',
  },
  de: {
    eyebrow: 'Über uns',
    hero: 'Wir bauen die Zukunft\nmit Stil,\nSubstanz und Vision',
    body: 'Park Lofts ist Paraguays am schnellsten wachsendes Bauunternehmen. Unser deutsches Expertenteam bringt jahrelange Erfahrung in Architektur, Projektentwicklung und hochwertigem Wohnungsbau ein — und trägt deutsche Qualität in den dynamischsten Immobilienmarkt Paraguays.',
    mission: 'Mission',
    missionText: 'Urbanes Wohnen auf ein neues Niveau zu heben und maximale Renditen für unsere Kunden zu erzielen — jedes Projekt mit Präzision, Leidenschaft und kompromisslosem Qualitätsanspruch begleitend, von der Standortanalyse bis zur schlüsselfertigen Übergabe.',
    vision: 'Vision',
    visionText: 'Mit jedem Gebäude gestalten wir aktiv Asuncións Zukunft durch zeitlose Architektur, smarte Grundrisse und nachhaltige Wohnkonzepte — Immobilien, die Mehrwert schaffen für Eigennutzer, Investoren und das Stadtbild von morgen.',
    principles: 'Prinzipien',
    principlesTitle: 'Wie wir\nan jedem Projekt arbeiten',
    philosophy: 'Philosophie',
    philosophyTitle: 'Gebaut mit Präzision,\nLeidenschaft und\nkompromissloser Qualität',
    philosophyBody: 'Von der Standortanalyse über Planung und Ausführung bis zur schlüsselfertigen Übergabe — wir begleiten jedes Projekt mit demselben unerschütterlichen Engagement. Mit jedem Gebäude gestalten wir aktiv Asuncións Zukunft durch zeitlose Architektur und nachhaltige Wohnkonzepte.',
    network: 'Ökosystem',
    networkTitle: 'Vertriebsnetzwerk\nund institutionelle Unterstützung',
    networkBody: 'Wir arbeiten mit Vertriebskanälen, Maklern und institutionellen Partnern, die unsere Marktreichweite stärken und das Vertrauen von Investoren in jedes unserer Projekte festigen.',
    team: 'Team',
    teamTitle: 'Ein multidisziplinäres Team\nfür einen anspruchsvollen Markt',
    ctaEyebrow: 'Zusammenarbeiten',
    ctaHeadline: 'Sprechen wir über\nIhre nächste Investition',
    ctaBody: 'Wir unterstützen Sie bei der Bewertung von Investmentoptionen im aktiven Portfolio — Studio-Apartments für maximale Renditen in Asuncións boomenden Mietmarkt.',
    cta: 'Gespräch starten',
    ctaSecondary: 'Projekte ansehen',
  },
  pt: {
    eyebrow: 'Sobre nós',
    hero: 'Construímos o futuro\ncom estilo,\nsubstância e visão',
    body: 'Park Lofts é a empresa de construção de maior crescimento do Paraguai. Nossa equipe especializada alemã traz anos de experiência em arquitetura, desenvolvimento de projetos e construção residencial de alto padrão — levando a qualidade alemã ao potencial imobiliário paraguaio.',
    mission: 'Missão',
    missionText: 'Elevar a vida urbana a um novo patamar e gerar o máximo retorno para nossos clientes — acompanhando cada projeto com precisão, paixão e um compromisso inabalável com a qualidade, da análise do terreno até a entrega chave na mão.',
    vision: 'Visão',
    visionText: 'Com cada edifício, moldamos ativamente o futuro de Assunção por meio de arquitetura atemporal, layouts inteligentes e conceitos de vida sustentável — criando imóveis que geram valor para proprietários, investidores e a paisagem urbana do amanhã.',
    principles: 'Princípios',
    principlesTitle: 'Como trabalhamos\nem cada projeto',
    philosophy: 'Filosofia',
    philosophyTitle: 'Construído com precisão,\npaixão e qualidade\nsem concessões',
    philosophyBody: 'Da análise do terreno ao planejamento, execução e entrega chave na mão — acompanhamos cada projeto com o mesmo compromisso inabalável. Com cada edifício, moldamos ativamente o futuro de Assunção por meio de arquitetura atemporal e conceitos de vida sustentável.',
    network: 'Ecossistema',
    networkTitle: 'Rede comercial e\nrespaldo institucional',
    networkBody: 'Trabalhamos com canais de distribuição, corretores e entidades institucionais que ampliam nosso alcance comercial e reforçam a confiança de mercado para nossos investidores.',
    team: 'Equipe',
    teamTitle: 'Uma equipe multidisciplinar\npara um mercado exigente',
    ctaEyebrow: 'Vamos trabalhar juntos',
    ctaHeadline: 'Vamos conversar sobre\nseu próximo investimento',
    ctaBody: 'Ajudamos você a avaliar opções de investimento dentro de nosso portfólio ativo — apartamentos estúdio projetados para o máximo retorno no mercado de aluguel em expansão de Assunção.',
    cta: 'Iniciar conversa',
    ctaSecondary: 'Ver projetos',
  },
} as const;

const values = [
  { number: '01', es: ['Rigor', 'Planificación, ejecución y control con estándares técnicos definidos.'], en: ['Rigor', 'Planning, execution and control under clearly defined technical standards.'], de: ['Präzision', 'Planung, Ausführung und Kontrolle unter klaren technischen Standards.'], pt: ['Rigor', 'Planejamento, execução e controle com padrões técnicos definidos.'] },
  { number: '02', es: ['Calidad', 'Arquitectura contemporánea, materiales seleccionados y procesos consistentes.'], en: ['Quality', 'Contemporary architecture, selected materials and consistent processes.'], de: ['Qualität', 'Zeitgemäße Architektur, ausgewählte Materialien und konsistente Prozesse.'], pt: ['Qualidade', 'Arquitetura contemporânea, materiais selecionados e processos consistentes.'] },
  { number: '03', es: ['Transparencia', 'Información clara para clientes e inversores basada en datos.'], en: ['Transparency', 'Clear, data-based information for clients and investors.'], de: ['Transparenz', 'Klare, datenbasierte Informationen für Kunden und Investoren.'], pt: ['Transparência', 'Informações claras e baseadas em dados para clientes e investidores.'] },
  { number: '04', es: ['Largo plazo', 'Cada proyecto se diseña para sostener valor urbano y patrimonial.'], en: ['Long-term view', 'Each project is designed to preserve urban and capital value.'], de: ['Langfristigkeit', 'Jedes Projekt wird auf urbanen und finanziellen Werterhalt ausgelegt.'], pt: ['Longo prazo', 'Cada projeto é desenhado para sustentar valor urbano e patrimonial.'] },
] as const;

const r2Base = 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/collaborators';

const team = [
  { name: 'Julian Sandt', role: { es: 'Socio Director', en: 'Managing Partner', de: 'Geschäftsführender Partner', pt: 'Sócio Diretor' }, image: `${r2Base}/julian-sandt-about-2.jpg` },
  { name: 'Lydia Fehmer', role: { es: 'Operaciones', en: 'Operations', de: 'Operations', pt: 'Operações' }, image: `${r2Base}/pl-lydia-fehmer.jpg` },
  { name: 'Vannia Ortellado', role: { es: 'Contabilidad', en: 'Accounting', de: 'Buchhaltung', pt: 'Contabilidade' }, image: `${r2Base}/pl-vannia-ortellado.jpg` },
  { name: 'Vivian González', role: { es: 'Compliance', en: 'Compliance', de: 'Compliance', pt: 'Compliance' }, image: `${r2Base}/pl-vivian-gonzalez.jpg` },
  { name: 'Doriam Lambaré', role: { es: 'Arquitecta', en: 'Architect', de: 'Architektin', pt: 'Arquiteta' }, image: `${r2Base}/pl-doriam-lambare.jpg` },
  { name: 'Sol Escobar', role: { es: 'Marketing', en: 'Marketing', de: 'Marketing', pt: 'Marketing' }, image: `${r2Base}/pl-sol-escobar.jpg` },
  { name: 'David Araujo', role: { es: 'Marketing', en: 'Marketing', de: 'Marketing', pt: 'Marketing' }, image: `${r2Base}/pl-david-araujo.jpg` },
  { name: 'Carlos Schröder', role: { es: 'Arquitecto', en: 'Architect', de: 'Architekt', pt: 'Arquiteto' }, image: `${r2Base}/pl-carlos-schroeder.jpg` },
  { name: 'Gastón López', role: { es: 'IT', en: 'IT', de: 'IT', pt: 'IT' }, image: `${r2Base}/Untitled-design.jpg` },
];

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = (['es', 'en', 'de', 'pt'].includes(params.locale) ? params.locale : 'es') as Locale;
  setRequestLocale(locale);
  const copy = copyByLocale[locale];

  return (
    <>
      {/* AboutPage schema — helps Google understand this is a corporate About page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name:
              locale === 'en'
                ? 'About Park Lofts Paraguay'
                : locale === 'de'
                  ? 'Über Park Lofts Paraguay'
                  : locale === 'pt'
                    ? 'Sobre Park Lofts Paraguay'
                    : 'Sobre Park Lofts Paraguay',
            url: locale === 'es' ? `${SITE_URL}/about` : `${SITE_URL}/${locale}/about`,
            description: copy.body,
            publisher: { '@id': `${SITE_URL}/#organization` },
            about: {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: 'Park Lofts Paraguay',
              foundingDate: '2024',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
              member: team.map((member) => ({
                '@type': 'OrganizationRole',
                member: {
                  '@type': 'Person',
                  name: member.name,
                  jobTitle: member.role[locale],
                  image: member.image,
                },
              })),
            },
          }),
        }}
      />

      <section className="pt-36 pb-24 bg-cream relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-cream-200 hidden lg:block" aria-hidden />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn><Eyebrow withLine className="mb-8">{copy.eyebrow}</Eyebrow></FadeIn>
              <TextReveal text={copy.hero} as="h1" className="font-display text-hero font-light text-charcoal mb-8" delay={0.1} />
              <FadeIn delay={0.3}><p className="font-body text-base text-slate leading-relaxed">{copy.body}</p></FadeIn>
            </div>
            <FadeIn delay={0.2} direction="left">
              <div className="img-zoom-wrapper relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/allprojects.png"
                  alt={
                    locale === 'en'
                      ? 'Park Lofts Paraguay — luxury residential projects in Asuncion'
                      : locale === 'de'
                        ? 'Park Lofts Paraguay — Luxuswohnprojekte in Asunción'
                        : locale === 'pt'
                          ? 'Park Lofts Paraguay — projetos residenciais de luxo em Assunção'
                          : 'Park Lofts Paraguay — proyectos residenciales de lujo en Asunción'
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="section-py bg-charcoal text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {[{ eyebrow: copy.mission, text: copy.missionText }, { eyebrow: copy.vision, text: copy.visionText }].map(({ eyebrow, text }, i) => (
              <FadeIn key={eyebrow} delay={i * 0.15}>
                <Eyebrow light withLine className="mb-8">{eyebrow}</Eyebrow>
                <p className="font-display text-xl md:text-2xl font-light text-white/80 leading-relaxed italic">&ldquo;{text}&rdquo;</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-py" id="philosophy">
        <Container>
          <FadeIn><Eyebrow withLine className="mb-6">{copy.principles}</Eyebrow></FadeIn>
          <TextReveal text={copy.principlesTitle} as="h2" className="font-display text-display font-light text-charcoal mb-16" delay={0.1} />
          <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerChildren={0.1}>
            {values.map((value) => (
              <ScrollRevealItem key={value.number}>
                <div className="group p-8 border border-stone hover:border-gold transition-colors duration-400">
                  <span className="font-display text-5xl font-light text-stone-dark block mb-6 group-hover:text-gold/20 transition-colors duration-300">{value.number}</span>
                  <h3 className="font-display text-2xl font-light text-charcoal mb-4">{value[locale][0]}</h3>
                  <p className="font-body text-sm text-slate leading-relaxed">{value[locale][1]}</p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </Container>
      </section>

      <section className="section-py bg-cream-200">
        <Container narrow>
          <FadeIn><Eyebrow className="mb-8 justify-center" withLine>{copy.philosophy}</Eyebrow></FadeIn>
          <TextReveal text={copy.philosophyTitle} as="h2" className="font-display text-display font-light text-charcoal text-center mb-12" delay={0.1} />
          <FadeIn delay={0.25}><p className="font-body text-lg text-slate leading-relaxed text-center">{copy.philosophyBody}</p></FadeIn>
        </Container>
      </section>

      <section className="section-py bg-cream">
        <Container>
          <FadeIn><Eyebrow withLine className="mb-6">{copy.network}</Eyebrow></FadeIn>
          <TextReveal text={copy.networkTitle} as="h2" className="font-display text-display font-light text-charcoal mb-6" delay={0.1} />
          <FadeIn delay={0.2}><p className="font-body text-base text-slate leading-relaxed max-w-3xl mb-12">{copy.networkBody}</p></FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FadeIn delay={0.25}>
              <div className="border border-stone bg-white p-6 h-full">
                <span className="eyebrow text-slate block mb-4">
                  {locale === 'de' ? 'Buchungsplattformen' : locale === 'en' ? 'Booking platforms' : locale === 'pt' ? 'Plataformas de reserva' : 'Plataformas de reserva'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[partnerAssets.booking, partnerAssets.airbnb].map((logo) => (
                    <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="h-20 bg-white flex items-center justify-center border border-stone/70 px-3 hover:border-gold transition-colors duration-300">
                      <Image src={logo.src} alt={logo.name} width={140} height={44} className="w-auto max-h-10 object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="border border-stone bg-white p-6 h-full">
                <span className="eyebrow text-slate block mb-4">
                  {locale === 'de' ? 'Makler und Partner' : locale === 'en' ? 'Brokers and partners' : locale === 'pt' ? 'Corretores e parceiros' : 'Brokers y aliados'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[partnerAssets.century21, partnerAssets.concremaq, partnerAssets.bbcf, partnerAssets.itau].map((logo) => (
                    <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="h-20 bg-white flex items-center justify-center border border-stone/70 px-3 hover:border-gold transition-colors duration-300">
                      <Image src={logo.src} alt={logo.name} width={110} height={36} className="w-auto max-h-9 object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="border border-stone bg-cream p-6 h-full flex items-center gap-4">
                <Image src={partnerAssets.ahkBadge.src} alt={partnerAssets.ahkBadge.name} width={80} height={80} className="w-16 h-16 object-contain shrink-0" />
                <p className="font-body text-sm text-slate leading-relaxed">
                  {locale === 'de'
                    ? 'AHK-Mercosur-Mitgliedschaft 2025 als institutioneller Vertrauensnachweis.'
                    : locale === 'en'
                      ? 'AHK Mercosur membership 2025 as institutional credibility proof.'
                      : locale === 'pt'
                        ? 'Membro AHK Mercosur 2025 como respaldo institucional.'
                        : 'Membresía AHK Mercosur 2025 como respaldo institucional.'}
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="section-py" id="team">
        <Container>
          <FadeIn><Eyebrow withLine className="mb-6">{copy.team}</Eyebrow></FadeIn>
          <TextReveal text={copy.teamTitle} as="h2" className="font-display text-display font-light text-charcoal mb-16" delay={0.1} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="group">
                  <div className="img-zoom-wrapper relative aspect-[3/4] overflow-hidden bg-stone mb-3">
                    <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition-transform duration-700" />
                  </div>
                  <h3 className="font-display text-base font-light text-charcoal mb-0.5">{member.name}</h3>
                  <span className="eyebrow text-gold block">{member.role[locale]}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA locale={params.locale} t={{ eyebrow: copy.ctaEyebrow, headline: copy.ctaHeadline, body: copy.ctaBody, cta: copy.cta, ctaSecondary: copy.ctaSecondary }} />
    </>
  );
}
