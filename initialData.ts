import { AppContent } from './types';

export const initialData: AppContent = {
  logo: {
    type: 'text',
    text: 'Dj RobHan',
    imageUrl: '',
  },
  tagline: "Tenner Atmosfæren, Ett Beat om Gangen.",
  socialLinks: [
    { id: 'social-1', name: 'Instagram', url: 'https://www.instagram.com/robhan80', icon: '<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.305-1.455.717-2.126 1.387C1.333 2.705.92 3.377.63 4.14.333 4.905.132 5.775.072 7.053.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.26 2.148.558 2.913.308.785.718 1.457 1.387 2.126.67.67 1.342 1.08 2.126 1.387.766.298 1.636.498 2.913.558C8.333 23.985 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.26 2.913-.558.785-.308 1.457-.718 2.126-1.387.67-.67 1.08-1.342 1.387-2.126.298-.766.498-1.636.558-2.913.06-1.277.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.26-2.148-.558-2.913-.308-.785-.718-1.457-1.387-2.126C21.295 1.333 20.623.92 19.86.63c-.766-.298-1.636-.498-2.913-.558C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.382.42-.419.819.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 3.09c-3.418 0-6.18 2.762-6.18 6.18s2.762 6.18 6.18 6.18 6.18-2.762 6.18-6.18-2.762-6.18-6.18-6.18zm0 10.33c-2.295 0-4.15-1.855-4.15-4.15s1.855-4.15 4.15-4.15 4.15 1.855 4.15 4.15-1.855 4.15-4.15 4.15zm6.405-11.845c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36 1.36.61 1.36 1.36-.61 1.36-1.36 1.36z"/></svg>' },
    { id: 'social-2', name: 'TikTok', url: '#', icon: '<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.98-1.6-2.03-2.1-4.58-1.9-7.18.21-2.73 1.55-5.2 3.6-6.71 2.1-1.55 4.8-2.2 7.3-1.99.62.07 1.23.18 1.84.33V0H12.52z"></path></svg>' },
    { id: 'social-3', name: 'YouTube', url: '#', icon: '<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
  ],
  playlist: [
    { id: 'track-1', title: "Cyberdream", artist: "Synthwave Rider", sourceType: 'mp3', src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 'track-2', title: "lofi hip hop radio", artist: "Lofi Girl", sourceType: 'youtube', src: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
    { id: 'track-3', title: "Blinding Lights", artist: "The Weeknd", sourceType: 'spotify', src: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" },
    { id: 'track-4', title: "Retro Future", artist: "Mega Drive", sourceType: 'mp3', src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  ],
  services: [
    {
      id: 'service-1',
      icon: "M21 15.65c0-1.45-.48-2.8-1.32-3.95l-2.83-3.82c-.68-1.02-1.7-1.38-2.85-1.38H12M2.99 9.8h7.02c1.1 0 2.11.26 3.01.74",
      title: "Klubbkvelder",
      description: "Høyenergi-sett som holder dansegulvet fullt. Spesialiserer seg på House, Techno og EDM."
    },
    {
      id: 'service-2',
      icon: "M12 5.59c-2.31 0-4.43.8-6.14 2.16l-1.86 1.5M12 5.59c2.31 0 4.43.8 6.14 2.16l1.86 1.5",
      title: "Bryllup",
      description: "Skaper det perfekte lydsporet for din spesielle dag, fra seremonimusikk til den siste dansen."
    },
    {
      id: 'service-3',
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
      title: "Firmaarrangementer",
      description: "Profesjonell og sofistikert musikkuratering for gallaer, produktlanseringer og firmafester."
    },
    {
      id: 'service-4',
      icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
      title: "Privatfester",
      description: "Tilpassede spillelister for bursdager, jubileer og eksklusive sammenkomster. Din fest, din stemning."
    }
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      quote: "DJ Spark gjorde bryllupsnatten vår helt fantastisk! Energien var utrolig fra start til slutt. Vi kunne ikke bedt om en bedre DJ.",
      name: "Jessica & Tom",
      event: "Bryllupsfest"
    },
    {
      id: 'testimonial-2',
      quote: "Musikken til vår firma-lansering var perfekt. DJ Spark forstod stemningen fullstendig og skapte en sofistikert og livlig atmosfære.",
      name: "Sarah L., Arrangementsansvarlig",
      event: "Firma-lansering"
    },
    {
      id: 'testimonial-3',
      quote: "Beste bursdagsfest noensinne! Dansegulvet var aldri tomt. Så mange gjester ba om DJ-ens kontaktinfo. Anbefales på det sterkeste!",
      name: "Mike R.",
      event: "40-årsbursdag"
    }
  ],
  contactInfo: {
    email: "dj@robhan.net",
    phone: "99111194"
  },
  backgrounds: {
    home: { type: 'image', value: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop" },
    services: { type: 'color', value: "#0D0D0D" },
    testimonials: { type: 'color', value: "#1A1A1A" },
    booking: { type: 'color', value: "#0D0D0D" },
  }
};