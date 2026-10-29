import { Code2, Download, Github, Linkedin, MapPin, Mail } from 'lucide-react';
import {
  achievements,
  experience,
  profile,
  projects as starterProjects,
  skills,
} from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import BrandMark from '../components/BrandMark';
import HeroRopes from '../components/HeroRopes';

const process = [
  ['01', 'Understand', 'Start with the people, needs, and details behind the idea.'],
  ['02', 'Shape', 'Map the experience and choose a clear technical direction.'],
  ['03', 'Build', 'Create the product in small, thoughtful, reliable pieces.'],
  ['04', 'Refine', 'Test the edges, polish the interactions, and make it launch-ready.'],
];

export default function HomePage() {
  const projects = starterProjects;

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Rohan Pathak, home">
          RP
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:rohanpathak9813@gmail.com">
          Available for opportunities
        </a>
        <a
          className="mobile-mail"
          href="mailto:rohanpathak9813@gmail.com"
          aria-label="Email Rohan"
        >
          <Mail size={17} />
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-topline">
          <span>DEVELOPER · CREATOR · LIFELONG LEARNER</span>
          <span>
            BASED IN INDIA <BrandMark className="brand-mark-inline" />
          </span>
        </div>
        <div className="hero-stage">
          <HeroRopes />
          <div className="hero-word" aria-hidden="true">
            ROHAN
          </div>
          <div className="hero-copy">
            <span className="script-note">Hello, I'm</span>
            <h1>
              Rohan
              <br />
              <span>Pathak</span>
            </h1>
            <p className="role-label">
              FULL STACK DEVELOPER
              <br />
              <span>& AI ENTHUSIAST</span>
            </p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a href="#work" className="text-link">
                EXPLORE MY WORK <span aria-hidden="true">v</span>
              </a>
              <a
                className="resume-link"
                href="/Rohan-Pathak-Resume.pdf"
                download="Rohan-Pathak-Resume.pdf"
              >
                <Download size={15} /> DOWNLOAD RESUME
              </a>
            </div>
          </div>
          <div className="hero-side-note">
            <span className="note-mark">
              <BrandMark />
            </span>
            <p>
              Thoughtful code.
              <br />
              Useful products.
              <br />A little bit of wonder.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{projects.length}+</strong>
              <span>
                FEATURED
                <br />
                PROJECTS
              </span>
            </div>
            <div>
              <strong>
                200<span>+</span>
              </strong>
              <span>
                PROBLEMS
                <br />
                SOLVED
              </span>
            </div>
            <div>
              <strong>01</strong>
              <span>
                INTERNSHIP
                <br />
                COMPLETED
              </span>
            </div>
          </div>
        </div>
        <div className="hero-bottomline">
          <span>
            <MapPin size={14} /> {profile.location}
          </span>
          <span>
            OPEN TO INTERNSHIPS & COLLABORATIONS{' '}
            <BrandMark className="brand-mark-inline" />
          </span>
        </div>
        <a className="mobile-scroll-cue" href="#work">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="work-section section shell" id="work">
        <SectionHeading
          eyebrow="01 — A FEW THINGS I’VE MADE"
          title="Selected work"
          note="Personal projects, built to explore ideas and solve real problems."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project._id || project.name} />
          ))}
        </div>
        <div className="section-foot">
          <span>MORE GOOD THINGS ARE IN PROGRESS</span>
          <span>v &nbsp; TO BE CONTINUED</span>
        </div>
      </section>

      <section className="about-section section" id="about">
        <div className="about-grid shell">
          <div className="about-intro">
            <SectionHeading
              eyebrow="02 — A LITTLE ABOUT ME"
              title={
                <>
                  Curious by nature.
                  <br />
                  <span className="muted-title">Developer by choice.</span>
                </>
              }
            />
            <p>{profile.bio}</p>
            <div className="achievement-list">
              {achievements.map((item, i) => (
                <div key={item}>
                  <span>0{i + 1}</span>
                  <p>{item}</p>
                  <BrandMark className="achievement-mark" />
                </div>
              ))}
            </div>
          </div>
          <div className="about-details">
            <div className="detail-block">
              <div className="detail-heading">
                <span className="eyebrow">EXPERIENCE</span>
                <span className="eyebrow">{experience.dates}</span>
              </div>
              <h3>{experience.role}</h3>
              <p className="detail-org">{experience.company}</p>
              <p className="detail-copy">{experience.summary}</p>
              <ul>
                {experience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="detail-block education-block">
              <div className="detail-heading">
                <span className="eyebrow">EDUCATION</span>
                <span className="eyebrow">{profile.years}</span>
              </div>
              <h3>{profile.education}</h3>
              <p className="detail-org">{profile.school}</p>
              <div className="education-meta">
                <span>GREATER NOIDA, INDIA</span>
                <span>CGPA &nbsp; {profile.cgpa}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section section shell">
        <SectionHeading
          eyebrow="03 — THE TOOLKIT"
          title="Things I work with"
          note="A growing toolkit for bringing ideas to life."
        />
        <div className="skills-grid">
          {skills.map((group, index) => (
            <div className="skill-group" key={group.label}>
              <span className="skill-index">0{index + 1}</span>
              <h3>{group.label}</h3>
              <div className="tag-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="process-row">
          <div className="process-title">
            <span className="eyebrow">GOOD WORK, MADE WITH INTENTION</span>
            <h3>
              A little structure.
              <br />A lot of curiosity.
            </h3>
          </div>
          {process.map(([number, title, copy]) => (
            <div className="process-step" key={number}>
              <span className="process-number">{number}</span>
              <h4>{title}</h4>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="contact-layout shell">
          <div className="contact-copy">
            <span className="eyebrow">04 — HAVE SOMETHING IN MIND?</span>
            <h2>
              Let’s make
              <br />
              <span>it happen.</span>
              <b>
                <BrandMark />
              </b>
            </h2>
            <p>
              Have a project, opportunity, or just want to talk about building things? My
              inbox is open.
            </p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <Mail size={17} />
                <span>{profile.email}</span>
                <span className="contact-arrow">&gt;</span>
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={17} />
                <span>Find me on LinkedIn</span>
                <span className="contact-arrow">&gt;</span>
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <Github size={17} />
                <span>See my GitHub</span>
                <span className="contact-arrow">&gt;</span>
              </a>
              <a href={profile.links.leetcode} target="_blank" rel="noreferrer">
                <Code2 size={17} />
                <span>See my LeetCode profile</span>
                <span className="contact-arrow">&gt;</span>
              </a>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading">
              <span>DROP ME A NOTE</span>
              <span>
                <BrandMark className="brand-mark-inline" /> &nbsp; USUALLY REPLIES WITHIN
                A DAY
              </span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="wordmark" href="#top">
          RP
        </a>
        <span>DESIGNED & BUILT WITH CARE — 2026</span>
        <a href={profile.links.leetcode} target="_blank" rel="noreferrer">
          LEETCODE &gt;
        </a>
        <a href="#top">BACK TO TOP ^</a>
      </footer>
    </main>
  );
}
