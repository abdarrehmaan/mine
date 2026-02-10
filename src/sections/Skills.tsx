import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Layout, 
  GitBranch,
  Terminal,
  Cpu,
  Layers,
  Box,
  Globe,
  Shield
} from 'lucide-react';

// Lazy load 3D component
const SkillsSphere = lazy(() => import('../components/3d/SkillsSphere'));

// Skill Icon Component
const SkillIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon className="w-4 h-4 text-primary" />;
};

interface Skill {
  name: string;
  icon: LucideIcon;
  level: number;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShow3D(true);
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

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces',
      skills: [
        { name: 'React', icon: Code2, level: 95 },
        { name: 'TypeScript', icon: Terminal, level: 90 },
        { name: 'Vue.js', icon: Layout, level: 85 },
        { name: 'Tailwind CSS', icon: Layers, level: 95 },
        { name: 'Next.js', icon: Globe, level: 88 },
      ],
    },
    {
      title: 'Backend Development',
      description: 'Building robust and scalable server-side solutions',
      skills: [
        { name: 'Node.js', icon: Server, level: 92 },
        { name: 'Python', icon: Cpu, level: 88 },
        { name: 'PostgreSQL', icon: Database, level: 85 },
        { name: 'MongoDB', icon: Box, level: 82 },
        { name: 'GraphQL', icon: GitBranch, level: 80 },
      ],
    },
    {
      title: 'DevOps & Cloud',
      description: 'Deploying and managing cloud infrastructure',
      skills: [
        { name: 'Docker', icon: Box, level: 88 },
        { name: 'AWS', icon: Cloud, level: 85 },
        { name: 'Kubernetes', icon: Layers, level: 78 },
        { name: 'CI/CD', icon: GitBranch, level: 82 },
        { name: 'Terraform', icon: Shield, level: 75 },
      ],
    },
  ];

  const allTechnologies = skillCategories.flatMap(cat => cat.skills.map(s => s.name));

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-32 bg-void overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(44, 44, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(44, 44, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            My Expertise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-silver max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience, 
            constantly evolving with the latest industry trends.
          </p>
        </div>

        {/* 3D Skills Visualization */}
        {show3D && (
          <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Suspense fallback={
              <div className="w-full h-[500px] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            }>
              <SkillsSphere technologies={allTechnologies} />
            </Suspense>
          </div>
        )}

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`glass rounded-2xl p-6 md:p-8 transition-all duration-700 hover:border-primary/30 group`}
              style={{
                transitionDelay: `${categoryIndex * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(30px) rotateX(15deg)',
              }}
            >
              {/* Category header */}
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-silver text-sm">{category.description}</p>
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 ${hoveredSkill === skill.name ? 'bg-primary/30 scale-110' : ''}`}>
                          <SkillIcon icon={skill.icon} />
                        </div>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-silver text-sm">{skill.level}%</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${categoryIndex * 150 + 300}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent transform translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional technologies */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-center text-silver mb-6">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Redux', 'Jest', 'Cypress', 'Figma', 'Redis', 'RabbitMQ',
              'Nginx', 'Linux', 'Git', 'Jenkins', 'Prometheus', 'Elasticsearch'
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm text-silver bg-white/5 border border-white/10 rounded-full hover:bg-primary/10 hover:border-primary/30 hover:text-white transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
