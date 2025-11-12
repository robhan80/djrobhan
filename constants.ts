

import { Track, Service, Testimonial } from './types';

export const DJ_NAME = "DJ Spark";
export const TAGLINE = "Igniting the Atmosphere, One Beat at a Time.";

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: '#', icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M... (path data for Instagram icon)"></path></svg>' },
  { name: 'SoundCloud', url: '#', icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M... (path data for SoundCloud icon)"></path></svg>' },
  { name: 'Facebook', url: '#', icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M... (path data for Facebook icon)"></path></svg>' },
];

export const PLAYLIST: Track[] = [
  // FIX: Added missing 'id' property.
  // FIX: Added missing 'sourceType' property.
  { id: 'track-1', title: "Cyberdream", artist: "Synthwave Rider", sourceType: 'mp3', src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  // FIX: Added missing 'id' property.
  // FIX: Added missing 'sourceType' property.
  { id: 'track-2', title: "Neon Nights", artist: "Grid Runner", sourceType: 'mp3', src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  // FIX: Added missing 'id' property.
  // FIX: Added missing 'sourceType' property.
  { id: 'track-3', title: "Starlight Echo", artist: "Cosmic Voyager", sourceType: 'mp3', src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  // FIX: Added missing 'id' property.
  // FIX: Added missing 'sourceType' property.
  { id: 'track-4', title: "Retro Future", artist: "Mega Drive", sourceType: 'mp3', src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

export const SERVICES: Service[] = [
  // FIX: Added missing 'id' property.
  {
    id: 'service-1',
    icon: "M21 15.65c0-1.45-.48-2.8-1.32-3.95l-2.83-3.82c-.68-1.02-1.7-1.38-2.85-1.38H12M2.99 9.8h7.02c1.1 0 2.11.26 3.01.74",
    title: "Club Nights",
    description: "High-energy sets that keep the dance floor packed. Specializing in House, Techno, and EDM."
  },
  // FIX: Added missing 'id' property.
  {
    id: 'service-2',
    icon: "M12 5.59c-2.31 0-4.43.8-6.14 2.16l-1.86 1.5M12 5.59c2.31 0 4.43.8 6.14 2.16l1.86 1.5",
    title: "Weddings",
    description: "Crafting the perfect soundtrack for your special day, from ceremony music to the final dance."
  },
  // FIX: Added missing 'id' property.
  {
    id: 'service-3',
    icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    title: "Corporate Events",
    description: "Professional and sophisticated music curation for galas, product launches, and company parties."
  },
  // FIX: Added missing 'id' property.
  {
    id: 'service-4',
    icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    title: "Private Parties",
    description: "Custom playlists for birthdays, anniversaries, and exclusive gatherings. Your party, your vibe."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  // FIX: Added missing 'id' property.
  {
    id: 'testimonial-1',
    quote: "DJ Spark absolutely made our wedding night! The energy was incredible from start to finish. We couldn't have asked for a better DJ.",
    name: "Jessica & Tom",
    event: "Wedding Reception"
  },
  // FIX: Added missing 'id' property.
  {
    id: 'testimonial-2',
    quote: "The music for our corporate launch was perfect. DJ Spark understood the vibe completely and created a sophisticated and upbeat atmosphere.",
    name: "Sarah L., Event Manager",
    event: "Corporate Launch"
  },
  // FIX: Added missing 'id' property.
  {
    id: 'testimonial-3',
    quote: "Best birthday party ever! The dance floor was never empty. So many guests asked for the DJ's contact info. Highly recommended!",
    name: "Mike R.",
    event: "40th Birthday Party"
  }
];

export const CONTACT_INFO = {
  email: "bookings@djspark.com",
  phone: "(555) 123-4567"
};