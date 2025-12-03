/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showName, setShowName] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e) => {
      if (!open) return;
      if (navRef.current && !navRef.current.contains(e.target) && !e.target.closest(".hamburger")) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const homeSection = document.getElementById('home');
      const portfolioSection = document.getElementById('portfolio');
      
      if (homeSection && portfolioSection) {
        const homeRect = homeSection.getBoundingClientRect();
        const portfolioRect = portfolioSection.getBoundingClientRect();
        
        // Show name when portfolio is in view, hide when scrolled back to home
        if (portfolioRect.top < window.innerHeight * 0.7 && homeRect.bottom < 100) {
          if (!showName) {
            setShowName(true);
            document.documentElement.classList.add('letters-animating');
          }
        } else if (homeRect.bottom > 100) {
          if (showName) {
            setShowName(false);
            document.documentElement.classList.remove('letters-animating');
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // Check initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, [showName]);

  return (
    <header className="siteHeader" role="banner">
      <div className="headerInner">
        <div className="brand" aria-hidden="true">
          <div className={`headerName ${showName ? 'visible' : ''}`}>
            Rareș Taflan
          </div>
        </div>

        <button
          className="hamburger"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
        >
          <span className={`hamburgerBox ${open ? "open" : ""}`} />
        </button>

        <nav
          id="mainNav"
          ref={navRef}
          className={`mainNav ${open ? "open" : ""}`}
          role="navigation"
        >
          <a href="#home">Home</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#education">Education</a>
          <a href="#footer">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
