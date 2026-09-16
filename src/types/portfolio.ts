export interface ArchitectureNode {
  id: string;
  label: string;
  layer: 'UI / Client' | 'Frontend' | 'API Gateway' | 'Backend Logic' | 'Database / Storage' | 'External Services';
  tech: string;
  purpose: string;
  dataFlow: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Web Development' | 'AI / Automation' | 'Database / Backend' | 'Tools';
  proficiency?: number;
  description: string;
  iconName: string;
  relatedProjects?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string;
  contributions: string[];
  technologies: string[];
  current?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI / ML' | 'Full Stack' | 'Automation' | 'Enterprise';
  technologies: string[];
  featured?: boolean;
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  problem?: string;
  solution?: string;
  architectureNodes?: ArchitectureNode[];
  caseStudy?: {
    challenge: string;
    solution: string;
    result: string;
    architectureDetails?: string[];
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  gradient: string;
  complexity?: 'Low' | 'Medium' | 'High' | 'Enterprise';
  timelineEstimate?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: 'Certification' | 'Hackathon' | 'Academic' | 'Open Source' | 'Award';
  description: string;
  credentialUrl?: string;
  badgeText?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  whatsapp?: string;
  twitter?: string;
  resumeUrl: string;
}

export interface RecruiterSummary {
  headline: string;
  elevatorPitch: string;
  topStrengths: string[];
  availability: string;
  targetRoles: string[];
  workAuthorization: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    headline: string;
    subheadline: string;
    bioParagraphs: string[];
    focusPillars: { title: string; desc: string; icon: string }[];
    availableForWork: boolean;
    availabilityStatus: string;
    location: string;
    socials: SocialLinks;
  };
  recruiterSummary: RecruiterSummary;
  stats: StatItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  featuredProject: ProjectItem;
  projects: ProjectItem[];
  services: ServiceItem[];
  achievements: AchievementItem[];
}
