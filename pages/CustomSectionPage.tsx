
import React from 'react';
import { CustomSection, AppContent } from '../types';
import { useContent } from '../hooks/useContent';

interface CustomSectionPageProps {
  section: CustomSection;
}

export const CustomSectionPage: React.FC<CustomSectionPageProps> = ({ section }) => {
  const { content } = useContent();

  // Find a background for this custom section. For now, let's use a generic dark color.
  // A future improvement could be to allow custom backgrounds per section in the admin UI.
  const bgStyle: React.CSSProperties = { backgroundColor: '#0D0D0D' };
  
  return (
    <section id={`custom-${section.id}`} className="py-20 relative" style={bgStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">{section.title}</h2>
        </div>
        <div 
          className="max-w-3xl mx-auto text-gray-300 prose prose-invert prose-lg"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    </section>
  );
};
