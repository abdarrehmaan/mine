# ⚡ AI Developer Personal Operating System (Portfolio v2.0)

A modern, highly interactive **AI-powered Developer Operating System** built with **Next.js 14, React Three Fiber, Three.js, TypeScript, Tailwind CSS, and Framer Motion**.

When recruiters, clients, or engineers visit this site, they don't just see a static portfolio — they interact with a live, functional AI software product.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌟 Operating System Capabilities

### 1. 🤖 AI Digital Twin ("Talk to My AI")
- Persistent AI assistant grounded in structured portfolio data (`portfolioData.ts`).
- Answers questions regarding technical expertise, background, role fit, architecture, and experience.
- Directly controls the UI: asking *"Show me your AI projects"* or *"Show experience"* automatically scrolls the viewport and applies relevant filters.

### 2. 🎙️ AI Voice Mode
- Real-time speech recognition via the Web Speech API (`SpeechRecognition`).
- Synthesized voice responses (`SpeechSynthesis`).
- 3D audio-wave visualizer orb that pulses in frequency synchronization when the AI listens or speaks.

### 3. 🔬 Interactive Project Explorer
- Clicking any project opens an immersive multi-layer architecture graph (`UI` ➔ `Frontend` ➔ `API Gateway` ➔ `Backend Logic` ➔ `Database` ➔ `External Services`).
- Interactive nodes display technologies, security measures, purpose, and live data flow diagrams.

### 4. 💻 Live Code Lab
- In-browser interactive coding sandbox with real-world snippets in **Java**, **Python**, and **TypeScript**.
- Real-time execution console simulation.
- **"Explain with AI"** breaks down algorithms step-by-step with time & space complexity analysis.

### 5. 🎯 Resume Intelligence & Role Matcher ("Am I a fit?")
- Interactive resume with clean categorized tabs (Overview, Experience, Skills, Projects, Certifications).
- **"Am I a fit for this role?"**: Paste any job description to get an instant match score %, strong matches, partial matches, growth areas, and tailored project talking points.

### 6. 👔 Persona Switcher: Developer, Recruiter & Client Modes
- **Developer Mode**: Standard immersive 3D interface and code-centric features.
- **Recruiter Mode**: Activates an executive summary banner with *"Why this candidate?"*, verified competency badges, and 1-click resume matching.
- **Client Mode**: Shifts focus to business ROI, estimated development complexity, and the **"Describe Your Idea"** AI architecture blueprint generator.

### 7. 🌌 3D Skill Universe
- Central `ENGINEER CORE` 3D entity surrounded by orbiting 3D tech nodes (`AI`, `JAVA`, `PYTHON`, `NEXT.JS`, `REACT`, `SUPABASE`, `AUTOMATION`, `API`, `DATABASE`, `CLOUD`).
- Clicking any node filters projects and highlights relevant experience across the website.

### 8. ⌨️ Global Command Palette (`Ctrl + K` / `Cmd + K`)
- Fuzzy search across all sections, modes, and tools.
- Terminal Easter eggs: `whoami`, `sudo portfolio`, `help`, `stats`, `clear`.

### 9. 📊 Real-Time System Status HUD
- Live telemetry panel showing truthful status indicators for Core Portfolio, AI Assistant (Grounded), 3D WebGL Engine, and Web Speech API.

### 10. 💬 Conversational Contact Flow ("Start a Conversation")
- Dynamic multi-step goal selector ([Hire me], [Build a product], [AI solution], [Automation], [Collaboration]).
- Live request summary review before submission.

---

## 🛠️ Personalizing Your Information

All personal data, employment history, projects, metrics, and links are kept in a single clean data file:

👉 **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**

Replace the marked placeholders:
* `[YOUR NAME]` — Your full name
* `[YOUR EMAIL]` — Your email address
* `[YOUR_GITHUB_USERNAME]` — GitHub profile
* `[YOUR_LINKEDIN_USERNAME]` — LinkedIn profile
* `[YOUR_PHONE_NUMBER]` — WhatsApp business number
* `[YOUR_RESUME_FILENAME].pdf` — Place your resume PDF in `/public/`
* `[YOUR COMPANY / FREELANCE / ORG]` — Career experiences
