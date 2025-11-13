
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
  formspreeEndpoint: string;
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
  gallery: BackgroundSettings; // Added for new section
}

export interface Logo {
  type: 'text' | 'image';
  text: string;
  imageUrl: string;
}

export interface ThemeColors {
    primary: string;
    light: string;
}

export type SectionType = 'home' | 'services' | 'testimonials' | 'booking' | 'gallery' | 'custom';

export interface SectionConfig {
  id: string; // Used for element ID and key
  type: SectionType;
  label: string; // Navigation label
  enabled: boolean;
  showTitle: boolean; // Controls visibility of the section's main header
  customSectionId?: string; // Link to a specific custom section if type is 'custom'
}

export interface MediaItem {
  id: string;
  type: 'image' | 'youtube';
  src: string; // Image URL or YouTube video URL
  title: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string; // Can contain simple HTML
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
  themeColors: ThemeColors;
  musicPlayerSectionId: string; // ID of the section to display the player in, or 'hidden'
  sectionOrder: SectionConfig[];
  gallery: MediaItem[];
  customSections: CustomSection[];
}