'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  locale: string;
  index?: number;
  className?: string;
  t: {
    statusSelling: string;
    statusConstruction: string;
    statusDelivered: string;
    viewProject: string;
  };
}

const statusConfig = {
  selling: { label: 'statusSelling', dot: 'bg-gold' },
  construction: { label: 'statusConstruction', dot: 'bg-amber-500' },
  delivered: { label: 'statusDelivered', dot: 'bg-emerald-500' },
  upcoming: { label: 'statusSelling', dot: 'bg-slate-400' },
};

export default function ProjectCard({ project, locale, index = 0, className, t }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const statusLabel = t[status.label as keyof typeof t] || project.status;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn('card-project group', className)}
    >
      <Link href={`/${locale}/projects/${project.slug}`} className="block">
        {/* Image */}
        <div className="img-zoom-wrapper relative aspect-[4/3] overflow-hidden bg-stone">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Arrow CTA */}
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-charcoal" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status */}
          <div className="mb-3 flex items-center gap-2">
            <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
            <span className="eyebrow text-slate">{statusLabel}</span>
          </div>

          {/* Name */}
          <h3 className="font-display text-xl font-light text-charcoal group-hover:text-charcoal-800 transition-colors duration-300 mb-1">
            {project.name}
          </h3>

          {/* Location */}
          <p className="font-body text-sm text-slate mb-4">{project.location}</p>

          {/* Divider */}
          <div className="divider mb-4" />

          {/* Specs */}
          <div className="flex items-center justify-between text-xs font-body text-slate">
            <span>{project.units} unidades</span>
            <span>
              {project.minArea}–{project.maxArea} m²
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
