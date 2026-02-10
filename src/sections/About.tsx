import { useEffect, useRef, useState } from 'react';
import { Code, Coffee, Rocket, Users } from 'lucide-react';

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code, value: '50+', label: 'Projects Completed' },
    { icon: Coffee, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '30+', label: 'Happy Clients' },
    { icon: Rocket, value: '100%', label: 'Commitment' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 bg-void overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Main image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl" />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/images/profile.jpg"
                  alt="About Abdur Rahman"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold">Full Stack</p>
                  <p className="text-silver text-sm">Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
              About Me
            </p>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Crafting Digital
              <span className="gradient-text block">Experiences</span>
            </h2>

            <div className="space-y-4 text-silver leading-relaxed mb-8">
              <p>
                With over 5 years of experience in full-stack development, I specialize in building
                scalable web applications and intuitive user interfaces. My journey in tech started
                with a curiosity for how things work, which evolved into a passion for creating
                elegant solutions to complex problems.
              </p>
              <p>
                I believe in writing clean, efficient code that not only meets requirements but
                exceeds expectations. My approach combines technical expertise with creative
                problem-solving, ensuring every project I work on is both functional and beautiful.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Skills highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'].map((skill) => (
                <span
                  key={skill}
                  className="skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
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
