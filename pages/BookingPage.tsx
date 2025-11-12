
import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', eventType: '', eventDate: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Here you would typically send the data to a server
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-dark-3 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-2">Takk!</h3>
        <p className="text-gray-300">Din forespørsel er sendt. Jeg kommer tilbake til deg snart.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2 bg-brand-purple text-white font-semibold rounded-lg hover:bg-brand-purple-light transition-colors">
          Send en ny forespørsel
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Fullt Navn</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-dark-3 border-gray-600 rounded-lg p-3 text-white focus:ring-brand-purple focus:border-brand-purple"/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-postadresse</label>
          <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-dark-3 border-gray-600 rounded-lg p-3 text-white focus:ring-brand-purple focus:border-brand-purple"/>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">Type Arrangement</label>
          <select name="eventType" id="eventType" required value={formData.eventType} onChange={handleChange} className="w-full bg-dark-3 border-gray-600 rounded-lg p-3 text-white focus:ring-brand-purple focus:border-brand-purple">
            <option value="">Velg en arrangementstype</option>
            <option>Klubbkveld</option>
            <option>Bryllup</option>
            <option>Firmaarrangement</option>
            <option>Privatfest</option>
            <option>Annet</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-1">Dato for Arrangement</label>
          <input type="date" name="eventDate" id="eventDate" required value={formData.eventDate} onChange={handleChange} className="w-full bg-dark-3 border-gray-600 rounded-lg p-3 text-white focus:ring-brand-purple focus:border-brand-purple"/>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Ytterligere Detaljer</label>
        <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} className="w-full bg-dark-3 border-gray-600 rounded-lg p-3 text-white focus:ring-brand-purple focus:border-brand-purple"></textarea>
      </div>
      <div>
        <button type="submit" className="w-full px-8 py-4 bg-brand-purple text-white font-bold text-lg rounded-lg shadow-lg hover:bg-brand-purple-light transition-all duration-300 transform hover:scale-105">
          Send Forespørsel
        </button>
      </div>
    </form>
  );
};

export const BookingPage: React.FC = () => {
  const { content } = useContent();
  const { contactInfo } = content;
  const bg = content.backgrounds.booking;

  const bgStyle: React.CSSProperties =
    bg.type === 'image'
      ? { backgroundImage: `url('${bg.value}')` }
      : { backgroundColor: bg.value };

  return (
    <section id="booking" className="py-20 relative bg-cover bg-center" style={bgStyle}>
       {bg.type === 'image' && <div className="absolute inset-0 bg-black/70 z-0"></div>}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">La Oss Ta Kontakt</h2>
          <p className="text-lg text-gray-400 mt-2">Klar for å gjøre arrangementet ditt uforglemmelig? Fyll ut skjemaet nedenfor.</p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-dark-2 p-8 rounded-lg border border-dark-3">
                <BookingForm />
            </div>
            <div className="space-y-6 text-gray-300">
                <div className="bg-dark-2 p-6 rounded-lg border border-dark-3">
                    <h3 className="text-xl font-bold text-white mb-2">Kontaktinformasjon</h3>
                    <p>E-post: <a href={`mailto:${contactInfo.email}`} className="text-brand-purple hover:underline">{contactInfo.email}</a></p>
                    <p>Telefon: <a href={`tel:${contactInfo.phone}`} className="text-brand-purple hover:underline">{contactInfo.phone}</a></p>
                </div>
                 <div className="bg-dark-2 p-6 rounded-lg border border-dark-3">
                    <h3 className="text-xl font-bold text-white mb-2">Bookingprosess</h3>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Send inn dine arrangementsdetaljer.</li>
                        <li>Motta et tilpasset tilbud innen 48 timer.</li>
                        <li>Konsultasjonssamtale for å fullføre stemningen.</li>
                        <li>Lås datoen og la oss feste!</li>
                    </ol>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
