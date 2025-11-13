
import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { MediaItem, SectionConfig } from '../types';
import { MusicPlayer } from '../components/MusicPlayer';

interface PageProps {
  sectionConfig: SectionConfig;
  showMusicPlayer: boolean;
}

const PlayIcon = () => (
    <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
);


function getYoutubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const Lightbox: React.FC<{ item: MediaItem, onClose: () => void }> = ({ item, onClose }) => {
    
    const getYoutubeEmbedUrl = (src: string) => {
        const videoId = getYoutubeVideoId(src);
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-fade-in"
            onClick={onClose}
        >
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-[120]"
                aria-label="Lukk"
            >
                <CloseIcon />
            </button>
            <div 
                className="relative w-full max-w-4xl max-h-[90vh] p-4"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking on content
            >
                {item.type === 'image' && (
                    <img src={item.src} alt={item.title || 'Galleri bilde'} className="max-w-full max-h-[90vh] object-contain mx-auto" />
                )}
                {item.type === 'youtube' && getYoutubeEmbedUrl(item.src) && (
                    <div className="aspect-video w-full">
                        <iframe
                            src={getYoutubeEmbedUrl(item.src)!}
                            title={item.title || "YouTube video player"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export const GalleryPage: React.FC<PageProps> = ({ sectionConfig, showMusicPlayer }) => {
    const { content } = useContent();
    const { gallery, backgrounds } = content;
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const bg = backgrounds.gallery;
    const bgStyle: React.CSSProperties =
        bg.type === 'image'
            ? { backgroundImage: `url('${bg.value}')` }
            : { backgroundColor: bg.value };

    if (!gallery || gallery.length === 0) {
        if (!sectionConfig.showTitle && !showMusicPlayer) return null;
    }

    return (
        <section id="gallery" className="py-20 relative bg-cover bg-center" style={bgStyle}>
            {bg.type === 'image' && <div className="absolute inset-0 bg-black/70 z-0"></div>}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {sectionConfig.showTitle && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white">Galleri</h2>
                        <p className="text-lg text-gray-400 mt-2">Øyeblikk fra arrangementene.</p>
                    </div>
                )}
                {showMusicPlayer && (
                    <div className="mb-12">
                        <MusicPlayer />
                    </div>
                )}
                {gallery && gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gallery.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg"
                                onClick={() => setSelectedItem(item)}
                            >
                                <img
                                    src={item.type === 'image' ? item.src : `https://img.youtube.com/vi/${getYoutubeVideoId(item.src)}/hqdefault.jpg`}
                                    alt={item.title || 'Galleri element'}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.type === 'youtube' && <PlayIcon />}
                                    {item.type === 'image' && (
                                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    sectionConfig.enabled && <p className="text-center text-gray-500">Galleriet er tomt. Legg til bilder og videoer i admin-panelet.</p>
                )}
            </div>
            {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </section>
    );
};
