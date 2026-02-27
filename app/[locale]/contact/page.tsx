'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { partnerAssets } from '@/lib/partners';

type Locale = 'es' | 'en' | 'de';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.enum(['residential', 'investment', 'commercial', 'general']),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const copyByLocale = {
  es: {
    eyebrow: 'Contacto',
    headline: 'Conversemos sobre\nsu próxima inversión',
    body: 'Nuestro equipo comercial y de inversión le ayuda a evaluar proyectos según su perfil, horizonte y objetivo de rentabilidad.',
    office: 'Oficina Central',
    phone: 'Teléfono',
    email: 'Email',
    hours: 'Horario',
    successTitle: 'Mensaje enviado',
    successBody: 'Gracias por su consulta. Nuestro equipo le contactará dentro de las próximas 24 horas hábiles.',
    fields: {
      name: 'Nombre completo *',
      email: 'Email *',
      phone: 'Teléfono',
      interest: 'Interés',
      message: 'Mensaje *',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
    },
    options: {
      investment: 'Inversión en renta corta',
      residential: 'Compra residencial',
      commercial: 'Uso comercial',
      general: 'Consulta general',
    },
    placeholders: {
      name: 'Su nombre y apellido',
      email: 'email@ejemplo.com',
      phone: '+595 981 587 588',
      message: 'Compártanos su objetivo y rango de inversión.',
    },
    privacy: 'Sus datos serán tratados de forma confidencial y utilizados únicamente para dar respuesta a su consulta.',
    city: 'Asunción, Paraguay',
    trustTitle: 'Canales de confianza',
    trustBody: 'Presencia comercial en plataformas de reserva, red inmobiliaria y respaldo institucional vigente.',
  },
  en: {
    eyebrow: 'Contact',
    headline: 'Let’s discuss\nyour next investment',
    body: 'Our commercial and investment team helps you evaluate projects according to your profile, timeline, and return objective.',
    office: 'Main Office',
    phone: 'Phone',
    email: 'Email',
    hours: 'Business hours',
    successTitle: 'Message sent',
    successBody: 'Thank you for your message. Our team will contact you within the next 24 business hours.',
    fields: {
      name: 'Full name *',
      email: 'Email *',
      phone: 'Phone',
      interest: 'Interest',
      message: 'Message *',
      send: 'Send message',
      sending: 'Sending...',
    },
    options: {
      investment: 'Short-stay investment',
      residential: 'Residential purchase',
      commercial: 'Commercial use',
      general: 'General inquiry',
    },
    placeholders: {
      name: 'Your full name',
      email: 'email@example.com',
      phone: '+595 981 587 588',
      message: 'Share your objective and target investment range.',
    },
    privacy: 'Your data is treated as confidential and used only to respond to your inquiry.',
    city: 'Asuncion, Paraguay',
    trustTitle: 'Trust channels',
    trustBody: 'Commercial presence across booking platforms, broker network and active institutional backing.',
  },
  de: {
    eyebrow: 'Kontakt',
    headline: 'Sprechen wir über\nIhr nächstes Investment',
    body: 'Unser Team unterstützt Sie bei der Bewertung von Projekten nach Profil, Zeithorizont und Renditeziel.',
    office: 'Hauptbüro',
    phone: 'Telefon',
    email: 'E-Mail',
    hours: 'Öffnungszeiten',
    successTitle: 'Nachricht gesendet',
    successBody: 'Vielen Dank. Unser Team meldet sich innerhalb der nächsten 24 Arbeitsstunden.',
    fields: {
      name: 'Vollständiger Name *',
      email: 'E-Mail *',
      phone: 'Telefon',
      interest: 'Interesse',
      message: 'Nachricht *',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
    },
    options: {
      investment: 'Kurzzeitmiet-Investment',
      residential: 'Wohnkauf',
      commercial: 'Gewerbliche Nutzung',
      general: 'Allgemeine Anfrage',
    },
    placeholders: {
      name: 'Ihr Name',
      email: 'email@beispiel.de',
      phone: '+595 981 587 588',
      message: 'Teilen Sie uns Ihr Ziel und Ihr Investitionsvolumen mit.',
    },
    privacy: 'Ihre Daten werden vertraulich behandelt und ausschließlich zur Beantwortung Ihrer Anfrage verwendet.',
    city: 'Asuncion, Paraguay',
    trustTitle: 'Vertrauenskanäle',
    trustBody: 'Kommerzielle Präsenz über Buchungsplattformen, Maklernetzwerk und aktive institutionelle Unterstützung.',
  },
} as const;

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  const copy = copyByLocale[locale];

  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: 'investment' },
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
  };

  const contactInfo = [
    { Icon: MapPin, label: copy.office, value: copy.city },
    { Icon: Phone, label: copy.phone, value: '+595 981 587 588', href: 'tel:+595981587588' },
    { Icon: Mail, label: copy.email, value: locale === 'es' ? 'Correo protegido (usar formulario de contacto)' : locale === 'de' ? 'Geschützte E-Mail (Kontaktformular verwenden)' : 'Protected email (use contact form)' },
    { Icon: Clock, label: copy.hours, value: locale === 'es' ? 'Lunes a Viernes\n9:00 – 18:00' : locale === 'de' ? 'Montag bis Freitag\n9:00 – 18:00' : 'Monday to Friday\n9:00 – 18:00' },
  ];

  return (
    <>
      <section className="pt-36 pb-24 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <FadeIn><Eyebrow withLine className="mb-8">{copy.eyebrow}</Eyebrow></FadeIn>
              <TextReveal text={copy.headline} as="h1" className="font-display text-hero font-light text-charcoal mb-8" delay={0.1} />
              <FadeIn delay={0.3}><p className="font-body text-base text-slate leading-relaxed mb-12">{copy.body}</p></FadeIn>

              <div className="space-y-8">
                {contactInfo.map(({ Icon, label, value, href }, i) => (
                  <FadeIn key={label} delay={0.35 + i * 0.08}>
                    <div className="flex items-start gap-5">
                      <div className="h-10 w-10 border border-stone flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-gold" /></div>
                      <div>
                        <span className="eyebrow text-slate block mb-1">{label}</span>
                        {href ? <a href={href} className="font-body text-sm text-charcoal hover:text-gold transition-colors duration-300 whitespace-pre-line">{value}</a> : <span className="font-body text-sm text-charcoal whitespace-pre-line">{value}</span>}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.75}>
                <div className="mt-12 border border-stone bg-white p-6">
                  <span className="eyebrow text-slate block mb-2">{copy.trustTitle}</span>
                  <p className="font-body text-sm text-slate leading-relaxed mb-5">{copy.trustBody}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[partnerAssets.booking, partnerAssets.airbnb, partnerAssets.ahkBadge].map((logo) => (
                      <div key={logo.name} className="h-14 bg-cream border border-stone/70 px-3 flex items-center justify-center">
                        <Image src={logo.src} alt={logo.name} width={110} height={36} className="w-auto max-h-8 object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} direction="left">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center justify-center min-h-[500px] bg-white border border-stone p-12 text-center">
                  <div className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center mb-8"><span className="text-gold text-2xl">✓</span></div>
                  <h3 className="font-display text-3xl font-light text-charcoal mb-4">{copy.successTitle}</h3>
                  <p className="font-body text-sm text-slate leading-relaxed">{copy.successBody}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-stone p-8 md:p-12 space-y-6" noValidate>
                  <div>
                    <label className="eyebrow text-charcoal-500 block mb-2">{copy.fields.name}</label>
                    <input {...register('name')} className="w-full border border-stone bg-cream px-4 py-3.5 font-body text-sm text-charcoal placeholder-slate/50 focus:border-gold focus:outline-none transition-colors duration-200" placeholder={copy.placeholders.name} />
                    {errors.name && <p className="mt-1.5 font-body text-xs text-red-500">Required</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="eyebrow text-charcoal-500 block mb-2">{copy.fields.email}</label>
                      <input {...register('email')} type="email" className="w-full border border-stone bg-cream px-4 py-3.5 font-body text-sm text-charcoal placeholder-slate/50 focus:border-gold focus:outline-none transition-colors duration-200" placeholder={copy.placeholders.email} />
                      {errors.email && <p className="mt-1.5 font-body text-xs text-red-500">Invalid email</p>}
                    </div>
                    <div>
                      <label className="eyebrow text-charcoal-500 block mb-2">{copy.fields.phone}</label>
                      <input {...register('phone')} type="tel" className="w-full border border-stone bg-cream px-4 py-3.5 font-body text-sm text-charcoal placeholder-slate/50 focus:border-gold focus:outline-none transition-colors duration-200" placeholder={copy.placeholders.phone} />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow text-charcoal-500 block mb-2">{copy.fields.interest}</label>
                    <select {...register('interest')} className="w-full border border-stone bg-cream px-4 py-3.5 font-body text-sm text-charcoal focus:border-gold focus:outline-none transition-colors duration-200 appearance-none cursor-pointer">
                      <option value="investment">{copy.options.investment}</option>
                      <option value="residential">{copy.options.residential}</option>
                      <option value="commercial">{copy.options.commercial}</option>
                      <option value="general">{copy.options.general}</option>
                    </select>
                  </div>

                  <div>
                    <label className="eyebrow text-charcoal-500 block mb-2">{copy.fields.message}</label>
                    <textarea {...register('message')} rows={5} className="w-full border border-stone bg-cream px-4 py-3.5 font-body text-sm text-charcoal placeholder-slate/50 focus:border-gold focus:outline-none transition-colors duration-200 resize-none" placeholder={copy.placeholders.message} />
                    {errors.message && <p className="mt-1.5 font-body text-xs text-red-500">Minimum 10 characters</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center disabled:opacity-70">
                    {isSubmitting ? copy.fields.sending : copy.fields.send}
                  </button>

                  <p className="font-body text-xs text-slate text-center">{copy.privacy}</p>
                </form>
              )}
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="h-[400px] bg-stone-light relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="font-body text-xs text-slate uppercase tracking-widest block mb-2">{copy.city}</span>
            <span className="font-body text-xs text-slate">{copy.city}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
      </section>
    </>
  );
}
