import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

// ==================
// Inline SVG Icon Set (stroke-based, currentColor)
// ==================
const Icons = {
  IdCard: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5"></rect>
      <path d="M7.5 9.5h6.5"></path>
      <path d="M7.5 12.5h5"></path>
      <circle cx="17" cy="12" r="1.6"></circle>
    </svg>
  ),
  Car: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 13l2-5.5A2 2 0 0 1 6.82 6h10.36A2 2 0 0 1 19 7.5L21 13"></path>
      <path d="M5 17h14"></path>
      <circle cx="7" cy="17" r="1.7"></circle>
      <circle cx="17" cy="17" r="1.7"></circle>
      <path d="M3 13h18"></path>
    </svg>
  ),
  Calendar: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="2"></rect>
      <path d="M16 3v4"></path>
      <path d="M8 3v4"></path>
      <path d="M3 9.5h18"></path>
      <path d="M8 14h4"></path>
    </svg>
  ),
  Document: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
      <path d="M14 3v5h5"></path>
      <path d="M9 13h6"></path>
      <path d="M9 17h4"></path>
    </svg>
  ),
  Clipboard: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="5" y="4" width="14" height="16" rx="2"></rect>
      <path d="M9 4.5h6a2 2 0 0 1 2 2V7"></path>
      <path d="M8 9.5h8"></path>
      <path d="M8 13h6"></path>
    </svg>
  ),
  Home: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 11.5l9-7 9 7"></path>
      <path d="M5 10.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8.5"></path>
      <path d="M10 21v-6h4v6"></path>
    </svg>
  ),
};

export default function App() {
  // ==================
  // Carousel state
  // ==================
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const carouselSlides = [
    {
      title: "Save a Trip!",
      text: "Complete your transactions online through myBMV.",
      button: "Log in or register for a myBMV account",
      image: "/slide1.jpeg",
    },
    {
      title: "E-Titling: Faster, Safer",
      text: "Enjoy reduced paperwork and enhanced efficiency with electronic titles.",
      button: "Learn the benefits of E-Title vs paper",
      image: "/slide2.jpg",
    },
    {
      title: "Get Your Sticker Quicker!",
      text: "Renew at a kiosk and print your registration sticker the same day.",
      button: "Find a kiosk near you",
      image: "/slide3.png",
    },
  ];

  // Auto-advance
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion, carouselSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide((index + carouselSlides.length) % carouselSlides.length);
  };
  const next = () => goToSlide(currentSlide + 1);
  const prev = () => goToSlide(currentSlide - 1);

  // ==================
  // Botcopy injection
  // ==================
  useEffect(() => {
    const BOT_ID = "6894d7811ebc648a775e1884"; // keep your existing bot ID

    if (document.getElementById("botcopy-embedder-d7lcfheammjct")) return;

    const botDiv = document.createElement("div");
    botDiv.id = "botcopy-embedder-d7lcfheammjct";
    botDiv.className = "botcopy-embedder-d7lcfheammjct";
    botDiv.setAttribute("data-botId", BOT_ID);

    const scriptTag = document.createElement("script");
    scriptTag.src = "https://widget.botcopy.com/js/injection.js";
    scriptTag.async = true;
    scriptTag.defer = true;

    document.body.appendChild(botDiv);
    document.body.appendChild(scriptTag);
  }, []);

  // ==================
  // Scroll reveal
  // ==================
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll("[data-reveal]");
    // If no IntersectionObserver, just show them
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ==================
  // Services (SVG icons)
  // ==================
  const services = [
    { title: "Renew Driver's License", Icon: Icons.IdCard },
    { title: "Register a Vehicle", Icon: Icons.Car },
    { title: "Schedule an Appointment", Icon: Icons.Calendar },
    { title: "Check Title Status", Icon: Icons.Document },
    { title: "View Your Driving Record", Icon: Icons.Clipboard },
    { title: "Update Address", Icon: Icons.Home },
  ];

  const carouselRegionId = "announcement-carousel";

  return (
    <div>
      {/* Announcement Bar */}
      <div className="announcement-bar" role="status" aria-live="polite" data-reveal style={{ ["--reveal-delay"]: "0ms" }}>
        <div className="container">
          <span className="badge">Notice</span>
          System maintenance Friday 8:00–10:00 PM ET. Some services may be unavailable.
        </div>
      </div>
      {/* Header */}
      <header className="site-header" role="banner">
        <div className="container header-inner">
          <div className="logo" data-reveal style={{ ["--reveal-delay"]: "0ms" }}>
            <img src="/bmv-logo.png" alt="Indiana BMV logo" loading="eager" />
            <span aria-label="site name">Indiana BMV (Staging)</span>
          </div>
          <nav className="nav" aria-label="Primary" data-reveal style={{ ["--reveal-delay"]: "80ms" }}>
            <a href="#">Home</a>
            <a href="#">Licenses</a>
            <a href="#">Registrations</a>
            <a href="#">Appointments</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" role="region" aria-label="Welcome">
        <div className="container">
          <h1 data-reveal style={{ ["--reveal-delay"]: "0ms" }}>Welcome to the Indiana BMV (Staging)</h1>
          <p className="hero-subtext" data-reveal style={{ ["--reveal-delay"]: "80ms" }}>
            Your one-stop portal for driver services and vehicle registration.
          </p>
          <form
            className="search-bar"
            role="search"
            onSubmit={(e) => e.preventDefault()}
            data-reveal
            style={{ ["--reveal-delay"]: "140ms" }}
          >
            <label className="hidden" htmlFor="site-search">
              Search BMV services
            </label>
            <input id="site-search" type="search" placeholder="Search BMV services" />
            <button type="submit" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.65 6.15z" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band" data-reveal style={{ ["--reveal-delay"]: "60ms" }}>
        <div className="container cta-band-inner">
          <div className="cta-text">
            <h2>Skip the line with myBMV</h2>
            <p>Renew registrations, manage licenses, and check status online—fast and secure.</p>
          </div>
          <div className="cta-actions">
            <a className="btn-primary" href="#" role="button">Create a myBMV Account</a>
            <a className="btn-secondary" href="#" role="button">Sign In</a>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section
        className="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Announcements"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-reveal
        style={{ ["--reveal-delay"]: "0ms" }}
      >
        <div className="carousel-inner" id={carouselRegionId}>
          {carouselSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`carousel-slide ${idx === currentSlide ? "active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${carouselSlides.length}`}
            >
              <div className="container carousel-slide-inner">
                <div className="carousel-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                  <button className="btn-primary" type="button">
                    {slide.button}
                  </button>
                </div>
                <div className="carousel-image">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls" aria-hidden="false">
          <button
            type="button"
            className="carousel-control"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-control"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div className="carousel-dots" role="tablist" aria-label="Slide buttons">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              className="carousel-dot"
              role="tab"
              aria-selected={i === currentSlide}
              aria-current={i === currentSlide ? "true" : undefined}
              aria-controls={carouselRegionId}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* Why myBMV */}
      <section className="why-section" aria-label="Why myBMV" data-reveal style={{ ["--reveal-delay"]: "0ms" }}>
        <div className="container">
          <h2 className="section-title">Why choose myBMV?</h2>
          <div className="why-grid">
            <article className="why-card" data-reveal style={{ ["--reveal-delay"]: "60ms" }}>
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6l-11 11-5-5"/></svg>
              </div>
              <h3>Fast & Convenient</h3>
              <p>Most transactions can be completed online in minutes.</p>
            </article>
            <article className="why-card" data-reveal style={{ ["--reveal-delay"]: "120ms" }}>
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M1 12h22"/></svg>
              </div>
              <h3>Secure by Design</h3>
              <p>Protected with modern security practices and encryption.</p>
            </article>
            <article className="why-card" data-reveal style={{ ["--reveal-delay"]: "180ms" }}>
              <div className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/></svg>
              </div>
              <h3>Available 24/7</h3>
              <p>Access services anytime, anywhere—no office visit needed.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" aria-label="Popular services">
        <div className="container">
          <div className="services-grid">
            {services.map(({ title, Icon }, idx) => (
              <article
                className="card"
                key={idx}
                data-reveal
                style={{ ["--reveal-delay"]: `${80 + idx * 60}ms` }}
              >
                <div className="card-icon" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>Start here to {title.toLowerCase()}.</p>
                <button className="card-btn" type="button" aria-label={`Start ${title}`}>
                  Start
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="footer-columns" data-reveal>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Licenses</a></li>
                <li><a href="#">Registrations</a></li>
                <li><a href="#">Appointments</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Info</h4>
              <ul>
                <li>123 BMV Street</li>
                <li>Indianapolis, IN 46204</li>
                <li>(800) 123-4567</li>
                <li><a href="mailto:info@bmv.in.gov">info@bmv.in.gov</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} Indiana BMV (Staging) — For demo purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}