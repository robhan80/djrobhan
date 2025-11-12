import React, { useState, useEffect } from 'react';
import { View } from './types';
import { LandingPage } from './pages/LandingPage';
import { ServicesPage } from './pages/ServicesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BookingPage } from './pages/BookingPage';
import { AdminPage } from './pages/AdminPage';
import { ContentProvider } from './context/ContentContext';
import { useContent } from './hooks/useContent';

const Header: React.FC<{ activeSection: string; }> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { content } = useContent();

  const navItems = [
    { id: 'home', label: 'Hjem' },
    { id: 'services', label: 'Tjenester' },
    { id: 'testimonials', label: 'Referanser' },
    { id: 'booking', label: 'Book Nå' },
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const NavLink: React.FC<{ id: string; label: string }> = ({ id, label }) => (
    <a
      href={`#${id}`}
      onClick={(e) => handleNavClick(e, id)}
      className={`px-3 py-2 lg:px-4 rounded-md text-sm lg:text-base font-semibold transition-colors duration-300 ${
        activeSection === id ? 'text-brand-purple' : 'text-light-2 hover:text-white'
      } ${id === 'booking' ? 'bg-brand-purple text-white hover:bg-light-1 hover:text-brand-purple' : ''}`}
      aria-current={activeSection === id ? 'page' : undefined}
    >
      {label}
    </a>
  );

  const Logo: React.FC<{className?: string}> = ({className}) => (
     <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`text-2xl lg:text-4xl font-black tracking-tighter text-white cursor-pointer ${className}`}>
        {content.logo.type === 'image' && content.logo.imageUrl ? (
        <img src={content.logo.imageUrl} alt="Logo" className="h-12 lg:h-16 max-w-[200px] lg:max-w-[300px] object-contain" />
        ) : (
        content.logo.text
        )}
    </a>
  );
  
  const MobileLogo: React.FC<{className?: string}> = ({className}) => (
     <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`text-xl font-black tracking-tighter text-white cursor-pointer ${className}`}>
        {content.logo.type === 'image' && content.logo.imageUrl ? (
        <img src={content.logo.imageUrl} alt="Logo" className="h-10 max-w-[150px] object-contain" />
        ) : (
        content.logo.text
        )}
    </a>
  );


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-1/80 backdrop-blur-lg border-b border-dark-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20 lg:h-28">
          {/* Left: Nav items (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map(item => <NavLink key={item.id} {...item} />)}
          </nav>
          
          {/* Left: Logo (Mobile) */}
          <div className="md:hidden flex-shrink-0">
             <MobileLogo />
          </div>

          {/* Center: Logo (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <Logo />
          </div>

          {/* Right side container */}
          <div className="flex items-center">
            {/* Right: Social icons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
              <div className="flex items-center space-x-4 lg:space-x-5">
                  {content.socialLinks.map(link => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-light-2 hover:text-brand-purple transition-colors duration-300">
                          <span className="sr-only">{link.name}</span>
                          <div className="w-6 h-6 lg:w-7 lg:h-7" dangerouslySetInnerHTML={{ __html: link.icon }} />
                      </a>
                  ))}
              </div>
            </div>

            {/* Right: Hamburger (Mobile) */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white" aria-label="Åpne meny" aria-expanded={isMenuOpen}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-dark-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navItems.map(item => <NavLink key={item.id} {...item} />)}
            <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-dark-3 w-full">
                {content.socialLinks.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-light-2 hover:text-brand-purple transition-colors duration-300">
                    <span className="sr-only">{link.name}</span>
                    <div className="w-7 h-7" dangerouslySetInnerHTML={{ __html: link.icon }} />
                </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
    const { content } = useContent();
    return (
        <footer className="bg-dark-2 border-t border-dark-3 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                {content.socialLinks.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-light-2 hover:text-brand-purple transition-colors duration-300">
                    <span className="sr-only">{link.name}</span>
                    <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: link.icon }} />
                </a>
                ))}
            </div>
            <p>&copy; {new Date().getFullYear()} {content.logo.text}. Alle Rettigheter Forbeholdt.</p>
            <div className="text-xs mt-2">
                <button onClick={() => setView(View.Admin)} className="hover:text-brand-purple transition-colors">Admin</button>
            </div>
            </div>
        </footer>
    );
};


const AppContent: React.FC = () => {
  const [view, setView] = useState<View>(View.Main);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (view !== View.Main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } 
    );

    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [view]);
  
  if (view === View.Admin) {
    return <AdminPage setView={setView} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} />
      <main className="flex-grow">
        <div className="animate-fade-in">
          <LandingPage />
          <ServicesPage />
          <TestimonialsPage />
          <BookingPage />
        </div>
      </main>
      <Footer setView={setView}/>
    </div>
  );
}

export default function App() {
    return (
        <ContentProvider>
            <AppContent />
        </ContentProvider>
    )
}