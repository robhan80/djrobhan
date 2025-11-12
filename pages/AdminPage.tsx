
import React, { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { AppContent, SectionBackgrounds, BackgroundSettings, View, Track, Logo, ThemeColors, SectionConfig, MediaItem, CustomSection } from '../types';

// Admin page styling
const inputClass = "w-full bg-dark-3 border border-gray-600 rounded-lg p-2 text-white focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";
const labelClass = "block text-sm font-medium text-gray-300 mb-1";
const fieldsetClass = "bg-dark-2 p-6 rounded-lg border border-dark-3 space-y-4";
const buttonClass = "px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-light)] transition-colors";
const dangerButtonClass = "px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors";
const secondaryButtonClass = "px-3 py-1 bg-dark-3 text-sm text-light-2 font-semibold rounded-lg hover:bg-gray-600 transition-colors";

interface AdminPageProps {
  setView: (view: View) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setView }) => {
    const { content, setContent, resetContent } = useContent();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [localContent, setLocalContent] = useState<AppContent>(content);
    const [showSuccess, setShowSuccess] = useState(false);
    const [passwordFields, setPasswordFields] = useState({ current: '', newPass: '', confirmPass: '' });
    const [passwordMessage, setPasswordMessage] = useState({ text: '', type: 'info' as 'info' | 'success' | 'error' });


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
        const updatedItems = localContent[section].map((item: any) => 
            item.id === id ? { ...item, [field]: value } : item
        );
        handleChange(section, updatedItems);
    };

    const handleAddItem = (section: 'playlist' | 'testimonials' | 'socialLinks' | 'services' | 'gallery' | 'customSections') => {
        const newItem: any = { id: crypto.randomUUID() };
        
        if (section === 'customSections') {
            newItem.title = 'Ny Egendefinert Seksjon';
            newItem.content = 'Legg til innhold her...';
            
            const newSectionConfig: SectionConfig = {
              id: `custom-${newItem.id}`,
              type: 'custom',
              label: newItem.title,
              enabled: true,
              customSectionId: newItem.id,
            };
            setLocalContent(prev => ({
                ...prev,
                customSections: [...prev.customSections, newItem],
                sectionOrder: [...prev.sectionOrder, newSectionConfig]
            }));
            return;
        } else if (section === 'gallery') {
            newItem.type = 'image';
            newItem.src = '';
            newItem.title = '';
        } else {
           newItem.title = '';
        }

        handleChange(section, [...localContent[section], newItem]);
    };

    const handleDeleteItem = (section: 'playlist' | 'testimonials' | 'socialLinks' | 'services' | 'gallery' | 'customSections', id: string) => {
        if(window.confirm('Er du sikker på at du vil slette dette elementet?')) {
            const updatedItems = localContent[section].filter((item: any) => item.id !== id);
            handleChange(section, updatedItems);

            if (section === 'customSections') {
                const updatedOrder = localContent.sectionOrder.filter(s => s.customSectionId !== id);
                handleChange('sectionOrder', updatedOrder);
            }
        }
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
        
        if (swapIndex >= 0 && swapIndex < newOrder.length) {
            newOrder[index] = newOrder[swapIndex];
            newOrder[swapIndex] = item;
            handleChange('sectionOrder', newOrder);
        }
    }
    
    const handleSectionToggle = (id: string, enabled: boolean) => {
        const newOrder = localContent.sectionOrder.map(s => s.id === id ? {...s, enabled} : s);
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

    return (
        <div className="py-20 bg-dark-1">
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
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Generell Info, Logo & Farger</legend>
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
                    </fieldset>
                    
                     {/* Section Order */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Seksjonsoppsett</legend>
                        <p className="text-sm text-gray-400">Dra og slipp (fremtidig) eller bruk knappene for å endre rekkefølgen på seksjonene på siden din. Du kan også skjule seksjoner du ikke vil vise.</p>
                        <div className="space-y-2">
                            {localContent.sectionOrder.map((section, index) => {
                                if (section.type === 'home') return null; // Don't allow reordering of home
                                return (
                                    <div key={section.id} className="flex items-center justify-between bg-dark-3 p-3 rounded">
                                        <span className="font-bold text-white">{section.label}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`enabled-${section.id}`}
                                                    checked={section.enabled}
                                                    onChange={e => handleSectionToggle(section.id, e.target.checked)}
                                                    className="w-4 h-4 text-[var(--color-primary)] bg-dark-1 border-gray-600 rounded focus:ring-[var(--color-primary)]"
                                                />
                                                <label htmlFor={`enabled-${section.id}`} className="text-sm text-gray-300">Synlig</label>
                                            </div>
                                            <div className="space-x-1">
                                                <button onClick={() => handleSectionOrderChange(index, 'up')} disabled={index === 1} className={`${secondaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Flytt Opp</button>
                                                <button onClick={() => handleSectionOrderChange(index, 'down')} disabled={index === localContent.sectionOrder.length - 1} className={`${secondaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}>Flytt Ned</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* Backgrounds */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Seksjonsbakgrunner</legend>
                        {(Object.keys(localContent.backgrounds) as Array<keyof SectionBackgrounds>).map(section => (
                            <div key={section} className="bg-dark-3 p-4 rounded">
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
                    </fieldset>

                     {/* Media Gallery */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Mediegalleri</legend>
                        {localContent.gallery.map((item, index) => (
                            <div key={item.id} className="bg-dark-3 p-4 rounded space-y-4">
                               <div className="flex justify-between items-center">
                                    <p className="text-gray-400 font-bold">Media {index + 1}</p>
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
                    </fieldset>
                    
                    {/* Custom Sections */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Egendefinerte Seksjoner</legend>
                        {localContent.customSections.map((section, index) => (
                             <div key={section.id} className="bg-dark-3 p-4 rounded space-y-4">
                                <div className="flex justify-between items-center">
                                     <p className="text-gray-400 font-bold">Egendefinert Seksjon {index + 1}</p>
                                     <button onClick={() => handleDeleteItem('customSections', section.id)} className={`${dangerButtonClass} text-xs`}>Slett</button>
                                </div>
                                <div>
                                    <label className={labelClass}>Tittel</label>
                                    <input type="text" value={section.title} onChange={e => handleCustomSectionTitleChange(section.id, e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                     <label className={labelClass}>Innhold (støtter enkel HTML)</label>
                                     <textarea value={section.content} onChange={e => handleItemChange('customSections', section.id, 'content', e.target.value)} className={`${inputClass} h-32`} rows={6}></textarea>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => handleAddItem('customSections')} className={buttonClass}>Opprett Ny Egendefinert Seksjon</button>
                    </fieldset>

                    {/* Social Links, Playlist, Services, Testimonials, Contact, Admin... */}
                    {/* ... (rest of the existing fieldsets from before) ... */}

                     {/* Social Links */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Sosiale Lenker</legend>
                        {localContent.socialLinks.map((link, index) => (
                            <div key={link.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-dark-3 p-4 rounded">
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
                    </fieldset>

                    {/* Playlist */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Musikkspilleliste</legend>
                        {localContent.playlist.map((track: Track, index) => (
                            <div key={track.id} className="bg-dark-3 p-4 rounded space-y-4">
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
                    </fieldset>

                    {/* Services */}
                    <fieldset className={fieldsetClass}>
                         <legend className="text-2xl font-bold text-white px-2">Tjenester</legend>
                         {localContent.services.map((service, index) => (
                             <div key={service.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start bg-dark-3 p-4 rounded">
                                 <p className="md:col-span-4 text-gray-400 font-bold">Tjeneste {index + 1}</p>
                                 <div><label className={labelClass}>Tittel</label><input type="text" value={service.title} onChange={e => handleItemChange('services', service.id, 'title', e.target.value)} className={inputClass} /></div>
                                 <div className="md:col-span-2"><label className={labelClass}>Beskrivelse</label><textarea value={service.description} onChange={e => handleItemChange('services', service.id, 'description', e.target.value)} className={inputClass} rows={3}></textarea></div>
                                 <div><label className={labelClass}>SVG Sti-data</label><input type="text" value={service.icon} onChange={e => handleItemChange('services', service.id, 'icon', e.target.value)} className={inputClass} /><button onClick={() => handleDeleteItem('services', service.id)} className={`${dangerButtonClass} w-full mt-2`}>Slett</button></div>
                             </div>
                         ))}
                         <button onClick={() => handleAddItem('services')} className={buttonClass}>Legg til Tjeneste</button>
                    </fieldset>


                    {/* Testimonials */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Referanser</legend>
                        {localContent.testimonials.map((testimonial, index) => (
                            <div key={testimonial.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start bg-dark-3 p-4 rounded">
                                <p className="md:col-span-3 text-gray-400 font-bold">Referanse {index + 1}</p>
                                <div className="md:col-span-3"><label className={labelClass}>Sitat</label><textarea value={testimonial.quote} onChange={e => handleItemChange('testimonials', testimonial.id, 'quote', e.target.value)} className={inputClass} rows={3}></textarea></div>
                                <div><label className={labelClass}>Navn</label><input type="text" value={testimonial.name} onChange={e => handleItemChange('testimonials', testimonial.id, 'name', e.target.value)} className={inputClass} /></div>
                                <div><label className={labelClass}>Arrangement</label><input type="text" value={testimonial.event} onChange={e => handleItemChange('testimonials', testimonial.id, 'event', e.target.value)} className={inputClass} /></div>
                                <div className="self-end"><button onClick={() => handleDeleteItem('testimonials', testimonial.id)} className={`${dangerButtonClass} w-full`}>Slett</button></div>
                            </div>
                        ))}
                        <button onClick={() => handleAddItem('testimonials')} className={buttonClass}>Legg til Referanse</button>
                    </fieldset>

                    {/* Contact Info */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Kontaktinfo</legend>
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
                            <label htmlFor="bookingRecipientEmail" className={labelClass}>E-post for Bookinger</label>
                             <p className="text-xs text-gray-400 mb-2">Dette er e-postadressen som booking-forespørsler fra kontaktskjemaet vil bli sendt til.</p>
                            <input id="bookingRecipientEmail" type="email" value={localContent.contactInfo.bookingRecipientEmail} onChange={e => handleChange('contactInfo', {...localContent.contactInfo, bookingRecipientEmail: e.target.value})} className={inputClass} />
                        </div>
                    </fieldset>

                    {/* Admin Settings */}
                    <fieldset className={fieldsetClass}>
                        <legend className="text-2xl font-bold text-white px-2">Admin-innstillinger</legend>
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
                    </fieldset>
                </div>
            </div>
        </div>
    );
};
