import { BarChart3, Download, FileText, Scale } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { partnerAssets } from '@/lib/partners';

type Locale = 'es' | 'en' | 'de';

const SITE_URL = 'https://www.parkloftsparaguay.com';

const irMetaByLocale: Record<string, { title: string; description: string; keywords: string[] }> = {
  es: {
    title: 'Relaciones con Inversores — Park Lofts Paraguay | Inversión Inmobiliaria Paraguay',
    description:
      'Información corporativa, rendimientos históricos y actualizaciones de proyectos de Park Lofts Paraguay. Transparencia total para inversores en bienes raíces en Asunción, Paraguay.',
    keywords: [
      'inversión inmobiliaria paraguay rendimiento',
      'invertir en paraguay bienes raices',
      'retorno alquiler corto plazo asuncion',
      'park lofts inversores paraguay',
      'desarrolladora inmobiliaria confiable paraguay',
      'track record inmobiliario asuncion',
      'USD 40000 inversión paraguay',
    ],
  },
  en: {
    title: 'Investor Relations — Park Lofts Paraguay | Real Estate Investment Paraguay',
    description:
      'Corporate data, historical returns, and project updates from Park Lofts Paraguay. Full transparency for real estate investors in Asuncion, Paraguay.',
    keywords: [
      'real estate investment paraguay returns',
      'invest in paraguay property',
      'short stay rental returns asuncion',
      'park lofts investor paraguay',
      'paraguay real estate ROI',
      'reliable property developer paraguay',
      'airbnb investment asuncion',
    ],
  },
  de: {
    title: 'Investor Relations — Park Lofts Paraguay | Immobilieninvestment Paraguay',
    description:
      'Unternehmensdaten, historische Renditen und Projektaktualisierungen von Park Lofts Paraguay. Volle Transparenz für Immobilieninvestoren in Asunción, Paraguay.',
    keywords: [
      'Immobilieninvestment Paraguay Rendite',
      'in Paraguay investieren Immobilien',
      'Kurzzeitmiete Rendite Asuncion',
      'Park Lofts Investoren Paraguay',
      'Paraguay Immobilien ROI',
    ],
  },
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale in irMetaByLocale ? params.locale : 'es';
  const meta = irMetaByLocale[locale];
  const canonical =
    locale === 'es' ? `${SITE_URL}/investor-relations` : `${SITE_URL}/${locale}/investor-relations`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
    },
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/investor-relations`,
        en: `${SITE_URL}/en/investor-relations`,
        de: `${SITE_URL}/de/investor-relations`,
        'x-default': `${SITE_URL}/investor-relations`,
      },
    },
  };
}

const copyByLocale = {
  es: {
    hero: 'Transparencia y\ncriterio financiero\npara invertir con confianza',
    body: 'Compartimos información clave de desempeño, evolución de proyectos y documentación corporativa para facilitar decisiones de inversión claras y bien fundamentadas.',
    corporate: 'Resumen corporativo',
    metrics: 'Indicadores que respaldan\nnuestro modelo de negocio',
    principle: 'Principio de relación con inversores',
    quote: 'La confianza se construye con información oportuna, criterios de ejecución consistentes y compromiso con el resultado final.',
    recognition: 'Reconocimiento global',
    recognitionTitle: 'Paraguay en el\nmapa mundial',
    stat1Caption: '#1 en crecimiento de llegadas turísticas internacionales — UN Tourism, Q1 2025',
    stat2Caption: '#1 ciudad de mayor crecimiento para trabajo remoto en el mundo — Nomad List, 2025',
    channels: 'Canales y aliados',
    channelsTitle: 'Ecosistema comercial\nque sostiene la demanda',
    docs: 'Documentación',
    docsTitle: 'Acceso centralizado\na información corporativa',
    contact: 'Contacto para inversores',
    contactTitle: 'Converse con\nInvestor Relations',
    contactBody: 'Brindamos acompañamiento personalizado para consultas de inversión, estructura de proyectos y documentación financiera.',
    office: 'Asunción, Paraguay',
    email: 'Correo protegido (usar formulario de contacto)',
  },
  en: {
    hero: 'Transparency and\nfinancial discipline\nfor confident investing',
    body: 'We provide key performance updates, project progress and corporate documentation to support clear investment decisions.',
    corporate: 'Corporate overview',
    metrics: 'Metrics supporting\nour business model',
    principle: 'Investor relation principle',
    quote: 'Trust is built through timely information, consistent execution criteria, and commitment to outcomes.',
    recognition: 'Global recognition',
    recognitionTitle: 'Paraguay on\nthe global map',
    stat1Caption: '#1 fastest-growing international tourist destination — UN Tourism, Q1 2025',
    stat2Caption: '#1 fastest-growing city for remote work in the world — Nomad List, 2025',
    channels: 'Channels and allies',
    channelsTitle: 'Commercial ecosystem\nsupporting demand',
    docs: 'Documentation',
    docsTitle: 'Centralized access\nto corporate information',
    contact: 'Investor contact',
    contactTitle: 'Speak with\nInvestor Relations',
    contactBody: 'We provide tailored support for investment inquiries, project structure and financial documentation.',
    office: 'Asuncion, Paraguay',
    email: 'Protected email (use contact form)',
  },
  de: {
    hero: 'Transparenz und\nfinanzielle Disziplin\nfür sichere Investments',
    body: 'Wir stellen Leistungsdaten, Projektfortschritte und Unternehmensdokumente für fundierte Investmententscheidungen bereit.',
    corporate: 'Unternehmensüberblick',
    metrics: 'Kennzahlen für\nunser Geschäftsmodell',
    principle: 'Grundsatz für Investorenbeziehungen',
    quote: 'Vertrauen entsteht durch zeitnahe Information, konsistente Ausführung und Ergebnisorientierung.',
    recognition: 'Globale Anerkennung',
    recognitionTitle: 'Paraguay auf\nder Weltkarte',
    stat1Caption: '#1 weltweit beim Wachstum internationaler Touristenankünfte — UN Tourism, Q1 2025',
    stat2Caption: '#1 am schnellsten wachsende Stadt für Remote-Arbeit weltweit — Nomad List, 2025',
    channels: 'Kanäle und Partner',
    channelsTitle: 'Kommerzielles Ökosystem\nzur Stützung der Nachfrage',
    docs: 'Dokumentation',
    docsTitle: 'Zentraler Zugang\nzu Unternehmensinformationen',
    contact: 'Investorenkontakt',
    contactTitle: 'Sprechen Sie mit\nInvestor Relations',
    contactBody: 'Wir bieten individuelle Unterstützung für Investitionsanfragen, Projektstruktur und Finanzdokumentation.',
    office: 'Asuncion, Paraguay',
    email: 'Geschützte E-Mail (Kontaktformular verwenden)',
  },
} as const;

const documents = [
  {
    category: 'Performance Reports',
    icon: BarChart3,
    items: [
      { title: 'Corporate Summary 2025', date: 'September 2025', size: '2.8 MB' },
      { title: 'Active Project Progress', date: 'September 2025', size: '1.9 MB' },
      { title: 'Historical Sold Projects', date: 'August 2025', size: '1.4 MB' },
    ],
  },
  {
    category: 'Presentations',
    icon: FileText,
    items: [
      { title: 'Investor Deck — Park Lofts Tower', date: 'September 2025', size: '6.1 MB' },
      { title: 'Short-Stay Investment Model', date: 'July 2025', size: '4.3 MB' },
      { title: 'Consolidated Portfolio', date: 'June 2025', size: '5.2 MB' },
    ],
  },
  {
    category: 'Compliance & Legal',
    icon: Scale,
    items: [
      { title: 'Corporate Records and Registration', date: 'Updated', size: '1.1 MB' },
      { title: 'Corporate Governance Policies', date: 'Updated', size: '0.9 MB' },
      { title: 'Relevant Regulatory Information', date: 'Updated', size: '1.3 MB' },
    ],
  },
];

const keyMetricsByLocale = {
  es: [
    { value: '5', label: 'Proyectos en portafolio', detail: 'Activos activos y consolidados' },
    { value: '350', label: 'Unidades en construcción', detail: 'Ejecución actual' },
    { value: '250', label: 'Unidades vendidas', detail: 'Track record comercial' },
    { value: 'USD 18.5M', label: 'Volumen gestionado', detail: 'Cifra corporativa reportada' },
  ],
  en: [
    { value: '5', label: 'Projects in portfolio', detail: 'Active and consolidated assets' },
    { value: '350', label: 'Units under construction', detail: 'Current execution' },
    { value: '250', label: 'Units sold', detail: 'Commercial track record' },
    { value: 'USD 18.5M', label: 'Managed volume', detail: 'Reported corporate figure' },
  ],
  de: [
    { value: '5', label: 'Projekte im Portfolio', detail: 'Aktive und konsolidierte Assets' },
    { value: '350', label: 'Einheiten im Bau', detail: 'Aktuelle Umsetzung' },
    { value: '250', label: 'Verkaufte Einheiten', detail: 'Kommerzieller Track Record' },
    { value: 'USD 18.5M', label: 'Verwaltetes Volumen', detail: 'Gemeldete Unternehmenszahl' },
  ],
};

export default function InvestorRelationsPage({ params }: { params: { locale: string } }) {
  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  const copy = copyByLocale[locale];
  const keyMetrics = keyMetricsByLocale[locale];

  return (
    <>
      <section className="pt-36 pb-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent" /></div>
        <Container className="relative z-10">
          <FadeIn><Eyebrow light withLine className="mb-8">Investor Relations</Eyebrow></FadeIn>
          <TextReveal text={copy.hero} as="h1" className="font-display text-hero font-light text-white mb-8" delay={0.1} />
          <FadeIn delay={0.35}><p className="font-body text-base text-white/60 max-w-xl leading-relaxed">{copy.body}</p></FadeIn>
        </Container>
      </section>

      <section className="section-py bg-cream">
        <Container>
          <FadeIn><Eyebrow withLine className="mb-6">{copy.corporate}</Eyebrow></FadeIn>
          <TextReveal text={copy.metrics} as="h2" className="font-display text-display font-light text-charcoal mb-16" delay={0.1} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyMetrics.map((metric, i) => (
              <FadeIn key={metric.label} delay={i * 0.1}>
                <div className="p-8 bg-white border border-stone hover:border-gold transition-colors duration-400">
                  <span className="font-display text-4xl md:text-5xl font-light text-charcoal block mb-2">{metric.value}</span>
                  <span className="font-body text-sm font-medium text-charcoal block mb-1">{metric.label}</span>
                  <span className="font-body text-xs text-slate">{metric.detail}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-py bg-charcoal text-white">
        <Container>
          <FadeIn><Eyebrow light withLine className="mb-6">{copy.recognition}</Eyebrow></FadeIn>
          <TextReveal text={copy.recognitionTitle} as="h2" className="font-display text-display font-light text-white mb-12" delay={0.1} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0.2}>
              <div>
                <div className="relative overflow-hidden mb-4 bg-white">
                  <Image
                    src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/worlds-best-performing-dest-2025.jpg"
                    alt="World's best-performing destinations Q1 2025 — Paraguay #1"
                    width={900}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="font-body text-xs text-white/50 leading-relaxed">{copy.stat1Caption}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div>
                <div className="relative overflow-hidden mb-4 bg-[#1a1a2e]">
                  <Image
                    src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/Paraguay-fastest-remote-hub.webp"
                    alt="Fastest growing remote work hubs 2025 — Asuncion #1"
                    width={900}
                    height={1200}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="font-body text-xs text-white/50 leading-relaxed">{copy.stat2Caption}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="section-py bg-cream-200">
        <Container narrow>
          <FadeIn>
            <div className="text-center">
              <Eyebrow className="justify-center mb-8">{copy.principle}</Eyebrow>
              <p className="font-display text-2xl md:text-3xl font-light text-charcoal leading-relaxed italic mb-8">&ldquo;{copy.quote}&rdquo;</p>
              <span className="font-body text-sm text-slate">Park Lofts Paraguay</span>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="section-py bg-cream">
        <Container>
          <FadeIn><Eyebrow withLine className="mb-6">{copy.channels}</Eyebrow></FadeIn>
          <TextReveal text={copy.channelsTitle} as="h2" className="font-display text-display font-light text-charcoal mb-12" delay={0.1} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FadeIn delay={0.2}>
              <div className="border border-stone bg-white p-6 h-full">
                <span className="eyebrow text-slate block mb-4">
                  {locale === 'de' ? 'Buchungsplattformen' : locale === 'es' ? 'Plataformas de reserva' : 'Booking platforms'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[partnerAssets.booking, partnerAssets.airbnb].map((logo) => (
                    <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="h-20 bg-white border border-stone/70 px-4 flex items-center justify-center hover:border-gold transition-colors duration-300">
                      <Image src={logo.src} alt={logo.name} width={180} height={56} className="w-auto max-h-12 object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="border border-stone bg-white p-6 h-full">
                <span className="eyebrow text-slate block mb-4">
                  {locale === 'de' ? 'Maklernetzwerk' : locale === 'es' ? 'Red de brokers' : 'Broker network'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[partnerAssets.century21, partnerAssets.concremaq, partnerAssets.bbcf, partnerAssets.itau].map((logo) => (
                    <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="h-20 bg-white border border-stone/70 px-4 flex items-center justify-center hover:border-gold transition-colors duration-300">
                      <Image src={logo.src} alt={logo.name} width={150} height={48} className="w-auto max-h-10 object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="border border-stone bg-cream p-6 h-full flex items-center gap-4">
                <Image src={partnerAssets.ahkBadge.src} alt={partnerAssets.ahkBadge.name} width={108} height={108} className="w-20 h-20 object-contain shrink-0" />
                <p className="font-body text-sm text-slate leading-relaxed">
                  {locale === 'de'
                    ? 'AHK-Mercosur-Mitgliedschaft 2025 als institutioneller Vertrauensnachweis.'
                    : locale === 'es'
                      ? 'Membresía AHK Mercosur 2025 como respaldo institucional.'
                      : 'AHK Mercosur membership 2025 as institutional backing.'}
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="section-py" id="documents">
        <Container>
          <FadeIn><Eyebrow withLine className="mb-6">{copy.docs}</Eyebrow></FadeIn>
          <TextReveal text={copy.docsTitle} as="h2" className="font-display text-display font-light text-charcoal mb-16" delay={0.1} />

          <div className="space-y-12">
            {documents.map((section, sectionIdx) => {
              const Icon = section.icon;
              return (
                <FadeIn key={section.category} delay={sectionIdx * 0.1}>
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone"><Icon className="h-4 w-4 text-gold" /><h3 className="font-body text-xs font-medium uppercase tracking-widest text-charcoal">{section.category}</h3></div>
                    <div className="space-y-3">
                      {section.items.map((doc) => (
                        <div key={doc.title} className="group flex items-center justify-between p-5 bg-cream hover:bg-cream-200 border border-stone hover:border-gold transition-all duration-300 cursor-pointer">
                          <div>
                            <span className="font-body text-sm font-medium text-charcoal block mb-1 group-hover:text-gold transition-colors duration-300">{doc.title}</span>
                            <span className="font-body text-xs text-slate">{doc.date} · {doc.size}</span>
                          </div>
                          <Download className="h-4 w-4 text-slate group-hover:text-gold transition-colors duration-300 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-py bg-charcoal text-white" id="contact">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn><Eyebrow light withLine className="mb-8">{copy.contact}</Eyebrow></FadeIn>
              <TextReveal text={copy.contactTitle} as="h2" className="font-display text-display font-light text-white mb-8" delay={0.1} />
              <FadeIn delay={0.3}><p className="font-body text-base text-white/60 leading-relaxed">{copy.contactBody}</p></FadeIn>
            </div>

            <FadeIn delay={0.2} direction="left">
              <div className="space-y-6">
                {[
                  { label: 'Email', value: copy.email },
                  { label: locale === 'de' ? 'Telefon' : locale === 'es' ? 'Teléfono' : 'Phone', value: '+595 981 587 588', href: 'tel:+595981587588' },
                  { label: locale === 'de' ? 'Öffnungszeiten' : locale === 'es' ? 'Horario' : 'Hours', value: locale === 'es' ? 'Lunes a Viernes, 9:00–18:00' : locale === 'de' ? 'Montag bis Freitag, 9:00–18:00' : 'Monday to Friday, 9:00–18:00' },
                  { label: locale === 'de' ? 'Büro' : locale === 'es' ? 'Oficina' : 'Office', value: copy.office },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex items-start gap-6 p-6 border border-charcoal-600">
                    <span className="eyebrow text-gold shrink-0 mt-0.5">{label}</span>
                    {href ? <a href={href} className="font-body text-sm text-white hover:text-gold transition-colors duration-300">{value}</a> : <span className="font-body text-sm text-white/70">{value}</span>}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
