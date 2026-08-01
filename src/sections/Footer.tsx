import { Heart, ArrowUp, Sparkles } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-void border-t border-white/10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo / Name */}
          <div className="text-center md:text-left">
            <a href="#hero" className="inline-flex items-center gap-2 font-display text-2xl font-bold text-white hover:text-primary transition-colors">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Abdur Rahman</span>
            </a>
            <p className="text-silver text-sm mt-1">
              Full Stack Engineer & E-Commerce Architect
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-silver hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-all duration-300 group shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-primary" />
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/5" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-silver">
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> using React, TypeScript & Tailwind CSS
          </p>
          <p>
            &copy; {currentYear} Abdur Rahman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
