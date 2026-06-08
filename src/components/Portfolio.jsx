import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./Portfolio.css";
import "./about.css";
import "./skills.css";
import "./hero.css";
import "./work_experience.css";
import "./my_projects.css";
import "./experience_count.css";
import "./projects_count.css";
import "./degree.css";
import cvFile from "../assets/AminRahmani-2026-IT-CV.pdf";
import gamingProjectImage from "../assets/images/gaming-project.png";
import fitnessProjectImage from "../assets/images/amin-fitness-website.jpg";
import logoImage from "../assets/images/logo.png";

const contactEmail = "AMIN.TESSERACT@GMAIL.COM";
const contactPhone = "07490036127";
const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=AMIN.TESSERACT@GMAIL.COM";
const projectAutoSlideMs = 6000;
const gamingBlogUrl = "https://richweedx.github.io/AMIN-XP-GAMING/";

const projectItems = [
  {
    image: gamingProjectImage,
    alt: "Gaming blog website preview",
    title: "GAMING BLOG WEBSITE",
    description:
      "beside game blogs, users can create their own blog, save it, modify it.",
  },
  {
    image: fitnessProjectImage,
    alt: "Fitness platform project preview",
    title: "AMIN FITNESS WEBSITE",
    description: "User friendly and designed for my own advertisement!",
  },
  // {
  //   image: gamingProjectImage,
  //   alt: "Personal branding project preview",
  //   title: "PERSONAL BRAND SYSTEM",
  //   description:
  //     "A personal identity direction combining logo design, web presentation, and a strong visual system.",
  // },
  // {
  //   image: gamingProjectImage,
  //   alt: "Gaming community platform preview",
  //   title: "GAMING COMMUNITY HUB",
  //   description:
  //     "A content-driven space for game updates, user-generated posts, saved articles, and community interaction.",
  // },
  // {
  //   image: gamingProjectImage,
  //   alt: "Digital showcase project preview",
  //   title: "DIGITAL SHOWCASE WEBSITE",
  //   description:
  //     "A polished presentation site designed to highlight services, build trust, and guide visitors toward action.",
  // },
];

const Portfolio = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  const handleNextProject = (event) => {
    event?.stopPropagation();
    setActiveProjectIndex(
      (currentIndex) => (currentIndex + 1) % projectItems.length,
    );
  };

  const handlePreviousProject = (event) => {
    event?.stopPropagation();
    setActiveProjectIndex(
      (currentIndex) =>
        (currentIndex - 1 + projectItems.length) % projectItems.length,
    );
  };

  const handleOpenGamingBlog = () => {
    window.open(gamingBlogUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      handleNextProject();
    }, projectAutoSlideMs);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isContactPopupOpen && !activePopup) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsContactPopupOpen(false);
        setActivePopup(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePopup, isContactPopupOpen]);

  const handleHomeClick = () => {
    setIsContactPopupOpen(false);
    setActivePopup(null);

    const heroElement = document.getElementById("hero");
    heroElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleAboutClick = () => {
    setIsContactPopupOpen(false);
    setActivePopup("about");
  };

  const handleProjectsClick = () => {
    setIsContactPopupOpen(false);
    setActivePopup("projects");
  };

  const handleContactClick = () => {
    setActivePopup(null);
    setIsContactPopupOpen(true);
  };

  return (
    <main className="portfolio-layout">
      {isContactPopupOpen ? (
        <div
          className="contact-modal-overlay"
          role="presentation"
          onClick={() => setIsContactPopupOpen(false)}
        >
          <section
            className="portfolio-card contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-modal-header">
              <button
                type="button"
                className="contact-modal-close"
                onClick={() => setIsContactPopupOpen(false)}
                aria-label="Close contact details"
              >
                ×
              </button>
            </div>
            <p className="contact-modal-text">
              Reach out to me using the details below:
            </p>
            <div className="contact-modal-details">
              <div className="contact-detail-item">
                <span className="contact-detail-label">UK PHONE</span>
                <a className="contact-detail-value" href="tel:+447490036127">
                  {contactPhone}
                </a>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">Email</span>
                <a
                  className="contact-email-button"
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </section>
        </div>
      ) : null}
      {activePopup ? (
        <div
          className="contact-modal-overlay"
          role="presentation"
          onClick={() => setActivePopup(null)}
        >
          <section
            className={
              activePopup === "projects"
                ? "portfolio-card contact-modal section-modal section-modal-projects"
                : activePopup === "about"
                  ? "portfolio-card contact-modal section-modal section-modal-about"
                  : "portfolio-card contact-modal section-modal"
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby={
              activePopup === "about" ? "section-modal-title" : undefined
            }
            aria-label={activePopup === "projects" ? "Projects" : undefined}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-modal-header">
              {activePopup === "about" ? (
                <h2 id="section-modal-title">Introduction</h2>
              ) : null}
              <button
                type="button"
                className="contact-modal-close"
                onClick={() => setActivePopup(null)}
                aria-label="Close popup"
              >
                ×
              </button>
            </div>

            {activePopup === "about" ? (
              <p className="contact-modal-text">
                Third-year Computer Science student at the University of
                Greenwich, London, with strong skills in web development and a
                solid understanding of artificial intelligence concepts. I am
                looking for a full-time job in software development as I am
                almost done with my third year of university.
              </p>
            ) : (
              <div className="project-modal-scroll" aria-label="Projects list">
                {projectItems.map((projectItem) => (
                  <article
                    key={`${projectItem.title}-modal-card`}
                    className="project-modal-item"
                  >
                    <div
                      className="project-media"
                      aria-label="Project preview image"
                    >
                      <span className="project-badge">My Projects</span>
                      <div className="project-media-viewport">
                        <img
                          className="project-slide"
                          src={projectItem.image}
                          alt={projectItem.alt}
                        />
                      </div>
                    </div>
                    <div className="project-copy">
                      <h3>{projectItem.title}</h3>
                      <p>{projectItem.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : null}
      <section id="about" className="portfolio-card about">
        <p>
          Third-year Computer Science student at the University of Greenwich,
          London, with strong skills in web development and a solid
          understanding of artificial intelligence concepts.
        </p>
      </section>
      <section className="portfolio-card skills" aria-label="Services">
        <h3>Skills</h3>
        <ul className="services-list">
          <li>
            <span className="service-left">
              <i className="service-icon bx bx-cube-alt" aria-hidden="true" />
              <span>App Development</span>
            </span>
            <span className="service-plus" aria-hidden="true">
              +
            </span>
          </li>
          <li>
            <span className="service-left">
              <i className="service-icon bx bx-layout" aria-hidden="true" />
              <span>Website Design</span>
            </span>
            <span className="service-plus" aria-hidden="true">
              +
            </span>
          </li>
          <li>
            <span className="service-left">
              <i className="service-icon bx bx-mobile-alt" aria-hidden="true" />
              <span>UI UX Design</span>
            </span>
            <span className="service-plus" aria-hidden="true">
              +
            </span>
          </li>
          <li>
            <span className="service-left">
              <i className="service-icon bx bx-palette" aria-hidden="true" />
              <span>Game Development</span>
            </span>
            <span className="service-plus" aria-hidden="true">
              +
            </span>
          </li>
          <li>
            <span className="service-left">
              <i className="service-icon bx bx-brain" aria-hidden="true" />
              <span>Machine Learning</span>
            </span>
            <span className="service-plus" aria-hidden="true">
              +
            </span>
          </li>
          <li>
            <span className="service-left">
              <i className="service-icon bx bx-movie-play" aria-hidden="true" />
              <span>Motion Graphics</span>
            </span>
            <span className="service-plus" aria-hidden="true">
              +
            </span>
          </li>
        </ul>
        <div className="skills-row" aria-label="Core skills">
          <span className="skill-chip">
            <i className="bx bxl-javascript" aria-hidden="true" />
            <span>JavaScript</span>
          </span>
          <span className="skill-chip">
            <i className="bx bxl-python" aria-hidden="true" />
            <span>Python</span>
          </span>
          <span className="skill-chip">
            <i className="bx bxl-html5" aria-hidden="true" />
            <span>HTML</span>
          </span>
          <span className="skill-chip">
            <i className="bx bxl-css3" aria-hidden="true" />
            <span>CSS</span>
          </span>
          <span className="skill-chip">
            <i className="bx bx-code-alt" aria-hidden="true" />
            <span>C#</span>
          </span>
          <span className="skill-chip">
            <i className="bx bx-code-block" aria-hidden="true" />
            <span>C++</span>
          </span>
        </div>
      </section>
      <section
        id="hero"
        className="portfolio-card hero"
        aria-label="Introduction"
      >
        <div className="hero-content">
          <p className="hero-kicker">Hi there, My name is</p>
          <h1>Amin Rahmani</h1>
          <div className="hero-actions">
            <a
              className="hero-button hero-button-primary"
              href={cvFile}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hero-button-text-wrap" aria-hidden="true">
                <span className="hero-button-text hero-button-text-current">
                  My CV
                </span>
                <span className="hero-button-text hero-button-text-next">
                  My CV
                </span>
              </span>
              <span className="hero-button-sr">My CV</span>
            </a>
            <button
              type="button"
              className="hero-button hero-button-secondary"
              onClick={handleProjectsClick}
            >
              <span className="hero-button-text-wrap" aria-hidden="true">
                <span className="hero-button-text hero-button-text-current">
                  My Projects
                </span>
                <span className="hero-button-text hero-button-text-next">
                  My Projects
                </span>
              </span>
              <span className="hero-button-sr">My Projects</span>
            </button>
          </div>
          <div className="hero-visual">
            <img src={logoImage} alt="Amin Rahmani logo" />
          </div>
        </div>
      </section>
      <section
        className="portfolio-card work-experience"
        aria-label="Work Experience"
      >
        <h3>Work Experience</h3>
        <ul className="experience-list">
          <li>
            <span className="experience-left">
              <span className="experience-badge badge-blue" aria-hidden="true">
                <i className="bx bx-code-alt experience-badge-icon" />
              </span>
              <span className="experience-copy">
                <span className="experience-company">Toptal</span>
                <span className="experience-role">Web Developer</span>
              </span>
            </span>
            <span className="experience-date">APR 2022 - PRESENT</span>
          </li>
          <li>
            <span className="experience-left">
              <span
                className="experience-badge badge-orange"
                aria-hidden="true"
              >
                <i className="bx bxs-drink experience-badge-icon" />
              </span>
              <span className="experience-copy">
                <span className="experience-company">
                  Brown&apos;s Milton Keynes
                </span>
                <span className="experience-role">Head Bartender</span>
              </span>
            </span>
            <span className="experience-date">SEP 2024 - PRESENT</span>
          </li>
          <li>
            <span className="experience-left">
              <span className="experience-badge badge-green" aria-hidden="true">
                <i className="bx bx-dumbbell experience-badge-icon" />
              </span>
              <span className="experience-copy">
                <span className="experience-company">The Gym Group</span>
                <span className="experience-role">Personal Trainer</span>
              </span>
            </span>
            <span className="experience-date">FEB 2023 - APR 2024</span>
          </li>
        </ul>
      </section>
      <section id="my-projects" className="portfolio-card my-projects">
        <article className="project-feature">
          <div
            className="project-media"
            aria-label="Project image slider"
            role="link"
            tabIndex={0}
            onClick={handleOpenGamingBlog}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpenGamingBlog();
              }
            }}
          >
            <span className="project-badge">My Projects</span>
            <div className="project-controls" aria-label="Project controls">
              <button
                type="button"
                className="project-control-button"
                onClick={handlePreviousProject}
                aria-label="Previous project"
              >
                &#8249;
              </button>
              <button
                type="button"
                className="project-control-button"
                onClick={handleNextProject}
                aria-label="Next project"
              >
                &#8250;
              </button>
            </div>
            <div className="project-media-viewport">
              <div
                className="project-track"
                style={{
                  width: `${projectItems.length * 100}%`,
                  transform: `translateX(-${activeProjectIndex * (100 / projectItems.length)}%)`,
                }}
              >
                {projectItems.map((projectItem) => (
                  <img
                    key={projectItem.title}
                    className="project-slide"
                    style={{ width: `${100 / projectItems.length}%` }}
                    src={projectItem.image}
                    alt={projectItem.alt}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="project-copy-viewport">
            <div
              className="project-copy-track"
              style={{
                width: `${projectItems.length * 100}%`,
                transform: `translateX(-${activeProjectIndex * (100 / projectItems.length)}%)`,
              }}
            >
              {projectItems.map((projectItem) => (
                <div
                  key={`${projectItem.title}-copy`}
                  className="project-copy"
                  style={{ width: `${100 / projectItems.length}%` }}
                >
                  <h3>{projectItem.title}</h3>
                  <p>{projectItem.description}</p>
                </div>
              ))}
            </div>
            <div
              className="project-indicators"
              aria-label="Project slide indicators"
            >
              {projectItems.map((projectItem, projectIndex) => (
                <span
                  key={`${projectItem.title}-indicator`}
                  className={
                    projectIndex === activeProjectIndex
                      ? "project-indicator is-active"
                      : "project-indicator"
                  }
                />
              ))}
            </div>
          </div>
        </article>
      </section>
      <section
        className="portfolio-card experience-count"
        aria-label="Years of experience"
      >
        <p className="experience-value">+5</p>
        <p className="experience-label">Years of Experience</p>
      </section>
      <section
        className="portfolio-card projects-count"
        aria-label="Projects completed"
      >
        <p className="projects-value">+10</p>
        <p className="projects-label">Projects Completed</p>
      </section>
      <section
        id="contact"
        className="portfolio-card degree"
        aria-label="Degree"
      >
        <p className="degree-value">BSc Computer Science</p>
        <p className="degree-label">University Of Greenwich London</p>
      </section>
      <Navbar
        onHomeClick={handleHomeClick}
        onAboutClick={handleAboutClick}
        onProjectsClick={handleProjectsClick}
        onContactClick={handleContactClick}
      />
    </main>
  );
};

export default Portfolio;
