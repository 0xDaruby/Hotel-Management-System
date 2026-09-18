"use client";

import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const mobileNavRef = useRef<HTMLDetailsElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 48);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const closeMobileNav = () => {
    mobileNavRef.current?.removeAttribute("open");
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <a className="brand-lockup" href="#top" aria-label="XYZ Hotel home">
        <span>XYZ</span>
        <small>Hotel</small>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#rooms">Rooms</a>
        <a href="#experience">Experience</a>
        <a href="#booking-journey">How it works</a>
        <a href="#my-stay">My Stay</a>
      </nav>

      <a className="header-cta" href="#availability">
        Check availability
      </a>

      <details className="mobile-nav" ref={mobileNavRef}>
        <summary aria-label="Navigation menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="#rooms" onClick={closeMobileNav}>
            Rooms
          </a>
          <a href="#experience" onClick={closeMobileNav}>
            Experience
          </a>
          <a href="#booking-journey" onClick={closeMobileNav}>
            How it works
          </a>
          <a href="#my-stay" onClick={closeMobileNav}>
            My Stay
          </a>
          <a href="#availability" onClick={closeMobileNav}>
            Check availability
          </a>
        </nav>
      </details>
    </header>
  );
}
