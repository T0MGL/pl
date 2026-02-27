export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  neighborhood: string;
  city: string;
  status: 'selling' | 'pre-construction' | 'construction' | 'delivered' | 'upcoming';
  type: 'residential' | 'commercial' | 'mixed';
  units: number;
  minArea: number;
  maxArea: number;
  minPrice: number;
  maxPrice: number;
  deliveryDate: string;
  coverImage: string;
  heroImage: string;
  gallery: string[];
  masterplan?: string;
  amenities: string[];
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  completionPercentage?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'news' | 'projects' | 'company' | 'market';
  author: string;
  publishedAt: string;
  image: string;
  readingTime: number;
  featured: boolean;
}

export interface InvestorDocument {
  id: string;
  title: string;
  category: 'annual' | 'presentations' | 'legal' | 'financial';
  date: string;
  fileSize: string;
  downloadUrl: string;
}

export type Locale = 'es' | 'en' | 'de';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}
