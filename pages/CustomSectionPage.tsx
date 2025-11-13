
import React from 'react';
import { CustomSection, SectionConfig } from '../types';
import { useContent } from '../hooks/useContent';
import { MusicPlayer } from '../components/MusicPlayer';

interface CustomSectionPageProps {
  sectionConfig: SectionConfig;
  customSectionData: CustomSection;
  showMusicPlayer: boolean;
}

export const CustomSectionPage: React.FC<CustomSectionPageProps> = ({ sectionConfig, customSectionData, showMusicPlayer }) => {
  const { content } = useContent();

  // A future improvement could be to allow custom backgrounds per section in the admin UI.
  // For now, let's attempt to find a background config by ID if it exists, otherwise default.
  const bg = (content.backgrounds as any)[customSectionData.id] || { type: 'color', value: '#0D0D0D' };
  
  const bgStyle: React.CSSProperties = 
    bg.type === 'image' 
    ? { backgroundImage: `url('${bg.value}')` }
    : { backgroundColor: bg.value };
  
  return (
    <section id={`custom-${customSectionData.id}`} className="py-20 relative" style={bgStyle}>
       {bg.type === 'image' && <div className="absolute inset-0 bg-black/70 z-0"></div>}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {sectionConfig.showTitle && (
            <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white">{customSectionData.title}</h2>
            </div>
        )}
        {showMusicPlayer && (
            <div className="mb-12">
                <MusicPlayer />
            </div>
        )}
        <div 
          className="max-w-4xl mx-auto text-gray-300"
          dangerouslySetInnerHTML={{ __html: customSectionData.content }}
        />
      </div>
    </section>
  );
};