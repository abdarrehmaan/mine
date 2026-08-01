import { useEffect, useRef, useState } from 'react';
import { Code, Coffee, Rocket, Users, Download, Briefcase, Award, Sparkles } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'experience' | 'values'>('story');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code, value: '50+', label: 'Projects Completed' },
    { icon: Coffee, value: '2+', label: 'Years Experience' },
    { icon: Users, value: '30+', label: 'Happy Clients' },
    { icon: Rocket, value: '99.9%', label: 'Uptime & Quality' },
  ];

  const experiences = [
    {
      role: 'Senior Full-Stack Engineer',
      company: 'PLT Creation & Independent Tech Consultant',
      period: '2024 - Present',
      desc: 'Architecting high-conversion luxury e-commerce platforms, optimizing frontend performance, and leading full-stack implementations with React, Next.js, and Node.js.',
    },
    {
      role: 'Web Application Developer',
      company: 'Digital Solutions Agency',
      period: '2023 - 2024',
      desc: 'Built custom SaaS dashboards, API integrations, and cloud infrastructure pipelines for diverse enterprise clients.',
    },
  ];

  const values = [
    {
      title: 'Craftsmanship & Quality',
      desc: 'Writing clean, resilient, self-documenting code with comprehensive testing and accessible design.',
    },
    {
      title: 'User-Centric Excellence',
      desc: 'Prioritizing end-user satisfaction with fluid UI micro-interactions, low latency, and high accessibility.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 bg-void overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Main image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-600/20 rounded-3xl blur-2xl opacity-70" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="/images/profile.jpg"
                  alt="About Abdur Rahman"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 animate-float border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold">Full Stack</p>
                  <p className="text-silver text-sm font-medium">Engineer & Architect</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              About Me
            </p>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Transforming Ideas into
              <span className="gradient-text block">Scalable Software</span>
            </h2>

            {/* Tab Buttons */}
            <div className="flex border-b border-white/10 gap-6 mb-6">
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-3 font-medium text-sm transition-all relative ${
                  activeTab === 'story' ? 'text-primary font-semibold' : 'text-silver hover:text-white'
                }`}
              >
                My Story
                {activeTab === 'story' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`pb-3 font-medium text-sm transition-all relative ${
                  activeTab === 'experience' ? 'text-primary font-semibold' : 'text-silver hover:text-white'
                }`}
              >
                Experience Timeline
                {activeTab === 'experience' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`pb-3 font-medium text-sm transition-all relative ${
                  activeTab === 'values' ? 'text-primary font-semibold' : 'text-silver hover:text-white'
                }`}
              >
                Core Values
                {activeTab === 'values' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[160px] mb-8">
              {activeTab === 'story' && (
                <div className="space-y-4 text-silver leading-relaxed animate-fade-in-up">
                  <p>
                    With over 2 years of hands-on experience in full-stack development, I build web applications and digital platforms designed for performance, elegance, and scale.
                  </p>
                  <p>
                    My journey bridges deep technical expertise (React, Next.js, Node.js, Cloud APIs) with high-end visual design — ensuring every solution looks stunning and operates flawlessly.
                  </p>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4 animate-fade-in-up">
                  {experiences.map((exp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-primary" /> {exp.role}
                        </h4>
                        <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-mono">{exp.period}</span>
                      </div>
                      <p className="text-xs text-silver/80 mb-2">{exp.company}</p>
                      <p className="text-sm text-silver">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-4 animate-fade-in-up">
                  {values.map((v, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">{v.title}</h4>
                        <p className="text-sm text-silver">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons & Skill Highlights */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                <span>Work Together</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center group border border-white/10 hover:border-primary/40 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-silver text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
