import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: '[YOUR NAME]',
    title: 'Software Developer & AI Engineer',
    headline: 'Building Intelligent Digital Experiences.',
    subheadline:
      'Software developer focused on AI, automation, modern web applications, and scalable digital products.',
    bioParagraphs: [
      'I am a software developer passionate about building intelligent, scalable, and user-focused digital products. My engineering philosophy centers on merging robust backend architecture with intuitive, cutting-edge AI capabilities and fluid user interfaces.',
      'From fine-tuning specialized LLM agents and multi-system automation pipelines to engineering high-throughput full-stack platforms, I build solutions engineered for performance, precision, and business impact.',
    ],
    focusPillars: [
      {
        title: 'Software Development',
        desc: 'Architecting robust, maintainable, and type-safe systems across modern web stacks.',
        icon: 'Code2',
      },
      {
        title: 'Artificial Intelligence',
        desc: 'Engineering autonomous agents, RAG workflows, vector search, and custom model integrations.',
        icon: 'Bot',
      },
      {
        title: 'Automation',
        desc: 'Streamlining mission-critical business operations, multi-platform webhooks, and communication pipelines.',
        icon: 'Cpu',
      },
      {
        title: 'Full Stack Development',
        desc: 'Connecting reactive modern frontend frameworks with resilient SQL/NoSQL cloud backends.',
        icon: 'Layers',
      },
      {
        title: 'Problem Solving',
        desc: 'Tackling complex architectural bottlenecks with algorithmic efficiency and scalable design patterns.',
        icon: 'Sparkles',
      },
    ],
    availableForWork: true,
    availabilityStatus: 'Available for opportunities',
    location: '[YOUR LOCATION / REMOTE]',
    socials: {
      github: 'https://github.com/[YOUR_GITHUB_USERNAME]',
      linkedin: 'https://linkedin.com/in/[YOUR_LINKEDIN_USERNAME]',
      email: '[YOUR EMAIL]@example.com',
      whatsapp: 'https://wa.me/[YOUR_PHONE_NUMBER]',
      twitter: 'https://twitter.com/[YOUR_TWITTER_USERNAME]',
      resumeUrl: '/[YOUR_RESUME_FILENAME].pdf',
    },
  },

  recruiterSummary: {
    headline: 'Full-Stack Software Engineer & AI System Builder',
    elevatorPitch:
      'Engineers high-concurrency web platforms and AI automation bridges. Strong foundational background in Java, Python, TypeScript, React/Next.js, and PostgreSQL. Demonstrates verified capacity to deliver scalable enterprise products with rigorous type safety and modern UX.',
    topStrengths: [
      'Full-Stack Architecture (Next.js, TypeScript, PostgreSQL, Supabase)',
      'AI & LLM Integration (RAG, Agents, Vector Databases, Prompt Systems)',
      'Enterprise Automation (WhatsApp Cloud API, Event Webhooks, Python Services)',
      'Performance & WebGL Optimization (Responsive 60FPS UI, Three.js)',
    ],
    availability: 'Immediate / Flexible',
    targetRoles: ['Full-Stack Engineer', 'AI/Software Engineer', 'Frontend Engineer', 'Backend Developer'],
    workAuthorization: 'Open for Remote / Hybrid / On-Site',
  },

  stats: [
    {
      id: 'projects',
      label: 'Projects Built',
      value: 20,
      suffix: '+',
      description: 'Production web apps, AI tools & automations',
    },
    {
      id: 'tech',
      label: 'Technologies',
      value: 18,
      suffix: '+',
      description: 'Languages, frameworks & cloud services',
    },
    {
      id: 'experience',
      label: 'Years Learning & Building',
      value: 3,
      suffix: '+',
      description: 'Continuous hands-on engineering',
    },
    {
      id: 'problems',
      label: 'Problems Solved',
      value: 250,
      suffix: '+',
      description: 'Algorithmic challenges & architectural tasks',
    },
  ],

  skills: [
    // Languages
    {
      name: 'Java',
      category: 'Languages',
      proficiency: 85,
      description: 'Core OOP, multithreading, backend services and enterprise software patterns.',
      iconName: 'Coffee',
      relatedProjects: ['pharmaceutical-b2b-platform'],
    },
    {
      name: 'Python',
      category: 'Languages',
      proficiency: 92,
      description: 'AI/ML scripting, FastAPI backends, data processing pipelines and automation.',
      iconName: 'Terminal',
      relatedProjects: ['ai-chatbot-system', 'intelligent-code-analyzer'],
    },
    {
      name: 'JavaScript',
      category: 'Languages',
      proficiency: 90,
      description: 'Modern ES6+ asynchronous programming, event-driven architectures, and browser APIs.',
      iconName: 'Code',
      relatedProjects: ['cloud-analytics-dashboard'],
    },
    {
      name: 'TypeScript',
      category: 'Languages',
      proficiency: 94,
      description: 'Strict type safety, generic types, robust interfaces and enterprise scalability.',
      iconName: 'FileCode',
      relatedProjects: ['pharmaceutical-b2b-platform', 'whatsapp-automation-engine'],
    },
    {
      name: 'SQL',
      category: 'Languages',
      proficiency: 88,
      description: 'Relational data modeling, complex joins, query optimization and indexing.',
      iconName: 'Database',
      relatedProjects: ['pharmaceutical-b2b-platform', 'enterprise-workflow-orchestrator'],
    },

    // Web Development
    {
      name: 'React',
      category: 'Web Development',
      proficiency: 95,
      description: 'Custom hooks, state machines, component lifecycles, and performance tuning.',
      iconName: 'Atom',
      relatedProjects: ['cloud-analytics-dashboard', 'pharmaceutical-b2b-platform'],
    },
    {
      name: 'Next.js',
      category: 'Web Development',
      proficiency: 92,
      description: 'App Router, Server Components, SSR/SSG pipelines, and edge computing.',
      iconName: 'Globe',
      relatedProjects: ['pharmaceutical-b2b-platform', 'ai-chatbot-system'],
    },
    {
      name: 'Node.js',
      category: 'Web Development',
      proficiency: 88,
      description: 'High-concurrency event loops, RESTful microservices, and file stream handling.',
      iconName: 'Server',
      relatedProjects: ['whatsapp-automation-engine', 'enterprise-workflow-orchestrator'],
    },
    {
      name: 'HTML5 & CSS3',
      category: 'Web Development',
      proficiency: 96,
      description: 'Semantic markup, accessibility (ARIA), CSS Grid, Flexbox, and fluid typography.',
      iconName: 'Layout',
      relatedProjects: ['pharmaceutical-b2b-platform'],
    },
    {
      name: 'Tailwind CSS',
      category: 'Web Development',
      proficiency: 95,
      description: 'Modern utility-first responsive styling, design token systems, and animations.',
      iconName: 'Palette',
      relatedProjects: ['pharmaceutical-b2b-platform', 'ai-chatbot-system'],
    },

    // AI / Automation
    {
      name: 'Artificial Intelligence',
      category: 'AI / Automation',
      proficiency: 90,
      description: 'Prompt engineering, structured output parsing, embeddings, and context window management.',
      iconName: 'Brain',
      relatedProjects: ['ai-chatbot-system', 'intelligent-code-analyzer'],
    },
    {
      name: 'Machine Learning',
      category: 'AI / Automation',
      proficiency: 82,
      description: 'Supervised classification, regression, clustering models, and feature engineering.',
      iconName: 'Cpu',
      relatedProjects: ['ai-chatbot-system'],
    },
    {
      name: 'Chatbots & Conversational AI',
      category: 'AI / Automation',
      proficiency: 94,
      description: 'Multi-turn conversational flows, state retention, tool calling, and human handoff.',
      iconName: 'Bot',
      relatedProjects: ['ai-chatbot-system', 'whatsapp-automation-engine'],
    },
    {
      name: 'WhatsApp Automation',
      category: 'AI / Automation',
      proficiency: 92,
      description: 'Meta Cloud API integration, webhook listeners, automated business messaging.',
      iconName: 'MessageSquare',
      relatedProjects: ['whatsapp-automation-engine'],
    },
    {
      name: 'API Integration',
      category: 'AI / Automation',
      proficiency: 95,
      description: 'OAuth2 authentication, webhook lifecycle management, rate-limiting, and error resilience.',
      iconName: 'Network',
      relatedProjects: ['whatsapp-automation-engine', 'enterprise-workflow-orchestrator'],
    },
    {
      name: 'AI Agents',
      category: 'AI / Automation',
      proficiency: 88,
      description: 'Autonomous goal execution, multi-agent coordination, and dynamic tool orchestration.',
      iconName: 'Zap',
      relatedProjects: ['ai-chatbot-system'],
    },

    // Database / Backend
    {
      name: 'PostgreSQL',
      category: 'Database / Backend',
      proficiency: 88,
      description: 'ACID transactions, schema design, JSONB querying, and row-level security.',
      iconName: 'DatabaseZap',
      relatedProjects: ['pharmaceutical-b2b-platform', 'enterprise-workflow-orchestrator'],
    },
    {
      name: 'Supabase',
      category: 'Database / Backend',
      proficiency: 90,
      description: 'Auth policies, real-time database listeners, edge functions, and storage buckets.',
      iconName: 'ShieldCheck',
      relatedProjects: ['pharmaceutical-b2b-platform'],
    },
    {
      name: 'REST APIs',
      category: 'Database / Backend',
      proficiency: 94,
      description: 'Clean RESTful standards, Swagger/OpenAPI documentation, and versioning.',
      iconName: 'Workflow',
      relatedProjects: ['whatsapp-automation-engine', 'pharmaceutical-b2b-platform'],
    },

    // Tools
    {
      name: 'Git',
      category: 'Tools',
      proficiency: 90,
      description: 'Branching workflows, interactive rebasing, merge conflict resolution, and hooks.',
      iconName: 'GitBranch',
      relatedProjects: ['pharmaceutical-b2b-platform'],
    },
    {
      name: 'GitHub',
      category: 'Tools',
      proficiency: 92,
      description: 'CI/CD GitHub Actions, issue tracking, pull requests, and package registry.',
      iconName: 'Github',
      relatedProjects: ['pharmaceutical-b2b-platform'],
    },
    {
      name: 'VS Code',
      category: 'Tools',
      proficiency: 95,
      description: 'Advanced debugging, workspace configs, custom snippets, and profiling.',
      iconName: 'Monitor',
      relatedProjects: ['intelligent-code-analyzer'],
    },
    {
      name: 'Vercel',
      category: 'Tools',
      proficiency: 90,
      description: 'Zero-config deployments, edge middleware, preview environments, and DNS.',
      iconName: 'Cloud',
      relatedProjects: ['pharmaceutical-b2b-platform'],
    },
    {
      name: 'Docker',
      category: 'Tools',
      proficiency: 80,
      description: 'Containerization, multi-stage Dockerfiles, compose environments, and isolation.',
      iconName: 'Box',
      relatedProjects: ['whatsapp-automation-engine', 'enterprise-workflow-orchestrator'],
    },
  ],

  experiences: [
    {
      id: 'exp-1',
      company: '[YOUR COMPANY / FREELANCE / ORG]',
      position: 'Software Developer & AI Engineer',
      duration: '2024 — Present',
      location: 'Remote / Hybrid',
      current: true,
      description:
        'Leading the design and implementation of intelligent software systems, modern web portals, and automated business workflows.',
      contributions: [
        'Engineered responsive web applications using Next.js, React, and TypeScript with focus on performance and accessibility.',
        'Developed automated conversational pipelines and API bridges reducing manual support overhead.',
        'Integrated PostgreSQL and Supabase backends with granular role-based access control and real-time syncing.',
      ],
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'FastAPI', 'AI APIs'],
    },
    {
      id: 'exp-2',
      company: '[YOUR PREVIOUS ROLE / INTERNSHIP / CLIENT]',
      position: 'Full Stack & Automation Developer',
      duration: '2023 — 2024',
      location: 'Remote',
      current: false,
      description:
        'Built custom client-facing applications, integrated 3rd-party SaaS platforms, and automated routine data synchronization tasks.',
      contributions: [
        'Constructed custom WhatsApp messaging automation connecting CRM leads to real-time notification channels.',
        'Implemented secure REST endpoints and optimized SQL queries for rapid data retrieval.',
        'Collaborated directly with stakeholders to translate business operational bottlenecks into scalable software solutions.',
      ],
      technologies: ['React', 'Node.js', 'Python', 'Supabase', 'Meta APIs', 'Docker'],
    },
    {
      id: 'exp-3',
      company: '[ACADEMIC / OPEN SOURCE / PROJECTS]',
      position: 'Software Engineering Trainee & Builder',
      duration: '2022 — 2023',
      location: 'Self-Directed / Institution',
      current: false,
      description:
        'Intensive focus on data structures, algorithmic problem solving, modern JavaScript frameworks, and foundational machine learning.',
      contributions: [
        'Solved 250+ coding challenges focusing on time/space complexity optimization.',
        'Built multiple full-stack prototypes testing state management patterns and REST/GraphQL paradigms.',
      ],
      technologies: ['Java', 'JavaScript', 'Python', 'SQL', 'Git', 'Linux'],
    },
  ],

  featuredProject: {
    id: 'pharmaceutical-b2b-platform',
    title: 'Pharmaceutical B2B Platform',
    tagline: 'Modern pharmaceutical wholesale & distribution platform with real-time inventory and B2B ordering workflows.',
    description:
      'A dedicated enterprise distribution platform designed for pharmaceutical suppliers and retail pharmacies. Built with high-security transaction handling, categorized medicine catalogs, compliance tracking, and instant quote generation.',
    category: 'Enterprise',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Framer Motion'],
    featured: true,
    githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/pharma-b2b-platform',
    liveUrl: 'https://example.com/pharma-b2b-demo',
    problem:
      'Pharmaceutical distributors faced high order error rates, delayed inventory stock updates over WhatsApp/phone, and lack of verified regulatory compliance validation during checkout.',
    solution:
      'Built a centralized high-speed portal with real-time stock sync, role-based wholesaler pricing tiers, automated license verification, and instantaneous purchase order generation.',
    metrics: [
      { label: 'Workflow Efficiency', value: '40% Faster' },
      { label: 'System Availability', value: '99.9% Uptime' },
      { label: 'Order Processing', value: 'Instant Sync' },
    ],
    architectureNodes: [
      {
        id: 'node-ui',
        label: 'Client Interface',
        layer: 'UI / Client',
        tech: 'Next.js 14 / React',
        purpose: 'Optimistic UI rendering, interactive product catalog & live checkout cart.',
        dataFlow: 'Captures pharmacist order intents and streams search filters.',
      },
      {
        id: 'node-fe',
        label: 'Frontend State Engine',
        layer: 'Frontend',
        tech: 'Zustand & Framer Motion',
        purpose: 'Client-side caching, fluid micro-interactions & form validations.',
        dataFlow: 'Validates license inputs and dispatches authenticated mutations.',
      },
      {
        id: 'node-api',
        label: 'Edge API Gateway',
        layer: 'API Gateway',
        tech: 'Next.js Route Handlers',
        purpose: 'JWT authentication, rate-limiting, and webhook dispatch.',
        dataFlow: 'Routes verified requests to backend database and external notification hooks.',
      },
      {
        id: 'node-be',
        label: 'Order Processing Engine',
        layer: 'Backend Logic',
        tech: 'Node.js / Edge Functions',
        purpose: 'Calculates bulk volume discounts, validates stock locks, generates PDF invoices.',
        dataFlow: 'Acquires database row locks to prevent duplicate stock depletion.',
      },
      {
        id: 'node-db',
        label: 'Relational Store',
        layer: 'Database / Storage',
        tech: 'PostgreSQL / Supabase',
        purpose: 'Stores medicines, inventory batch codes, user accounts, and transactional audit logs.',
        dataFlow: 'Enforces Row Level Security (RLS) and triggers real-time stock broadcasts.',
      },
      {
        id: 'node-ext',
        label: 'External Services',
        layer: 'External Services',
        tech: 'WhatsApp API & SMTP Gateway',
        purpose: 'Sends automated order confirmations and dispatch tracking updates.',
        dataFlow: 'Consumes outbound queue to notify buyers upon warehouse dispatch.',
      },
    ],
    caseStudy: {
      challenge:
        'Pharmaceutical wholesalers often struggle with fragmented phone/WhatsApp order workflows, delayed inventory updates, and manual invoice reconciliation between distributors and pharmacies.',
      solution:
        'Engineered a centralized, role-based B2B digital portal featuring real-time stock levels, batch tracking, automated wholesale tier pricing, and instant PO generation.',
      result:
        'Eliminated ordering bottlenecks, simplified order confirmation cycles, and established a scalable foundation for high-volume medicine distribution.',
      architectureDetails: [
        'Server-rendered catalog pages with dynamic sub-second search and filtering',
        'PostgreSQL schema with row-level security for multi-tier wholesaler permissions',
        'Automated order status notifications via webhook integrations',
      ],
    },
  },

  projects: [
    {
      id: 'ai-chatbot-system',
      title: 'AI Conversational Agent',
      tagline: 'Intelligent multi-model conversational assistant with context memory and tool orchestration.',
      description:
        'A full-stack AI chatbot application featuring streaming responses, document Q&A over custom knowledge bases (RAG), dynamic function calling, and structured JSON output processing.',
      category: 'AI / ML',
      technologies: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Vector Embeddings', 'Tailwind CSS'],
      githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/ai-conversational-agent',
      liveUrl: 'https://example.com/ai-chatbot-demo',
      problem:
        'Users frequently receive generic hallucinated answers from LLMs that lack organization-specific context and real-time execution abilities.',
      solution:
        'Implemented a hybrid RAG architecture with vector similarity search, structured prompt grounding, and automated tool-calling functions.',
      metrics: [
        { label: 'Latency', value: '< 600ms' },
        { label: 'Context Recall', value: 'High Accuracy' },
      ],
      architectureNodes: [
        {
          id: 'chat-ui',
          label: 'Streaming Chat HUD',
          layer: 'UI / Client',
          tech: 'React / Tailwind CSS',
          purpose: 'Real-time token streaming with Markdown & code highlighting.',
          dataFlow: 'Sends prompt queries over Server-Sent Events (SSE).',
        },
        {
          id: 'chat-api',
          label: 'FastAPI Gateway',
          layer: 'API Gateway',
          tech: 'Python FastAPI',
          purpose: 'Orchestrates embeddings, retrieves relevant chunks, and coordinates LLM calls.',
          dataFlow: 'Generates query vectors and queries ChromaDB/Pinecone.',
        },
        {
          id: 'chat-db',
          label: 'Vector Store & Cache',
          layer: 'Database / Storage',
          tech: 'Vector DB & Redis',
          purpose: 'Stores high-dimensional document embeddings and user session history.',
          dataFlow: 'Returns top-K cosine similarity chunks to inject into system prompt.',
        },
      ],
    },
    {
      id: 'whatsapp-automation-engine',
      title: 'WhatsApp Business Automation',
      tagline: 'Automated CRM messaging & interactive lead engagement engine via WhatsApp Cloud API.',
      description:
        'An enterprise automation gateway that connects incoming WhatsApp customer inquiries to internal CRM systems, parses intent, triggers automated reply funnels, and notifies agents when human intervention is needed.',
      category: 'Automation',
      technologies: ['Node.js', 'TypeScript', 'Meta Cloud API', 'Webhooks', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/whatsapp-automation-engine',
      liveUrl: 'https://example.com/whatsapp-automation-demo',
      problem:
        'Customer inquiries over messaging channels arrive 24/7, causing high abandonment rates when agents are offline or overwhelmed.',
      solution:
        'Engineered an event-driven webhook handler that parses incoming messages, categorizes intent, answers FAQs instantly, and routes complex leads to live dashboards.',
      metrics: [
        { label: 'Response Time', value: 'Instant' },
        { label: 'Availability', value: '24/7 Operations' },
      ],
      architectureNodes: [
        {
          id: 'wa-meta',
          label: 'Meta Cloud API',
          layer: 'External Services',
          tech: 'WhatsApp Business Platform',
          purpose: 'Receives user WhatsApp chats and delivers bot outbound templates.',
          dataFlow: 'Dispatches signed webhook payloads to the portfolio ingestion gateway.',
        },
        {
          id: 'wa-webhook',
          label: 'Webhook Listener',
          layer: 'API Gateway',
          tech: 'Node.js Express / TS',
          purpose: 'Validates SHA256 signatures, deduplicates messages, and queues worker tasks.',
          dataFlow: 'Pushes verified messages to async processing queue.',
        },
        {
          id: 'wa-db',
          label: 'Customer CRM Database',
          layer: 'Database / Storage',
          tech: 'PostgreSQL',
          purpose: 'Tracks conversational session state, customer tags, and lead qualification score.',
          dataFlow: 'Stores message transcripts and audit logs.',
        },
      ],
    },
    {
      id: 'pharmaceutical-b2b-platform-card',
      title: 'Pharmaceutical B2B Platform',
      tagline: 'Wholesale pharmaceutical ordering & inventory management suite.',
      description:
        'Comprehensive B2B commerce solution for pharmaceutical distributors, offering authenticated client portals, batch tracking, and fast checkout for licensed retail pharmacies.',
      category: 'Enterprise',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
      githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/pharma-b2b-platform',
      liveUrl: 'https://example.com/pharma-b2b-demo',
      problem: 'Manual telephone order taking causes miscommunications and pricing mismatch in bulk pharmaceuticals.',
      solution: 'Provided automated invoice generation, live stock indicators, and authenticated buyer accounts.',
      metrics: [
        { label: 'Performance', value: '98+ Lighthouse' },
        { label: 'Security', value: 'Role-Based RLS' },
      ],
    },
    {
      id: 'intelligent-code-analyzer',
      title: 'AI Code & Docs Synthesizer',
      tagline: 'Developer tool for automated repository scanning, AST analysis, and documentation generation.',
      description:
        'A developer productivity application that parses codebases, maps dependency graphs, and generates comprehensive architectural documentation and test scaffolding using LLMs.',
      category: 'AI / ML',
      technologies: ['Python', 'TypeScript', 'AST Parser', 'React', 'Tailwind CSS'],
      githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/code-synthesizer',
      liveUrl: 'https://example.com/code-analyzer-demo',
      problem: 'Maintaining architectural docs across fast-moving repositories is tedious and error-prone.',
      solution: 'Used Abstract Syntax Tree (AST) parsing combined with code summarization LLM prompts.',
      metrics: [
        { label: 'Coverage', value: 'Multi-language' },
        { label: 'Analysis Speed', value: 'Sub-minute' },
      ],
    },
    {
      id: 'cloud-analytics-dashboard',
      title: 'Real-Time Metrics Hub',
      tagline: 'High-performance real-time telemetry and API analytics monitoring dashboard.',
      description:
        'Interactive analytics dashboard displaying live WebSocket traffic streams, error rate alarms, response latency graphs, and database health metrics with dark UI glassmorphism.',
      category: 'Full Stack',
      technologies: ['React', 'Next.js', 'WebSockets', 'Chart.js', 'Tailwind CSS'],
      githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/realtime-metrics-hub',
      liveUrl: 'https://example.com/metrics-hub-demo',
      problem: 'Engineers need immediate visibility into spike anomalies without refreshing pages.',
      solution: 'Engineered a WebSocket broadcast pipeline with hardware-accelerated charting.',
      metrics: [
        { label: 'Refresh Rate', value: 'Live Stream' },
        { label: 'UI Responsiveness', value: '60 FPS' },
      ],
    },
    {
      id: 'enterprise-workflow-orchestrator',
      title: 'Workflow Automation Bridge',
      tagline: 'Multi-service event-driven webhook dispatcher and data transformation pipeline.',
      description:
        'Configurable middleware service that listens to webhooks from external providers, cleanses data payloads, enforces rate limits, and securely synchronizes databases.',
      category: 'Automation',
      technologies: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/[YOUR_GITHUB_USERNAME]/workflow-bridge',
      liveUrl: 'https://example.com/workflow-demo',
      problem: 'Disconnected SaaS tools create siloed customer data and duplicate records.',
      solution: 'Built a reliable ETL event bridge with automated retries and dead-letter queues.',
      metrics: [
        { label: 'Throughput', value: 'High Scale' },
        { label: 'Reliability', value: 'Zero Drop Rate' },
      ],
    },
  ],

  services: [
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description:
        'AI-powered applications, chatbots, AI assistants, intelligent workflows, and custom LLM agent systems designed for domain-specific automation.',
      iconName: 'Brain',
      complexity: 'High',
      timelineEstimate: '2 - 4 Weeks',
      features: [
        'Custom Conversational AI & Chatbots',
        'RAG Knowledge Base & Semantic Search',
        'AI Agent Tool Orchestration',
        'Prompt Optimization & Token Efficiency',
      ],
      gradient: 'from-cyan-500/20 to-blue-500/5',
    },
    {
      id: 'web-apps',
      title: 'Web Applications',
      description:
        'Modern, responsive, scalable web applications built with Next.js, React, and TypeScript with pixel-perfect attention to UX and performance.',
      iconName: 'Layout',
      complexity: 'Medium',
      timelineEstimate: '3 - 6 Weeks',
      features: [
        'High-Performance Next.js Architectures',
        'Interactive 3D & Micro-Interactions',
        'Responsive Mobile-First UI/UX',
        'SEO & Accessibility (WCAG compliant)',
      ],
      gradient: 'from-violet-500/20 to-purple-500/5',
    },
    {
      id: 'automation',
      title: 'Automation',
      description:
        'Business process automation, WhatsApp Cloud API integrations, webhook bridges, and multi-platform data synchronization pipelines.',
      iconName: 'Cpu',
      complexity: 'Medium',
      timelineEstimate: '1 - 3 Weeks',
      features: [
        'WhatsApp Business Messaging Funnels',
        'Multi-Platform Webhook Dispatchers',
        'Automated CRM & Lead Syncing',
        'Error Handling & Retry Mechanics',
      ],
      gradient: 'from-emerald-500/20 to-teal-500/5',
    },
    {
      id: 'software-dev',
      title: 'Software Development',
      description:
        'Custom software solutions designed around specific business requirements with clean modular code, relational databases, and REST APIs.',
      iconName: 'Code2',
      complexity: 'Enterprise',
      timelineEstimate: '4 - 8 Weeks',
      features: [
        'Robust REST & GraphQL API Design',
        'PostgreSQL & Supabase Data Architecture',
        'Type-Safe Full Stack Development',
        'CI/CD & Cloud Deployment Pipelines',
      ],
      gradient: 'from-blue-500/20 to-indigo-500/5',
    },
  ],

  achievements: [
    {
      id: 'ach-1',
      title: 'Full Stack & Software Engineering Certification',
      organization: '[CERTIFYING INSTITUTION / PLATFORM]',
      date: '2024',
      category: 'Certification',
      description:
        'Comprehensive assessment covering modern web development, algorithms, system design patterns, and database engineering.',
      badgeText: 'Verified',
      credentialUrl: 'https://example.com/certificate-preview',
    },
    {
      id: 'ach-2',
      title: 'AI & Machine Learning Specialization',
      organization: '[ACADEMY / PLATFORM NAME]',
      date: '2024',
      category: 'Certification',
      description:
        'In-depth specialization focusing on neural networks, conversational agents, vector databases, and LLM application architectures.',
      badgeText: 'Honors',
      credentialUrl: 'https://example.com/certificate-ai',
    },
    {
      id: 'ach-3',
      title: 'Hackathon Finalist / Builder Award',
      organization: '[HACKATHON / TECH COMMUNITY]',
      date: '2023',
      category: 'Hackathon',
      description:
        'Engineered an innovative real-time collaborative tool within 48 hours, recognized for technical execution and UX design.',
      badgeText: 'Top Finalist',
    },
    {
      id: 'ach-4',
      title: '250+ Algorithmic Challenges Solved',
      organization: '[LEETCODE / PLATFORM]',
      date: '2023 — Present',
      category: 'Open Source',
      description:
        'Consistent problem solving focusing on dynamic programming, graph theory, tree traversals, and asymptotic optimization.',
      badgeText: 'Active',
    },
  ],
};
