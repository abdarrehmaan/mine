import { useEffect, useRef, useState, Suspense } from 'react';
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
import SkillsSphere from '../components/3d/SkillsSphere';

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
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [show3D, setShow3D] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

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
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Creating responsive, pixel-perfect, and highly interactive user interfaces',
      skills: [
        { name: 'React', icon: Code2, level: 95 },
        { name: 'TypeScript', icon: Terminal, level: 92 },
        { name: 'Next.js', icon: Globe, level: 90 },
        { name: 'Tailwind CSS', icon: Layers, level: 95 },
        { name: 'Vue.js', icon: Layout, level: 85 },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      description: 'Building robust, secure, and scalable server-side solutions',
      skills: [
        { name: 'Node.js / Express', icon: Server, level: 92 },
        { name: 'Python / Django', icon: Cpu, level: 88 },
        { name: 'PostgreSQL', icon: Database, level: 86 },
        { name: 'MongoDB / Prisma', icon: Box, level: 84 },
        { name: 'GraphQL & REST', icon: GitBranch, level: 85 },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud Systems',
      description: 'Deploying, monitoring, and scaling modern web infrastructure',
      skills: [
        { name: 'Docker', icon: Box, level: 88 },
        { name: 'AWS Services', icon: Cloud, level: 86 },
        { name: 'Kubernetes', icon: Layers, level: 78 },
        { name: 'CI/CD Pipelines', icon: GitBranch, level: 85 },
        { name: 'Security & Auth', icon: Shield, level: 84 },
      ],
    },
  ];

  const filteredCategories = selectedFilter === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === selectedFilter);

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
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            My Technical Arsenal
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-silver leading-relaxed">
            A comprehensive toolkit built over years of hands-on experience, 
            constantly evolving with the latest industry standards.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {[
            { label: 'All Domains', value: 'all' },
            { label: 'Frontend', value: 'frontend' },
            { label: 'Backend & APIs', value: 'backend' },
            { label: 'DevOps & Cloud', value: 'devops' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === tab.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white/5 border border-white/10 text-silver hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Skills Visualization */}
        {show3D && selectedFilter === 'all' && (
          <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Suspense fallback={
              <div className="w-full h-[400px] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            }>
              <SkillsSphere technologies={allTechnologies} />
            </Suspense>
          </div>
        )}

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div
              key={category.id}
              className={`glass rounded-3xl p-6 md:p-8 transition-all duration-700 hover:border-primary/40 border border-white/10 group flex flex-col justify-between`}
              style={{
                transitionDelay: `${categoryIndex * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <div>
                {/* Category header */}
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-silver text-sm">{category.description}</p>
                </div>

                {/* Skills list */}
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-300 ${hoveredSkill === skill.name ? 'bg-primary border-primary text-white scale-110' : ''}`}>
                            <SkillIcon icon={skill.icon} />
                          </div>
                          <span className="text-white font-semibold text-sm">{skill.name}</span>
                        </div>
                        <span className="text-silver text-xs font-mono">{skill.level}%</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${categoryIndex * 150 + 200}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional technologies */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-center text-silver/80 text-sm mb-6 font-mono uppercase tracking-wider">Additional Technologies & Tools</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Redux Toolkit', 'Zustand', 'Jest & Vitest', 'Cypress', 'Redis', 'GraphQL',
              'Nginx', 'Linux CLI', 'Git & GitHub', 'Stripe Payments', 'Vercel', 'Prisma ORM'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm text-silver bg-white/5 border border-white/10 rounded-full hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all duration-300"
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
