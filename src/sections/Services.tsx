import { useEffect, useRef, useState } from 'react';
import { Layout, ShoppingCart, Cloud, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  features: string[];
  highlightTag?: string;
}

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services: Service[] = [
    {
      id: 'fullstack',
      title: 'Full-Stack Web Applications',
      category: 'Core Architecture',
      description: 'End-to-end web applications built with modern frameworks (React, Next.js, TypeScript) and robust backend APIs.',
      icon: Layout,
      features: ['Single Page & SSR Apps', 'REST & GraphQL APIs', 'Database Design & ORM', 'State Management'],
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform Solutions',
      category: 'Luxury Digital Retail',
      description: 'Custom e-commerce platforms (like PLT Creation) tailored for high conversion, real-time inventory, and secure payment processing.',
      icon: ShoppingCart,
      features: ['Custom Checkout Workflows', 'Payment Gateway Integration', 'Catalog & Search Filtering', 'Admin Analytics Dashboard'],
      highlightTag: 'Featured Specialty',
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps Infrastructure',
      category: 'Scalability',
      description: 'Deploying resilient cloud architecture on AWS/Vercel with automated CI/CD pipelines, containerization, and monitoring.',
      icon: Cloud,
      features: ['AWS & Vercel Deployments', 'Docker Containerization', 'Automated CI/CD Pipelines', 'Serverless Architecture'],
    },
    {
      id: 'performance',
      title: 'UI/UX & Speed Optimization',
      category: 'Performance',
      description: 'Optimizing web applications for sub-second page loads, 95+ Lighthouse scores, fluid micro-interactions, and accessibility.',
      icon: Zap,
      features: ['Lighthouse 95+ Optimization', 'Glassmorphism UI Systems', 'Mobile-First Responsive Layouts', 'SEO & Core Web Vitals'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-32 bg-void overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            What I Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Services & <span className="gradient-text">Specializations</span>
          </h2>
          <p className="text-silver text-lg leading-relaxed">
            Delivering full-spectrum engineering solutions with a focus on modern web aesthetics, maintainable codebase architecture, and seamless user experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`glass-card relative rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 group flex flex-col justify-between ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {service.highlightTag && (
                  <span className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold bg-primary/20 text-primary border border-primary/30 rounded-full">
                    {service.highlightTag}
                  </span>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-lg shadow-primary/10">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>

                  <p className="text-xs font-mono text-silver/70 uppercase tracking-wider mb-2">
                    {service.category}
                  </p>

                  <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-silver leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-silver/90">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-white transition-colors"
                  >
                    <span>Discuss Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
