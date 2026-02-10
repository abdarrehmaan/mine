import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard. Built with React, Node.js, and PostgreSQL.',
      image: '/images/project1.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 2,
      title: 'AI Analytics Dashboard',
      description: 'Machine learning-powered analytics dashboard with predictive modeling, data visualization, and real-time insights.',
      image: '/images/project2.jpg',
      technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'AWS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'Cross-platform social media application with real-time messaging, stories, and content sharing features.',
      image: '/images/project3.jpg',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Socket.io'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 4,
      title: 'Portfolio CMS',
      description: 'Headless CMS for creative professionals with customizable themes, SEO optimization, and analytics.',
      image: '/images/project4.jpg',
      technologies: ['Next.js', 'GraphQL', 'Prisma', 'Vercel'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
  ];

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 bg-void overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
              Portfolio
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Featured Projects
            </h2>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-primary/50 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/5 hover:border-primary/50 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-full flex-shrink-0 px-2"
              >
                <div 
                  className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project image */}
                  <div className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent flex items-end p-6 transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex gap-4">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: `${index * 100 + 200}ms` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {project.featured ? 'Featured' : 'Project'}
                      </span>
                      <span className="text-silver text-sm">
                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                      {project.title}
                    </h3>
                    
                    <p className="text-silver leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm text-silver bg-white/5 border border-white/10 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>View Live</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-silver hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-primary' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* All projects grid */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-display text-2xl font-bold text-white mb-8 text-center">
            More Projects
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Task Manager', tech: 'React, Node.js' },
              { title: 'Weather App', tech: 'Vue.js, API' },
              { title: 'Chat Application', tech: 'Socket.io, Express' },
              { title: 'Blog Platform', tech: 'Next.js, MDX' },
            ].map((project, index) => (
              <div
                key={project.title}
                className="glass-card rounded-xl p-6 group cursor-pointer"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-silver text-sm">{project.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Missing import
import { Code } from 'lucide-react';

export default Projects;
