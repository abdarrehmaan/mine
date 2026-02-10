import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

// Lazy load 3D component
const FloatingShapes = lazy(() => import('../components/3d/FloatingShapes'));
import ErrorBoundary from '../components/ErrorBoundary';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState('');
  const fullName = 'Abdur Rahman';
  const [isLoaded, setIsLoaded] = useState(false);
  const [show3D, setShow3D] = useState(false);

  // Text decode animation
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let iteration = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      setDisplayText(
        fullName
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iteration > index * 2) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration > fullName.length * 2 + maxIterations) {
        setDisplayText(fullName);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Image tilt effect
  useEffect(() => {
    if (imageRef.current) {
      const tiltX = mousePosition.y * -15;
      const tiltY = mousePosition.x * 15;
      imageRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`;
    }
  }, [mousePosition]);

  useEffect(() => {
    setIsLoaded(true);
    // Delay 3D loading for performance
    const timer = setTimeout(() => setShow3D(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void"
    >
      {/* 3D Background */}
      {show3D && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <FloatingShapes />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Fallback animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Orbital rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Text content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-silver text-lg md:text-xl mb-4 font-light tracking-wide">
              Hello, I'm
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              <span className="gradient-text">{displayText || fullName}</span>
            </h1>

            <div className={`overflow-hidden transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-2xl md:text-3xl lg:text-4xl text-primary font-display font-semibold mb-6">
                Full Stack Developer
              </p>
            </div>

            <p className={`text-silver text-lg md:text-xl max-w-xl mb-8 leading-relaxed transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              I build digital experiences that merge art with engineering.
              Specializing in React, Node.js, and cloud architecture.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <button
                onClick={scrollToProjects}
                className="btn-primary group flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-primary/50 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>

            {/* Social links */}
            <div className={`flex gap-4 justify-center lg:justify-start transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile image */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-110 animate-pulse-glow" />

            {/* Image container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/30 animate-float">
              <img
                src="/images/profile.jpg"
                alt="Abdur Rahman"
                className="w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Orbiting elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-orbit" style={{ animationDuration: '15s' }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/50 rounded-full animate-orbit" style={{ animationDuration: '20s', animationDelay: '-5s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
