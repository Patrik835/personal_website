import { useEffect, useState } from 'react';

type SectionId =
  | 'home'
  | 'about'
  | 'subjects'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'publications'
  | 'contact';

type ExperienceItem = {
  time: string;
  title: string;
  meta: string;
  description: string;
  stack: string;
  featured?: boolean;
  current?: boolean;
};

type ProjectItem = {
  title: string;
  meta: string;
  description: string;
  stack: string;
  variant: 'a' | 'b' | 'c';
};

type SkillBand = {
  title: string;
  items: string[];
};

type SubjectItem = {
  title: string;
  description: string;
};

type Strength = {
  label: string;
  level: string;
  percent: number;
};

const navItems: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
];

const favoriteSubjects: SubjectItem[] = [
  {
    title: 'Computer Vision',
    description:
      'Image understanding, feature extraction, and visual model design for real-world perception tasks.',
  },
  {
    title: 'LSTM and Transformers',
    description:
      'Sequence modeling and attention-based architectures for modern NLP and time-series intelligence.',
  },
  {
    title: 'Machine Learning: Supervised and Unsupervised Techniques',
    description:
      'Model selection, clustering, classification, regression, and evaluation across structured datasets.',
  },
  {
    title: 'Deep Learning Basic Techniques',
    description:
      'Core neural network training principles, optimization, regularization, and practical tuning workflows.',
  },
  {
    title: 'Big Data for Bioanalytics and Medicine',
    description:
      'Data-intensive analytics methods applied to biological and medical contexts with scalable pipelines.',
  },
  {
    title: 'Data Science Capstone Project',
    description:
      'End-to-end project execution from problem framing and data processing to deployment-oriented insights.',
  },
  {
    title: 'Distributed Systems',
    description:
      'Reliability, scalability, and system design fundamentals for distributed, production-grade architectures.',
  },
];

const education = [
  {
    time: '09/2025 - Current',
    degree: "Master's Degree in Artificial Intelligence",
    school: 'Johannes Kepler University, Linz, Austria',
  },
  {
    time: '09/2022 - 06/2025',
    degree: "Bachelor's Degree in Informatics (Data Science & AI focus)",
    school: 'IMC University of Applied Sciences, Krems an der Donau',
  },
  {
    time: '09/2023 - 02/2024',
    degree: 'Exchange Semester in ICT',
    school: 'HZ University of Applied Sciences, Vlissingen, Netherlands',
  },
];

const experiences: ExperienceItem[] = [
  {
    time: 'Current',
    title: 'Data Science & Data Engineering Intern',
    meta: 'Bosch · Internship',
    description:
      'Building and improving data/ML pipelines, preparing datasets, and supporting production-focused analytics.',
    stack: 'Python · SQL · Data Engineering · Machine Learning',
    featured: true,
    current: true,
  },
  {
    time: '09/2024 - 02/2025',
    title: 'Data Warehouse Management Intern',
    meta: 'Oesterreichische Kontrollbank AG · Vienna · On-site',
    description:
      'Handled large datasets, supported warehouse architecture, and delivered reporting from financial data cubes.',
    stack: 'SQL · SSMS · Data Warehousing · XLCubed',
  },
  {
    time: '07/2024 - 08/2024',
    title: 'Software Engineering Intern',
    meta: 'Bitmovin · Vienna · Hybrid',
    description: 'Built a RAG chatbot prototype for live-stream video content.',
    stack: 'TypeScript · Python · LangChain · LLM · RAG',
  },
  {
    time: '02/2024 - 06/2024',
    title: 'IT Intern (Part-time)',
    meta: 'dAIp Solutions s.r.o. · Remote',
    description: 'Prepared RAG datasets and supported AI-focused web development tasks.',
    stack: 'Python · Pandas · LangChain · JavaScript',
  },
];

const projects: ProjectItem[] = [
  {
    title: 'Real-Time Chatbot for Live-stream Content',
    meta: 'Bachelor Thesis',
    description:
      'Built a real-time chatbot for sports live-streams and compared RAG vs. CAG configurations for LLM-based response quality.',
    stack: 'Python · LLM · RAG · CAG',
    variant: 'a',
  },
  {
    title: 'Celerra',
    meta: '1st Place · ViennaUP Hackathon 2025',
    description:
      'Co-developed an AI early warning system for supply chains with an agent-based pipeline.',
    stack: 'Google Cloud · Gemini · React · Docker',
    variant: 'b',
  },
  {
    title: 'Live-stream RAG Assistant Prototype',
    meta: 'Industry Internship Project',
    description:
      'Designed a retrieval pipeline and conversational flow for fast-answering assistants in streaming scenarios.',
    stack: 'TypeScript · Python · LangChain · LLM Ops',
    variant: 'c',
  },
];

const skillBands: SkillBand[] = [
  {
    title: 'Programming',
    items: ['Python', 'TypeScript', 'JavaScript', 'R', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'AI / ML',
    items: ['LangChain', 'scikit-learn', 'TensorFlow', 'LLM Workflows', 'RAG'],
  },
  {
    title: 'Data & Infra',
    items: ['Pandas', 'Git', 'Docker', 'SSMS', 'Data Warehousing', 'Reporting'],
  },
  {
    title: 'Languages',
    items: ['Slovak (C2)', 'English (B2)', 'German (B2)'],
  },
];

const strengths: Strength[] = [
  { label: 'Applied ML & AI Prototyping', level: 'Advanced', percent: 88 },
  { label: 'RAG / LLM Application Engineering', level: 'Advanced', percent: 86 },
  { label: 'Data Engineering & Analytics', level: 'Strong', percent: 82 },
  { label: 'Frontend/Product Prototyping', level: 'Strong', percent: 76 },
];

const sectionIds: SectionId[] = [
  'home',
  'about',
  'subjects',
  'education',
  'experience',
  'projects',
  'skills',
  'publications',
  'contact',
];

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem>(favoriteSubjects[0]);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setActiveSection(entry.target.id as SectionId);
        });
      },
      { threshold: 0.5 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        sectionObserver.observe(section);
      }
    });

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <>
      <div className="background-orb orb-a" aria-hidden="true" />
      <div className="background-orb orb-b" aria-hidden="true" />

      <header className="site-header">
        <a href="#home" className="brand">
          BSc. Patrik Palencar
        </a>
        <nav>
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''}>
              {label}
            </a>
          ))}
          <div className="nav-social">
            <a
              href="https://www.linkedin.com/in/patrikpalencar/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0ZM20 13.4c0-3.4-1.82-4.98-4.25-4.98a3.7 3.7 0 0 0-3.33 1.84V8.5H9.05V20h3.37v-6.07c0-1.6.3-3.14 2.29-3.14 1.96 0 1.98 1.84 1.98 3.24V20H20v-6.6Z" />
              </svg>
            </a>
            <a
              href="https://github.com/patrikpalencar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.21.66-.47v-1.8c-2.7.58-3.27-1.15-3.27-1.15-.44-1.12-1.08-1.41-1.08-1.41-.88-.6.07-.58.07-.58.97.07 1.48 1 1.48 1 .87 1.49 2.27 1.06 2.83.8.08-.64.34-1.06.62-1.3-2.16-.25-4.43-1.08-4.43-4.82 0-1.06.38-1.93 1-2.6-.1-.25-.43-1.27.1-2.64 0 0 .83-.27 2.72 1a9.4 9.4 0 0 1 4.96 0c1.89-1.27 2.72-1 2.72-1 .53 1.37.2 2.39.1 2.64.62.67 1 1.54 1 2.6 0 3.75-2.27 4.56-4.44 4.8.35.31.67.92.67 1.86v2.76c0 .26.17.56.67.47A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="section section-hero hero reveal visible">
          <div className="hero-copy">
            <p className="eyebrow">Master's AI Student · Linz, Austria</p>
            <h1>
              Building <span className="gradient-word">flashy</span>, practical AI systems for
              real-world use.
            </h1>
            <p className="lead">
              AI master's student with hands-on experience in RAG, LLM-powered applications, data
              warehousing, and software engineering. I am seeking a part-time role in AI/ML
              engineering.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="/Patrik_Palencar_CV.pdf" download>
                Download CV
              </a>
              <a className="button ghost" href="#projects">
                View Projects
              </a>
            </div>
          </div>
          <aside className="hero-spotlight">
            <div className="hero-spotlight-head">
              <h2>Current Focus</h2>
              <span>2026</span>
            </div>
            <ul>
              <li>MSc in Artificial Intelligence at JKU Linz</li>
              <li>Exploring LSTM, Transformers, and modern ML pipelines</li>
              <li>Building robust AI features from data to interface</li>
            </ul>
          </aside>
        </section>

        <section id="about" className="section section-about reveal">
          <div className="split-heading">
            <h2>About Me</h2>
            <p className="section-kicker">Precision + execution + curiosity</p>
          </div>
          <div className="about-layout">
            <p>
              I am <strong>BSc. Patrik Palencar</strong>, currently studying a Master's Degree in
              Artificial Intelligence at Johannes Kepler University in Linz. I enjoy solving
              practical problems with applied AI, robust software engineering, and data-driven
              thinking.
            </p>
            <div className="impact-box">
              <p>1st Place · ViennaUP Hackathon 2025</p>
              <p>4 AI-focused internship experiences</p>
              <p>BSc with Data Science &amp; AI focus</p>
            </div>
          </div>
        </section>

        <section id="subjects" className="section section-subjects reveal">
          <div className="split-heading">
            <h2>Favorite University Subjects</h2>
            <p className="section-kicker">Courses that shaped my AI direction</p>
          </div>
          <div className="subjects-layout">
            <div className="subjects-bento">
              {favoriteSubjects.map((subject, idx) => (
                <button
                  key={subject.title}
                  type="button"
                  className={`subject-card variant-${(idx % 4) + 1}${selectedSubject.title === subject.title ? ' selected' : ''}`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  <h3>{subject.title}</h3>
                </button>
              ))}
            </div>
            <article className="subject-description">
              <h3>{selectedSubject.title}</h3>
              <p>{selectedSubject.description}</p>
            </article>
          </div>
        </section>

        <section id="education" className="section section-education reveal">
          <div className="split-heading">
            <h2>Education</h2>
            <p className="section-kicker">Academic path in AI and data systems</p>
          </div>
          <div className="education-layout">
            <div className="timeline">
              {education.map((item) => (
                <article key={`${item.time}-${item.degree}`} className="timeline-item">
                  <p className="time">{item.time}</p>
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                </article>
              ))}
            </div>
            <aside className="education-side">
              <h3>Academic Highlights</h3>
              <p className="edu-point">MSc in AI with focus on applied machine learning.</p>
              <p className="edu-point">BSc in Informatics with Data Science &amp; AI specialization.</p>
              <p className="edu-point">International exchange semester in the Netherlands.</p>
            </aside>
          </div>
        </section>

        <section id="experience" className="section section-experience reveal">
          <h2>Experience</h2>
          <div className="experience-timeline">
            {experiences.map((item, index) => (
              <article
                key={`${item.time}-${item.title}`}
                className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}${item.current ? ' current' : ''}`}
              >
                <div className="experience-marker" aria-hidden="true" />
                <div className={`experience-content${item.current ? ' current' : ''}`}>
                  <p className="time">{item.time}</p>
                  <h3>{item.title}</h3>
                  <p className="meta">{item.meta}</p>
                  <p className="experience-description">{item.description}</p>
                  <p className="stack">{item.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section section-projects reveal">
          <div className="split-heading">
            <h2>Selected Projects</h2>
            <p className="section-kicker">Applied ML systems and prototypes</p>
          </div>
          <div className="projects-bento">
            {projects.map((item) => (
              <article key={item.title} className={`card project-card variant-${item.variant}`}>
                <h3>{item.title}</h3>
                <p className="meta">{item.meta}</p>
                <p>{item.description}</p>
                <p className="stack">{item.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section section-skills reveal">
          <div className="split-heading">
            <h2>Skills & Strengths</h2>
            <p className="section-kicker">A broader snapshot of my technical profile</p>
          </div>

          <div className="skills-layout-expanded">
            <div className="skill-bands">
              {skillBands.map((band) => (
                <article key={band.title} className="skill-group">
                  <h3>{band.title}</h3>
                  <div className="chip-cloud">
                    {band.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="strength-panel">
              <h3>Confidence Areas</h3>
              {strengths.map((strength) => (
                <div key={strength.label} className="meter-row">
                  <div className="meter-header">
                    <span>{strength.label}</span>
                    <strong>{strength.level}</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-fill" style={{ width: `${strength.percent}%` }} />
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section id="publications" className="section section-publications reveal">
          <h2>Publications</h2>
          <article className="publication">
            <h3>Real-Time Chatbot for Live-stream Content</h3>
            <p className="meta">Bachelor Thesis · 2025</p>
            <p>
              Study on real-time question-answering for sports live-streams with comparative
              analysis of Retrieval-Augmented Generation and Cache-Augmented Generation
              strategies.
            </p>
          </article>
        </section>

        <section id="contact" className="section-contact reveal">
          <div className="bottom-cta">
            <p>Let's work on AI together.</p>
            <a className="button primary bottom-cta-button" href="mailto:palencar330@gmail.com">
              Get in touch
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <p>{new Date().getFullYear()} Patrik Palencar · AI / ML Engineering Portfolio</p>
          <div className="footer-actions">
            <a href="mailto:palencar330@gmail.com">palencar330@gmail.com</a>
            <a href="tel:+421944258574">+421 944 258 574</a>
            <a href="#home" className="back-to-top">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
