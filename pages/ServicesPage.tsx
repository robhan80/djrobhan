
import React from 'react';
import { Service, SectionConfig } from '../types';
import { useContent } from '../hooks/useContent';
import { MusicPlayer } from '../components/MusicPlayer';

interface PageProps {
  sectionConfig: SectionConfig;
  showMusicPlayer: boolean;
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-dark-2 p-6 rounded-lg border border-dark-3 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
    <div className="text-[var(--color-primary)] mb-4">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
      </svg>
    </div>
    <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
    <p className="text-gray-400">{service.description}</p>
  </div>
);

export const ServicesPage: React.FC<PageProps> = ({ sectionConfig, showMusicPlayer }) => {
  const { content } = useContent();
  const bg = content.backgrounds.services;
  
  const bgStyle: React.CSSProperties = 
    bg.type === 'image' 
    ? { backgroundImage: `url('${bg.value}')` }
    : { backgroundColor: bg.value };

  return (
    <section id="services" className="py-20 relative bg-cover bg-center" style={bgStyle}>
       {bg.type === 'image' && <div className="absolute inset-0 bg-black/70 z-0"></div>}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sectionConfig.showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white">Hva Jeg Gjør</h2>
            <p className="text-lg text-gray-400 mt-2">Skaper den perfekte stemningen for enhver anledning.</p>
          </div>
        )}
        {showMusicPlayer && (
            <div className="mb-12">
                <MusicPlayer />
            </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
