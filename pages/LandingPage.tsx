
import React from 'react';
import { useContent } from '../hooks/useContent';
import { MusicPlayer } from '../components/MusicPlayer';
import { SectionConfig } from '../types';

interface LandingPageProps {
  sectionConfig: SectionConfig;
  showMusicPlayer: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ sectionConfig, showMusicPlayer }) => {
  const { content } = useContent();
  const bg = content.backgrounds.home;
  
  const bgStyle: React.CSSProperties = 
    bg.type === 'image' 
    ? { backgroundImage: `url('${bg.value}')` }
    : { backgroundColor: bg.value };

  const handleScrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={bgStyle}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {sectionConfig.showTitle && (
          <>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              {content.logo.text}
            </h1>
            <p className="text-lg md:text-xl text-light-2 mb-8 max-w-2xl">{content.tagline}</p>
          </>
        )}
        
        {showMusicPlayer && (
          <div className="mb-8">
              <MusicPlayer />
          </div>
        )}
        
        <a href="#booking" onClick={handleScrollToBooking} className="px-8 py-4 bg-[var(--color-primary)] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-[var(--color-light)] transition-all duration-300 transform hover:scale-105">
          Gjør Ditt Arrangement Uforglemmelig
        </a>
      </div>
    </section>
  );
};