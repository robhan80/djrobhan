import React, { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { AppContent, SectionBackgrounds, BackgroundSettings, View, Track, Logo, ThemeColors, SectionConfig, MediaItem, CustomSection } from '../types';

// Admin page styling
const inputClass = "w-full bg-dark-3 border border-gray-600 rounded-lg p-2 text-white focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";
const labelClass = "block text-sm font-medium text-gray-300 mb-1";
const sectionBoxClass = "bg-dark-2 p-6 rounded-lg border border-dark-3 space-y-4";
const buttonClass = "px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-light)] transition-colors";
const dangerButtonClass = "px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors";
const secondaryButtonClass = "px-3 py-1 bg-dark-3 text-sm text-light-2 font-semibold rounded-lg hover:bg-gray-600 transition-colors";

interface AdminPageProps {
  setView: (view: View) => void;
}

const templates = [
    {
        name: 'Tom Seksjon',
        description: 'Start med blanke ark for full kreativ frihet.',
        template: {
            title: 'Ny Seksjon',
            content: '<div class="prose prose-invert prose-lg max-w-none"><p>Start å skrive ditt innhold her...</p></div>'
        }
    },
    {
        name: 'Tekst med Bilde',
        description: 'Perfekt for en "Om Meg"-seksjon, med bilde til venstre og tekst til høyre.',
        template: {
            title: 'Om Meg',
            content: `<div class="md:flex md:items-center md:gap-8">
  <div class="md:w-1/3 mb-4 md:mb-0">
    <img src="https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=1770&auto=format&fit=crop" alt="DJ på konsert" class="rounded-lg shadow-lg w-full">
  </div>
  <div class="md:w-2/3">
    <h3 class="text-3xl font-bold mb-4 text-white">Min Historie</h3>
    <p class="text-gray-300">Her kan du skrive en engasjerende tekst om deg selv, din bakgrunn som DJ, og hva som driver din lidenskap for musikk. Fortell om dine spesialiteter og hva som gjør dine arrangementer unike.</p>
  </div>
</div>`
        }
    },
    {
        name: 'SoMe Embed',
        description: 'Vis din Instagram- eller TikTok-feed direkte på siden.',
        template: {
            title: 'Følg Meg På Sosiale Medier',
            content: `<div class="bg-dark-3 p-6 rounded-lg text-center">
  <p class="mb-4 text-gray-400">Her kan du lime inn "embed-koden" fra en Instagram- eller TikTok-post. Gå til posten du vil vise, klikk på de tre prikkene (...) og velg "Embed" eller "Bygg inn". Lim inn koden du får her.</p>
  
  <div class="flex justify-center">
    <!-- Lim inn embed-koden din under denne linjen -->
    <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C_If5XqN3If/" data-instgrm-version="14" style=" background:#000; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"></div></blockquote><script async src="//www.instagram.com/embed.js"></script>
  </div>
</div>`
        }
    },
    {
        name: 'Arrangementsliste',
        description: 'Annonser dine kommende spillejobber og arrangementer.',
        template: {
            title: 'Kommende Arrangementer',
            content: `<ul class="space-y-4">
  <li class="p-4 bg-dark-3 rounded-lg md:flex justify-between items-center space-y-2 md:space-y-0">
    <div>
      <p class="font-bold text-white text-xl">Event Navn 1</p>
      <p class="text-sm text-gray-400">Dato: 01.01.2025 | Sted: Venue Name</p>
    </div>
    <a href="#booking" class="inline-block px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded hover:bg-[var(--color-light)] transition-colors">Book Nå</a>
  </li>
  <li class="p-4 bg-dark-3 rounded-lg md:flex justify-between items-center space-y-2 md:space-y-0">
    <div>
      <p class="font-bold text-white text-xl">Event Navn 2</p>
      <p class="text-sm text-gray-400">Dato: 15.01.2025 | Sted: Another Club</p>
    </div>
    <a href="#" target="_blank" class="inline-block px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded hover:bg-[var(--color-light)] transition-colors">Kjøp Billetter</a>
  </li>
</ul>`
        }
    }
];

const TemplateModal: React.FC<{ isOpen: boolean; onClose: () => void; onSelect: (template: {title: string, content: string}) => void }> = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-dark-2 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-dark-3">
                <div className="p-6 flex justify-between items-center border-b border-dark-3 sticky top-0 bg-dark-2 z-10">
                    <h3 className="text-2xl font-bold text-white">Velg en Mal for Ny Seksjon</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map(t => (
                        <div key={t.name} className="bg-dark-3 p-6 rounded-lg border border-gray-700 hover:border-[var(--color-primary)] transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col" onClick={() => onSelect(t.template)}>
                            <h4 className="text-xl font-bold text-white mb-2">{t.name}</h4>
                            <p className="text-gray-400 flex-grow mb-4">{t.description}</p>
                            <span className={`${secondaryButtonClass} mt-auto w-full text-center`}>Velg Mal</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const AdminPage: React.FC<AdminPageProps> = ({ setView }) => {
    const { content, setContent, resetContent } = useContent();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [localContent, setLocalContent] = useState<AppContent>(content);
    const [showSuccess, setShowSuccess] = useState(false);
    const [passwordFields, setPasswordFields] = useState({ current: '', newPass: '', confirmPass: '' });
    const [passwordMessage, setPasswordMessage] = useState({ text: '', type: 'info' as 'info' | 'success' | 'error' });
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);


    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === content.adminPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Feil passord');
        }
    };

    const handleSave = () => {
        setContent(localContent);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleChange = (section: keyof AppContent, value: any) => {
        setLocalContent(prev => ({...prev, [section]: value}));
    }
    
    const handlePasswordChange = () => {
        if (passwordFields.current !== localContent.adminPassword) {
            setPasswordMessage({ text: 'Nåværende passord er feil.', type: 'error' });
            return;
        }
        if (!passwordFields.newPass || passwordFields.newPass.length < 4) {
            setPasswordMessage({ text: 'Nytt passord må være på minst 4 tegn.', type: 'error' });
            return;
        }
        if (passwordFields.newPass !== passwordFields.confirmPass) {
            setPasswordMessage({ text: 'De nye passordene stemmer ikke overens.', type: 'error' });
            return;
        }

        setLocalContent(prev => ({...prev, adminPassword: passwordFields.newPass }));
        setPasswordMessage({ text: 'Passordet er oppdatert. Trykk "Lagre Alle Endringer" for å bekrefte.', type: 'success' });
        setPasswordFields({ current: '', newPass: '', confirmPass: '' });
    };

    const handleItemChange = (section: 'playlist' | 'testimonials' | 'socialLinks' | 'services' | 'gallery' | 'customSections', id: string, field: string, value: any) => {
        setLocalContent(prev => {
            const updatedItems = prev[section].map((item: any) => 
                item.id === id ? { ...item, [field]: value } : item
            );
            return {...prev, [section]: updatedItems };
        });
    };

    const handleAddItem = (section: 'playlist' | 'testimonials' | 'socialLinks' | 'services' | 'gallery') => {
        const newItem: any = { id: crypto.randomUUID() };

        if (section === 'playlist') {
            newItem.title = 'Nytt Spor';
            newItem.artist = 'Artist';
            newItem.sourceType = 'mp3';
            newItem.src = '';
        } else if (section === 'testimonials') {
            newItem.quote = '';
            newItem.name = '';
            newItem.event = '';
        } else if (section === 'socialLinks') {
            newItem.name = 'Ny Lenke';
            newItem.url = '#';
            newItem.icon = '';
        } else if (section === 'services') {
            newItem.title = 'Ny Tjeneste';
            newItem.description = '';
            newItem.icon = '';
        } else if (section === 'gallery') {
            newItem.type = 'image';
            newItem.src = '';
            newItem.title = '';
        }

        const items = localContent[section] as any[];
        handleChange(section, [...items, newItem]);
    };

    const handleDeleteItem = (section: 'playlist' | 'testimonials' | 'socialLinks' | 'services' | 'gallery' | 'customSections', id: string) => {
        if (window.confirm('Er du sikker på at du vil slette dette elementet?')) {
            setLocalContent(prev => {
                const updatedItems = prev[section].filter((item: any) => item.id !== id);
                
                if (section === 'customSections') {
                    const updatedOrder = prev.sectionOrder.filter(s => s.customSectionId !== id);
                    return { ...prev, customSections: updatedItems as CustomSection[], sectionOrder: updatedOrder };
                }
                
                return { ...prev, [section]: updatedItems };
            });
        }
    };
    
    const handleAddCustomSectionFromTemplate = (template: {title: string, content: string}) => {
        const newItem: CustomSection = {
            id: crypto.randomUUID(),
            title: template.title,
            content: template.content,
        };

        const newSectionConfig: SectionConfig = {
            id: `custom-${newItem.id}`,
            type: 'custom',
            label: newItem.title,
            enabled: true,
            showTitle: true,
            customSectionId: newItem.id,
        };

        setLocalContent(prev => ({
            ...prev,
            customSections: [...prev.customSections, newItem],
            sectionOrder: [...prev.sectionOrder, newSectionConfig]
        }));
        
        setIsTemplateModalOpen(false);
    };

    const handleBgChange = (section: keyof SectionBackgrounds, field: keyof BackgroundSettings, value: string) => {
        setLocalContent(prev => ({
            ...prev,
            backgrounds: {
                ...prev.backgrounds,
                [section]: {
                    ...prev.backgrounds[section],
                    [field]: value,
                }
            }
        }));
    };
    
    const handleLogoChange = (field: keyof Logo, value: string) => {
        setLocalContent(prev => ({
            ...prev,
            logo: {
                ...prev.logo,
                [field]: value
            }
        }));
    };

    const handleThemeColorChange = (field: keyof ThemeColors, value: string) => {
        setLocalContent(prev => ({
            ...prev,
            themeColors: {
                ...prev.themeColors,
                [field]: value
            }
        }));
    }
    
    const handleSectionOrderChange = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...localContent.sectionOrder];
        const item = newOrder[index];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (swapIndex >= 0 && swapIndex < newOrder.length && newOrder[swapIndex].type !== 'home') {
            newOrder[index] = newOrder[swapIndex];
            newOrder[swapIndex] = item;
            handleChange('sectionOrder', newOrder);
        }
    }
    
    const handleSectionConfigChange = (id: string, key: 'enabled' | 'showTitle', value: boolean) => {
        const newOrder = localContent.sectionOrder.map(s => s.id === id ? {...s, [key]: value} : s);
        handleChange('sectionOrder', newOrder);
    }
    
    const handleCustomSectionTitleChange = (id: string, newTitle: string) => {
        handleItemChange('customSections', id, 'title', newTitle);
        // Also update the label in sectionOrder
        const newOrder = localContent.sectionOrder.map(s => s.customSectionId === id ? {...s, label: newTitle} : s);
        handleChange('sectionOrder', newOrder);
    }


    if (!isAuthenticated) {
        return (
            <div className="py-20 bg-dark-1 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-sm">
                    <form onSubmit={handleLogin} className="bg-dark-2 p-8 rounded-lg border border-dark-3 shadow-lg">
                        <h2 className="text-2xl font-bold text-white text-center mb-6">Admin-pålogging</h2>
                        <div className="mb-4">
                            <label htmlFor="password" className={labelClass}>Passord</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <button type="submit" className={`${buttonClass} w-full`}>Logg inn</button>
                    </form>
                </div>
            </div>
        );
    }

    const SectionControls: React.FC<{section: SectionConfig, index: number}> = ({ section, index }) => (
      <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="flex items-center gap-2">
              <input
                  type="checkbox"
                  id={`showTitle-${section.id}`}
                  checked={section.showTitle}
                  onChange={e => handleSectionConfigChange(section.id, 'showTitle', e.target.checked)}
                  className="w-4 h-4 text-[var(--color-primary)] bg-dark-1 border-gray-600 rounded focus:ring-[var(--color-primary)]"
              />
              <label htmlFor={`showTitle-${section.id}`} className="text-sm text-gray-300">Vis Tittel</label>
          </div>
          <div className="flex items-center gap-2">
              <input
                  type="checkbox"
                  id={`enabled-${section.id}`}
                  checked={section.enabled}
                  onChange={e => handleSectionConfigChange(section.id, 'enabled', e.target.checked)}
                  className="w-4 h-4 text-[var(--color-primary)] bg-dark-1 border-gray-600 rounded focus:ring-[var(--color-primary)]"
              />
              <label htmlFor={`enabled-${section.id}`} className="text-sm text-gray-300">Synlig</label>
          </div>
          <div className="space-x-1">
              <button onClick={() => handleSectionOrderChange(index, 'up')} disabled={index === 1} className={`${secondaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Flytt Opp</button>
              <button onClick={() => handleSectionOrderChange(index, 'down')} disabled={index === localContent.sectionOrder.length - 1} className={`${secondaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Flytt Ned</button>
          </div>
      </div>
    );
    
    return (
        <div className="py-20 bg-dark-1">
            <TemplateModal isOpen={isTemplateModalOpen} onClose={() => setIsTemplateModalOpen(false)} onSelect={handleAddCustomSectionFromTemplate} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white">Innholdsadministrasjon</h2>
                    <div className="flex items-center flex-wrap gap-2">
                         {showSuccess && <span className="text-green-400 mr-4">Lagret!</span>}
                        <button onClick={handleSave} className={buttonClass}>Lagre Alle Endringer</button>
                        <button onClick={() => setView(View.Main)} className={`${buttonClass}`}>Tilbake til Siden</button>
                        <button onClick={resetContent} className={`${dangerButtonClass}`}>Tilbakestill Alt Innhold</button>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* General Info, Logo & Theme */}
                    <div className={sectionBoxClass}>
                        <div className="text-2xl font-bold text-white px-2 mb-4">Generell Info, Logo & Farger</div>
                        <div>
                            <label htmlFor="tagline" className={labelClass}>Slagord</label>
                            <input id="tagline" type="text" value={localContent.tagline} onChange={e => handleChange('tagline', e.target.value)} className={inputClass} />
                        </div>

                        <div className="pt-4 mt-4 border-t border-dark-3 space-y-4">
                           <div>
                                <label htmlFor="logoText" className={labelClass}>DJ-navn</label>
                                <p className="text-xs text-gray-400 mb-2">Dette navnet vises på siden (f.eks. Hjem-seksjonen, bunntekst) og brukes som tekst-logo.</p>
                                <input id="logoText" type="text" value={localContent.logo.text} onChange={e => handleLogoChange('text', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                              <label htmlFor="logoType" className={labelClass}>Type logo i topp-banner</label>
                              <select 
                                  id="logoType"
                                  value={localContent.logo.type} 
                                  onChange={e => handleLogoChange('type', e.target.value)}
                                  className={inputClass}
                              >
                                  <option value="text">Tekst (bruker DJ-navnet)</option>
                                  <option value="image">Bilde</option>
                              </select>
                            </div>
                            {localContent.logo.type === 'image' && (
                                <div>
                                    <label htmlFor="logoImageUrl" className={labelClass}>Logo Bilde-URL</label>
                                    <input id="logoImageUrl" type="text" value={localContent.logo.imageUrl} onChange={e => handleLogoChange('imageUrl', e.target.value)} className={inputClass} placeholder="https://eksempel.com/logo.png" />
                                </div>
                            )}
                        </div>
                        <div className="pt-4 mt-4 border-t border-dark-3 space-y-4">
                            <h3 className="text-xl font-bold text-white">Aksentfarger</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Primærfarge</label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={localContent.themeColors.primary} onChange={e => handleThemeColorChange('primary', e.target.value)} className="p-0 h-10 w-10 bg-dark-3 border-gray-600 rounded-lg cursor-pointer"/>
                                        <input type="text" value={localContent.themeColors.primary} onChange={e => handleThemeColorChange('primary', e.target.value)} className={inputClass} placeholder="#7F00FF"/>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Lys Farge (Hover)</label>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={localContent.themeColors.light} onChange={e => handleThemeColorChange('light', e.target.value)} className="p-0 h-10 w-10 bg-dark-3 border-gray-600 rounded-lg cursor-pointer"/>
                                        <input type="text" value={localContent.themeColors.light} onChange={e => handleThemeColorChange('light', e.target.value)} className={inputClass} placeholder="#9233FF"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-dark-3">
                            <label htmlFor="musicPlayerSectionId" className={labelClass}>Plassering av Musikkspiller</label>
                            <select
                                id="musicPlayerSectionId"
                                value={localContent.musicPlayerSectionId}
                                onChange={e => handleChange('musicPlayerSectionId', e.target.value)}
                                className={inputClass}
                            >
                                <option value="hidden">Skjult</option>
                                {localContent.sectionOrder.map(s => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    {localContent.sectionOrder.map((section, index) => {
                      if (section.type === 'home') return null;
                      
                      const getSectionContent = () => {
                        switch(section.type) {
                          case 'services':
                            return (
                                <>
                                {localContent.services.map((service, idx) => (
                                    <div key={service.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start bg-dark-3 p-4 rounded">
                                        <p className="md:col-span-4 text-gray-400 font-bold">Tjeneste {idx + 1}</p>
                                        <div><label className={labelClass}>Tittel</label><input type="text" value={service.title} onChange={e => handleItemChange('services', service.id, 'title', e.target.value)} className={inputClass} /></div>
                                        <div className="md:col-span-2"><label className={labelClass}>Beskrivelse</label><textarea value={service.description} onChange={e => handleItemChange('services', service.id, 'description', e.target.value)} className={inputClass} rows={3}></textarea></div>
                                        <div><label className={labelClass}>SVG Sti-data</label><input type="text" value={service.icon} onChange={e => handleItemChange('services', service.id, 'icon', e.target.value)} className={inputClass} /><button onClick={() => handleDeleteItem('services', service.id)} className={`${dangerButtonClass} w-full mt-2`}>Slett</button></div>
                                    </div>
                                ))}
                                <button onClick={() => handleAddItem('services')} className={buttonClass}>Legg til Tjeneste</button>
                                </>
                            );
                          case 'testimonials':
                             return (
                                <>
                                {localContent.testimonials.map((testimonial, idx) => (
                                    <div key={testimonial.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start bg-dark-3 p-4 rounded">
                                        <p className="md:col-span-3 text-gray-400 font-bold">Referanse {idx + 1}</p>
                                        <div className="md:col-span-3"><label className={labelClass}>Sitat</label><textarea value={testimonial.quote} onChange={e => handleItemChange('testimonials', testimonial.id, 'quote', e.target.value)} className={inputClass} rows={3}></textarea></div>
                                        <div><label className={labelClass}>Navn</label><input type="text" value={testimonial.name} onChange={e => handleItemChange('testimonials', testimonial.id, 'name', e.target.value)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Arrangement</label><input type="text" value={testimonial.event} onChange={e => handleItemChange('testimonials', testimonial.id, 'event', e.target.value)} className={inputClass} /></div>
                                        <div className="self-end"><button onClick={() => handleDeleteItem('testimonials', testimonial.id)} className={`${dangerButtonClass} w-full`}>Slett</button></div>
                                    </div>
                                ))}
                                <button onClick={() => handleAddItem('testimonials')} className={buttonClass}>Legg til Referanse</button>
                                </>
                             );
                          case 'gallery':
                             return (
                                 <>
                                {localContent.gallery.map((item, idx) => (
                                    <div key={item.id} className="bg-dark-3 p-4 rounded space-y-4">
                                       <div className="flex justify-between items-center">
                                            <p className="text-gray-400 font-bold">Media {idx + 1}</p>
                                            <button onClick={() => handleDeleteItem('gallery', item.id)} className={`${dangerButtonClass} text-xs`}>Slett</button>
                                       </div>
                                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                           <div>
                                               <label className={labelClass}>Type</label>
                                               <select value={item.type} onChange={e => handleItemChange('gallery', item.id, 'type', e.target.value)} className={inputClass}>
                                                   <option value="image">Bilde</option>
                                                   <option value="youtube">YouTube Video</option>
                                               </select>
                                           </div>
                                           <div className="md:col-span-2">
                                               <label className={labelClass}>{item.type === 'image' ? 'Bilde-URL' : 'YouTube Video-URL'}</label>
                                               <input type="text" value={item.src} onChange={e => handleItemChange('gallery', item.id, 'src', e.target.value)} className={inputClass} placeholder="Lim inn URL..." />
                                           </div>
                                       </div>
                                        <div>
                                            <label className={labelClass}>Tittel (valgfritt)</label>
                                            <input type="text" value={item.title} onChange={e => handleItemChange('gallery', item.id, 'title', e.target.value)} className={inputClass} />
                                       </div>
                                   </div>
                                ))}
                                <button onClick={() => handleAddItem('gallery')} className={buttonClass}>Legg til Media</button>
                                </>
                             );
                          case 'booking':
                              return <p className="text-gray-400">Denne seksjonen inneholder kontaktskjemaet. Du kan endre rekkefølgen og synligheten her.</p>;
                          case 'custom':
                              const customSectionData = localContent.customSections.find(cs => cs.id === section.customSectionId);
                              if (!customSectionData) return null;
                              return (
                                <div className="bg-dark-3 p-4 rounded space-y-4">
                                    <div>
                                        <label className={labelClass}>Tittel</label>
                                        <input type="text" value={customSectionData.title} onChange={e => handleCustomSectionTitleChange(customSectionData.id, e.target.value)} className={inputClass} />
                                    </div>
                                    <div>
                                         <label className={labelClass}>Innhold (støtter enkel HTML)</label>
                                         <textarea value={customSectionData.content} onChange={e => handleItemChange('customSections', customSectionData.id, 'content', e.target.value)} className={`${inputClass} h-32`} rows={6}></textarea>
                                    </div>
                                    <button onClick={() => handleDeleteItem('customSections', customSectionData.id)} className={`${dangerButtonClass} text-xs`}>Slett Denne Seksjonen</button>
                                </div>
                              );
                          default:
                            return null;
                        }
                      }
                      
                      const sectionLabel = section.type === 'custom' 
                        ? localContent.customSections.find(cs => cs.id === section.customSectionId)?.title || section.label
                        : section.label;

                      return (
                        <div key={section.id} className={sectionBoxClass}>
                           <div className="flex justify-between items-center gap-4 w-full mb-4 border-b border-dark-3 pb-4 flex-wrap md:flex-nowrap">
                              <h3 className="text-2xl font-bold text-white whitespace-nowrap">{sectionLabel}</h3>
                              <SectionControls section={section} index={index}/>
                          </div>
                          {getSectionContent()}
                        </div>
                      );
                    })}

                    <button onClick={() => setIsTemplateModalOpen(true)} className={buttonClass}>Opprett Ny Egendefinert Seksjon</button>

                    {/* Backgrounds */}
                    <div className={sectionBoxClass}>
                        <div className="text-2xl font-bold text-white px-2 mb-4">Seksjonsbakgrunner</div>
                        {(Object.keys(localContent.backgrounds) as Array<keyof SectionBackgrounds>).map(section => (
                            <div key={section} className="bg-dark-3 p-4 rounded mb-4">
                                <h3 className="text-xl font-bold text-white capitalize mb-4">{section}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className={labelClass}>Type</label>
                                        <select value={localContent.backgrounds[section].type} onChange={e => handleBgChange(section, 'type', e.target.value)} className={inputClass}>
                                            <option value="color">Farge</option>
                                            <option value="image">Bilde-URL</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>{localContent.backgrounds[section].type === 'color' ? 'Fargekode' : 'Bilde-URL'}</label>
                                        <div className="flex items-center gap-2">
                                          {localContent.backgrounds[section].type === 'color' && (
                                            <input type="color" value={localContent.backgrounds[section].value} onChange={e => handleBgChange(section, 'value', e.target.value)} className="p-0 h-10 w-10 bg-dark-3 border-gray-600 rounded-lg cursor-pointer" />
                                          )}
                                          <input type="text" value={localContent.backgrounds[section].value} onChange={e => handleBgChange(section, 'value', e.target.value)} className={inputClass} placeholder={localContent.backgrounds[section].type === 'color' ? '#0D0D0D' : 'https://example.com/image.jpg'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                     {/* Social Links */}
                    <div className={sectionBoxClass}>
                        <div className="text-2xl font-bold text-white px-2 mb-4">Sosiale Lenker</div>
                        {localContent.socialLinks.map((link, index) => (
                            <div key={link.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-dark-3 p-4 rounded mb-4">
                                <p className="md:col-span-4 text-gray-400 font-bold">Lenke {index + 1}</p>
                                <div><label className={labelClass}>Navn</label><input type="text" value={link.name} onChange={e => handleItemChange('socialLinks', link.id, 'name', e.target.value)} className={inputClass} /></div>
                                <div><label className={labelClass}>URL</label><input type="text" value={link.url} onChange={e => handleItemChange('socialLinks', link.id, 'url', e.target.value)} className={inputClass} /></div>
                                <div className="md:col-span-1 self-start">
                                    <label className={labelClass}>Ikon (URL / SVG-kode)</label>
                                    <textarea value={link.icon} onChange={e => handleItemChange('socialLinks', link.id, 'icon', e.target.value)} className={`${inputClass} h-24 font-mono text-xs`} placeholder="Lim inn URL til .svg-fil, eller selve <svg>...</svg> koden." />
                                </div>
                                <div><button onClick={() => handleDeleteItem('socialLinks', link.id)} className={`${dangerButtonClass} w-full`}>Slett</button></div>
                            </div>
                        ))}
                        <button onClick={() => handleAddItem('socialLinks')} className={buttonClass}>Legg til Sosial Lenke</button>
                    </div>

                    {/* Playlist */}
                    <div className={sectionBoxClass}>
                        <div className="text-2xl font-bold text-white px-2 mb-4">Musikkspilleliste</div>
                        {localContent.playlist.map((track: Track, index) => (
                            <div key={track.id} className="bg-dark-3 p-4 rounded space-y-4 mb-4">
                               <p className="text-gray-400 font-bold">Spor {index + 1}</p>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                   <div>
                                       <label className={labelClass}>Kildetype</label>
                                       <select value={track.sourceType || 'mp3'} onChange={e => handleItemChange('playlist', track.id, 'sourceType', e.target.value)} className={inputClass}>
                                           <option value="mp3">MP3</option>
                                           <option value="youtube">YouTube</option>
                                           <option value="spotify">Spotify</option>
                                       </select>
                                   </div>
                                   <div><label className={labelClass}>Tittel</label><input type="text" value={track.title} onChange={e => handleItemChange('playlist', track.id, 'title', e.target.value)} className={inputClass} /></div>
                                   <div><label className={labelClass}>Artist</label><input type="text" value={track.artist} onChange={e => handleItemChange('playlist', track.id, 'artist', e.target.value)} className={inputClass} /></div>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                   <div className="md:col-span-3">
                                       <label className={labelClass}>{track.sourceType === 'youtube' ? 'YouTube Video URL' : track.sourceType === 'spotify' ? 'Spotify Track URL' : 'MP3 Fil-URL'}</label>
                                       <input type="text" value={track.src} onChange={e => handleItemChange('playlist', track.id, 'src', e.target.value)} className={inputClass} />
                                   </div>
                                   <div><button onClick={() => handleDeleteItem('playlist', track.id)} className={`${dangerButtonClass} w-full`}>Slett</button></div>
                               </div>
                           </div>
                        ))}
                        <button onClick={() => handleAddItem('playlist')} className={buttonClass}>Legg til Spor</button>
                    </div>
                    
                    {/* Contact Info */}
                    <div className={sectionBoxClass}>
                        <div className="text-2xl font-bold text-white px-2 mb-4">Kontaktinfo</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className={labelClass}>Generell E-post</label>
                                <input id="email" type="email" value={localContent.contactInfo.email} onChange={e => handleChange('contactInfo', {...localContent.contactInfo, email: e.target.value})} className={inputClass} />
                            </div>
                             <div>
                                <label htmlFor="phone" className={labelClass}>Telefon</label>
                                <input id="phone" type="text" value={localContent.contactInfo.phone} onChange={e => handleChange('contactInfo', {...localContent.contactInfo, phone: e.target.value})} className={inputClass} />
                            </div>
                        </div>
                         <div className="pt-4 mt-4 border-t border-dark-3">
                            <label htmlFor="bookingRecipientEmail" className={labelClass}>E-post for Bookinger (Reserve)</label>
                             <p className="text-xs text-gray-400 mb-2">Brukes kun dersom "Form Submission URL" ikke er satt.</p>
                            <input id="bookingRecipientEmail" type="email" value={localContent.contactInfo.bookingRecipientEmail} onChange={e => handleChange('contactInfo', {...localContent.contactInfo, bookingRecipientEmail: e.target.value})} className={inputClass} />
                        </div>
                        <div className="pt-4 mt-4 border-t border-dark-3">
                            <label htmlFor="formspreeEndpoint" className={labelClass}>Form Submission URL (f.eks. Formspree)</label>
                            <p className="text-xs text-gray-400 mb-2">For at kontaktskjemaet skal sende e-post direkte, lim inn din unike URL fra en tjeneste som Formspree her.</p>
                            <input id="formspreeEndpoint" type="text" value={localContent.contactInfo.formspreeEndpoint} onChange={e => handleChange('contactInfo', {...localContent.contactInfo, formspreeEndpoint: e.target.value})} className={inputClass} placeholder="https://formspree.io/f/din_unike_id" />
                        </div>
                    </div>

                    {/* Admin Settings */}
                    <div className={sectionBoxClass}>
                        <div className="text-2xl font-bold text-white px-2 mb-4">Admin-innstillinger</div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="currentPassword" className={labelClass}>Nåværende passord</label>
                                <input id="currentPassword" type="password" value={passwordFields.current} onChange={(e) => setPasswordFields(p => ({...p, current: e.target.value}))} className={inputClass} />
                            </div>
                             <div>
                                <label htmlFor="newPassword" className={labelClass}>Nytt passord</label>
                                <input id="newPassword" type="password" value={passwordFields.newPass} onChange={(e) => setPasswordFields(p => ({...p, newPass: e.target.value}))} className={inputClass} />
                            </div>
                             <div>
                                <label htmlFor="confirmPassword" className={labelClass}>Bekreft nytt passord</label>
                                <input id="confirmPassword" type="password" value={passwordFields.confirmPass} onChange={(e) => setPasswordFields(p => ({...p, confirmPass: e.target.value}))} className={inputClass} />
                            </div>
                            <button type="button" onClick={handlePasswordChange} className={buttonClass}>
                                Oppdater passord
                            </button>
                            {passwordMessage.text && (
                                <p className={`text-sm mt-2 ${passwordMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                    {passwordMessage.text}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};