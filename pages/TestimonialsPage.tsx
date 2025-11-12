
import React from 'react';
import { Testimonial } from '../types';
import { useContent } from '../hooks/useContent';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-dark-2 p-8 rounded-lg border border-dark-3 shadow-lg flex flex-col h-full">
    <div className="text-brand-purple mb-4">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM10 11a6 6 0 00-6 6v1a1 1 0 001 1h10a1 1 0 001-1v-1a6 6 0 00-6-6z"></path>
        </svg>
    </div>
    <blockquote className="flex-grow text-gray-300 italic mb-4">"{testimonial.quote}"</blockquote>
    <footer className="mt-auto">
      <p className="font-bold text-white">{testimonial.name}</p>
      <p className="text-sm text-gray-500">{testimonial.event}</p>
    </footer>
  </div>
);

export const TestimonialsPage: React.FC = () => {
  const { content } = useContent();
  const bg = content.backgrounds.testimonials;

  const bgStyle: React.CSSProperties =
    bg.type === 'image'
      ? { backgroundImage: `url('${bg.value}')` }
      : { backgroundColor: bg.value };

  return (
    <section id="testimonials" className="py-20 relative bg-cover bg-center" style={bgStyle}>
      {bg.type === 'image' && <div className="absolute inset-0 bg-black/70 z-0"></div>}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white">Kundeomtaler</h2>
          <p className="text-lg text-gray-400 mt-2">Ikke bare ta mitt ord for det.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
