
export enum View {
  Main = 'MAIN',
  Admin = 'ADMIN',
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  sourceType: 'mp3' | 'youtube' | 'spotify';
  src: string;
}

export interface Service {
  id: string;
  icon: string; // SVG path data
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  event: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  bookingRecipientEmail: string;
}

export interface BackgroundSettings {
  type: 'image' | 'color';
  value: string; // URL for image, hex/rgba for color
}

export interface SectionBackgrounds {
  home: BackgroundSettings;
  services: BackgroundSettings;
  testimonials: BackgroundSettings;
  booking: BackgroundSettings;
}

export interface Logo {
  type: 'text' | 'image';
  text: string;
  imageUrl: string;
}

export interface AppContent {
  logo: Logo;
  tagline: string;
  socialLinks: SocialLink[];
  playlist: Track[];
  services: Service[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
  backgrounds: SectionBackgrounds;
  adminPassword: string;
}