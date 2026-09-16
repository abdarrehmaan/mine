import { portfolioData } from '@/data/portfolioData';
import { ProjectItem } from '@/types/portfolio';

export interface AIResponse {
  answer: string;
  action?: {
    type: 'NAVIGATE' | 'OPEN_MODAL' | 'FILTER_PROJECTS' | 'FILTER_SKILLS' | 'DOWNLOAD_RESUME' | 'SET_MODE';
    target?: string;
    payload?: any;
  };
  suggestedFollowUps?: string[];
}

export interface JobMatchResult {
  matchScore: number; // 0 - 100
  matchedSkills: string[];
  partialSkills: string[];
  growthSkills: string[];
  recommendedProject: ProjectItem;
  talkingPoints: string[];
  fitAssessment: string;
}

export interface IdeaBlueprint {
  title: string;
  executiveSummary: string;
  recommendedStack: { layer: string; technology: string; reason: string }[];
  keyFeatures: string[];
  developmentPhases: { phase: string; duration: string; milestone: string }[];
  automationOpportunities: string[];
  estimatedComplexity: 'Low' | 'Medium' | 'High' | 'Enterprise';
}

/**
 * Intelligent deterministic AI Portfolio Engine
 * Analyzes visitor prompt, matches semantic intent with portfolio data,
 * and generates grounded answers and UI control triggers.
 */
export function queryPortfolioAI(query: string, previousContext?: string[]): AIResponse {
  const q = query.toLowerCase().trim();

  // 1. NAVIGATION INTENTS
  if (q.includes('go to project') || q.includes('show project') || q.includes('view work') || q.includes('see project')) {
    if (q.includes('ai') || q.includes('machine learning') || q.includes('ml')) {
      return {
        answer: "Navigating to the Projects section and filtering for AI & Machine Learning applications.",
        action: { type: 'NAVIGATE', target: 'projects', payload: 'AI / ML' },
        suggestedFollowUps: ['Tell me about the AI Chatbot', 'Show me your Python experience'],
      };
    }
    if (q.includes('automation') || q.includes('whatsapp')) {
      return {
        answer: "Navigating to the Projects section and highlighting Automation & Messaging workflows.",
        action: { type: 'NAVIGATE', target: 'projects', payload: 'Automation' },
        suggestedFollowUps: ['How does the WhatsApp automation work?', 'What APIs were used?'],
      };
    }
    return {
      answer: "Navigating to the Projects catalog. You can click on any project card to inspect its interactive multi-layer architecture.",
      action: { type: 'NAVIGATE', target: 'projects' },
      suggestedFollowUps: ['Show me the Pharmaceutical B2B Platform', 'Show AI projects'],
    };
  }

  if (q.includes('go to skill') || q.includes('show skill') || q.includes('technologies') || q.includes('tech stack')) {
    return {
      answer: "Navigating to the Skills & Technical Arsenal section. You can explore interactive 3D cards categorized across Languages, Web, AI, Backend, and Tools.",
      action: { type: 'NAVIGATE', target: 'skills' },
      suggestedFollowUps: ['Do you know Java?', 'What AI technologies do you use?'],
    };
  }

  if (q.includes('go to experience') || q.includes('show experience') || q.includes('work history') || q.includes('career')) {
    return {
      answer: "Navigating to the Professional Experience roadmap.",
      action: { type: 'NAVIGATE', target: 'experience' },
      suggestedFollowUps: ['What are your key contributions?', 'What roles are you seeking?'],
    };
  }

  if (q.includes('contact') || q.includes('get in touch') || q.includes('hire') || q.includes('email') || q.includes('reach out')) {
    return {
      answer: "Navigating to the Contact section. You can start a tailored conversation directly or reach out via WhatsApp/Email.",
      action: { type: 'NAVIGATE', target: 'contact' },
      suggestedFollowUps: ['What is your email?', 'Are you available for full-time roles?'],
    };
  }

  if (q.includes('resume') || q.includes('cv')) {
    if (q.includes('download')) {
      return {
        answer: "Triggering resume download and opening the interactive resume intelligence viewer.",
        action: { type: 'OPEN_MODAL', target: 'resume' },
        suggestedFollowUps: ['Generate tailored resume for my job description', 'Why should I hire you?'],
      };
    }
    return {
      answer: "Opening the Interactive Resume Intelligence view. You can also paste any Job Description to analyze match compatibility.",
      action: { type: 'OPEN_MODAL', target: 'resume' },
      suggestedFollowUps: ['Am I a fit for this role?', 'What is your elevator pitch?'],
    };
  }

  if (q.includes('recruiter mode')) {
    return {
      answer: "Activating Recruiter Mode. The interface now emphasizes executive summaries, core competencies, verified metrics, and fast contact options.",
      action: { type: 'SET_MODE', target: 'recruiter' },
      suggestedFollowUps: ['Why should I hire you?', 'What is your target role?'],
    };
  }

  if (q.includes('client mode')) {
    return {
      answer: "Activating Client Mode. The interface now highlights business solutions, automation capabilities, and the 'Describe Your Idea' architectural blueprint generator.",
      action: { type: 'SET_MODE', target: 'client' },
      suggestedFollowUps: ['Describe a business idea', 'What are your services?'],
    };
  }

  // 2. SPECIFIC TECHNOLOGY QUERIES
  if (q.includes('java')) {
    return {
      answer: `Yes, ${portfolioData.personal.name} has strong proficiency in Java (85%), with hands-on experience in Object-Oriented Design, data structures, multithreading patterns, and backend microservices architecture.`,
      action: { type: 'NAVIGATE', target: 'skills' },
      suggestedFollowUps: ['What about Python?', 'Show me your algorithmic problem solving'],
    };
  }

  if (q.includes('python')) {
    return {
      answer: `${portfolioData.personal.name} actively uses Python (92% proficiency) for AI/ML development, FastAPI microservices, AST code analysis, vector database embeddings, and automation pipelines.`,
      action: { type: 'NAVIGATE', target: 'projects', payload: 'AI / ML' },
      suggestedFollowUps: ['Tell me about the AI Conversational Agent', 'Tell me about Code Synthesizer'],
    };
  }

  if (q.includes('next.js') || q.includes('react') || q.includes('typescript')) {
    return {
      answer: `Full-stack modern web engineering is a core specialization. ${portfolioData.personal.name} utilizes Next.js (App Router, Server Components, SSR), TypeScript (strict type safety), and React with 90-95% proficiency to build high-performance web systems and 3D interfaces.`,
      action: { type: 'NAVIGATE', target: 'skills' },
      suggestedFollowUps: ['Show the Pharmaceutical B2B Platform', 'Explain your architecture patterns'],
    };
  }

  // 3. SPECIFIC PROJECT INQUIRIES
  if (q.includes('whatsapp') || q.includes('automation project')) {
    const proj = portfolioData.projects.find((p) => p.id === 'whatsapp-automation-engine');
    return {
      answer: `The WhatsApp Business Automation engine is built with Node.js, TypeScript, Meta Cloud API, webhooks, and PostgreSQL. It delivers 24/7 automated intent categorization, CRM syncing, and human-handoff routing.`,
      action: { type: 'OPEN_MODAL', target: 'project', payload: proj },
      suggestedFollowUps: ['How are webhooks verified?', 'What other automations have you built?'],
    };
  }

  if (q.includes('pharma') || q.includes('b2b') || q.includes('flagship') || q.includes('best project')) {
    return {
      answer: `The flagship project is the Pharmaceutical B2B Platform: a full-stack wholesale medicine distribution platform built with Next.js, TypeScript, PostgreSQL, and Supabase with 40% faster order processing, batch tracking, and multi-tier pricing.`,
      action: { type: 'OPEN_MODAL', target: 'project', payload: portfolioData.featuredProject },
      suggestedFollowUps: ['Show me the architecture diagram', 'What other projects did you build?'],
    };
  }

  if (q.includes('ai chatbot') || q.includes('chatbot') || q.includes('conversational')) {
    const proj = portfolioData.projects.find((p) => p.id === 'ai-chatbot-system');
    return {
      answer: `The AI Conversational Agent utilizes Next.js, FastAPI, and vector embeddings (RAG) with context streaming (< 600ms latency), dynamic tool orchestration, and knowledge retrieval.`,
      action: { type: 'OPEN_MODAL', target: 'project', payload: proj },
      suggestedFollowUps: ['What vector database was used?', 'Show all AI projects'],
    };
  }

  // 4. RECRUITER QUESTIONS
  if (q.includes('why should i hire you') || q.includes('why hire') || q.includes('strengths') || q.includes('why this candidate')) {
    return {
      answer: `${portfolioData.recruiterSummary.elevatorPitch}\n\nKey Strengths:\n• ${portfolioData.recruiterSummary.topStrengths.join('\n• ')}`,
      action: { type: 'SET_MODE', target: 'recruiter' },
      suggestedFollowUps: ['What is your availability?', 'Explore interactive resume'],
    };
  }

  if (q.includes('who are you') || q.includes('about you') || q.includes('background')) {
    return {
      answer: `I am the AI Digital Twin for ${portfolioData.personal.name} — a ${portfolioData.personal.title}. ${portfolioData.personal.subheadline} Passionate about marrying robust software architecture with practical AI systems.`,
      suggestedFollowUps: ['What are your skills?', 'Show me your projects', 'Why should I hire you?'],
    };
  }

  if (q.includes('what can you build') || q.includes('services') || q.includes('client')) {
    return {
      answer: `I build 4 primary classes of software:\n1. AI Solutions (Chatbots, RAG, AI Agents)\n2. Web Applications (Modern Next.js / React full-stack portals)\n3. Business Automation (WhatsApp APIs, webhook pipelines, CRM sync)\n4. Custom Software Development (REST APIs, PostgreSQL backends).`,
      action: { type: 'NAVIGATE', target: 'services' },
      suggestedFollowUps: ['Describe a business idea for architecture recommendations', 'Contact me'],
    };
  }

  // Default intelligent fallback grounded in portfolio
  return {
    answer: `Based on my portfolio data, I specialize in Software Development, Artificial Intelligence, Automation, and Full-Stack Engineering across Next.js, TypeScript, Python, Java, and PostgreSQL. Would you like me to navigate to projects, evaluate a job fit, or demonstrate a live code sample?`,
    suggestedFollowUps: [
      'Show me your AI projects',
      'Why should I hire you?',
      'Explore your resume',
      'Describe a project idea',
    ],
  };
}

/**
 * Job Description Matcher
 * Parses a raw Job Description text and compares against portfolio skills and projects.
 */
export function analyzeJobFit(jobDescription: string): JobMatchResult {
  const jdLower = jobDescription.toLowerCase();

  const portfolioSkillNames = portfolioData.skills.map((s) => s.name);
  const matchedSkills: string[] = [];
  const partialSkills: string[] = [];
  const growthSkills: string[] = [];

  portfolioSkillNames.forEach((skill) => {
    const sLower = skill.toLowerCase();
    if (jdLower.includes(sLower)) {
      matchedSkills.push(skill);
    }
  });

  // Check for common adjacent technologies
  const potentialMatches = ['AWS', 'GraphQL', 'Kubernetes', 'Redis', 'Kafka', 'CI/CD', 'Microservices', 'FastAPI'];
  potentialMatches.forEach((tech) => {
    if (jdLower.includes(tech.toLowerCase()) && !matchedSkills.includes(tech)) {
      if (['FastAPI', 'Redis', 'CI/CD', 'Microservices'].includes(tech)) {
        matchedSkills.push(tech);
      } else {
        partialSkills.push(tech);
      }
    }
  });

  // Fallback if generic JD
  if (matchedSkills.length === 0) {
    matchedSkills.push('TypeScript', 'React', 'Next.js', 'Python', 'REST APIs', 'SQL');
  }

  const baseScore = Math.min(95, Math.max(68, 60 + matchedSkills.length * 5 - growthSkills.length * 3));

  // Determine most relevant project
  let recProj = portfolioData.featuredProject;
  if (jdLower.includes('ai') || jdLower.includes('llm') || jdLower.includes('chat') || jdLower.includes('nlp')) {
    recProj = portfolioData.projects.find((p) => p.id === 'ai-chatbot-system') || recProj;
  } else if (jdLower.includes('automation') || jdLower.includes('whatsapp') || jdLower.includes('crm') || jdLower.includes('integration')) {
    recProj = portfolioData.projects.find((p) => p.id === 'whatsapp-automation-engine') || recProj;
  }

  return {
    matchScore: baseScore,
    matchedSkills,
    partialSkills: partialSkills.length > 0 ? partialSkills : ['Docker / Cloud Deployment', 'Microservice Scaling'],
    growthSkills: ['Domain-specific proprietary frameworks (rapidly adoptable)'],
    recommendedProject: recProj,
    talkingPoints: [
      `Demonstrated capability with ${matchedSkills.slice(0, 3).join(', ')} in production web apps.`,
      `Built ${recProj.title} with high uptime and measurable performance improvements.`,
      `Proven aptitude for autonomous problem-solving and clean, type-safe software design.`,
    ],
    fitAssessment: `Strong alignment with the core technical requirements. Possesses direct experience in full-stack architecture and relevant AI/automation engineering.`,
  };
}

/**
 * Client Idea Blueprint Generator
 * Synthesizes an architecture recommendation from a client's business prompt.
 */
export function generateIdeaBlueprint(ideaPrompt: string): IdeaBlueprint {
  const promptLower = ideaPrompt.toLowerCase();

  const isAI = promptLower.includes('ai') || promptLower.includes('bot') || promptLower.includes('smart') || promptLower.includes('intelligence');
  const isAutomation = promptLower.includes('auto') || promptLower.includes('message') || promptLower.includes('whatsapp') || promptLower.includes('crm');

  const title = `Architectural Blueprint for ${ideaPrompt.slice(0, 35)}...`;

  const recommendedStack = [
    {
      layer: 'Frontend & UI',
      technology: 'Next.js 14 (App Router) + Tailwind CSS',
      reason: 'Server-side rendering, sub-second initial load, and responsive glassmorphic design.',
    },
    {
      layer: 'Backend & API',
      technology: isAI ? 'Python FastAPI + Next.js Route Handlers' : 'Node.js / TypeScript Serverless Functions',
      reason: isAI ? 'High performance async AI inference and vector streaming.' : 'Type-safe event routing and low-latency response times.',
    },
    {
      layer: 'Database & Realtime',
      technology: 'PostgreSQL + Supabase',
      reason: 'Strict ACID relational integrity, Row Level Security, and real-time WebSocket broadcasting.',
    },
  ];

  if (isAI) {
    recommendedStack.push({
      layer: 'AI Knowledge Store',
      technology: 'Vector Embeddings + RAG Engine',
      reason: 'Enables custom document retrieval and hallucinations suppression.',
    });
  }

  return {
    title,
    executiveSummary: `A scalable, modular cloud architecture designed for high availability, intuitive user experience, and seamless third-party API integration.`,
    recommendedStack,
    keyFeatures: [
      'Role-based authentication & secure user sessions',
      'Real-time status updates and telemetry dashboards',
      'Automated error handling with retry fallbacks',
      'Responsive mobile-first interface optimized for conversion',
    ],
    developmentPhases: [
      { phase: 'Phase 1: Architecture & UI Prototype', duration: 'Week 1 - 2', milestone: 'Wireframes, DB Schema & Core APIs' },
      { phase: 'Phase 2: Core Feature Implementation', duration: 'Week 3 - 4', milestone: 'Live Business Logic & Integrations' },
      { phase: 'Phase 3: QA, Security & Deployment', duration: 'Week 5', milestone: 'Load testing, SSL setup, and Production Launch' },
    ],
    automationOpportunities: [
      'Automated email/WhatsApp transactional notifications',
      'Scheduled data backups and analytics rollups',
      'AI-powered lead qualification and triage',
    ],
    estimatedComplexity: isAI ? 'High' : isAutomation ? 'Medium' : 'Medium',
  };
}
