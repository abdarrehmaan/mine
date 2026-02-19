import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-void/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="font-display text-xl font-bold text-white hover:text-primary transition-colors"
            >
              AR
            </a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-sm font-medium transition-colors ${activeSection === link.href.replace('#', '')
                      ? 'text-white'
                      : 'text-silver hover:text-white'
                    }`}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-scale-in" />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-void/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-2xl font-display font-semibold transition-all duration-300 ${activeSection === link.href.replace('#', '')
                  ? 'text-primary'
                  : 'text-white hover:text-primary'
                }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-8 px-8 py-3 bg-primary text-white font-medium rounded-lg"
            style={{
              transitionDelay: '250ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
