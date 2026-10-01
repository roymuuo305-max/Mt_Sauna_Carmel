export interface BotanicalHerb {
  id: string;
  name: string;
  botanicalName: string;
  localName?: string;
  aroma: string;
  primaryBenefits: string[];
  description: string;
  origin: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'health' | 'preparation' | 'booking';
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: 'sauna' | 'massage' | 'combo' | 'package';
  tagline: string;
  description: string;
  included: string[];
  popular?: boolean;
  image: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  keyBenefits: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'steam' | 'massage' | 'lounge' | 'herbs' | 'water' | 'grounds';
  categoryLabel: string;
  imageUrl: string;
  caption: string;
}

export interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  service: string;
  serviceId?: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  special_requests?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at: string;
  total_price: number;
}

export type PageSection = 'home' | 'about' | 'benefits' | 'services' | 'gallery' | 'contact' | 'admin';

