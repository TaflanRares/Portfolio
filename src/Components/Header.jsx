/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Header = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [showName, setShowName] = useState(false);
  const navRef = useRef(null);

  const isDark = theme === "dark";
  const themeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  // Smooth, robust scrolling for anchor links (works with lazy-loaded sections)
  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();

    const id = href.slice(1);

    // Update the URL hash without jumping (pushState avoids immediate default jump)
    try {
      if (window && window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.location.hash = `#${id}`;
      }
    } catch (err) {
      // ignore
    }

    // Try to find the element immediately, otherwise poll until it appears or timeout
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    let attempts = 0;
    const maxAttempts = 30; // try for up to ~3 seconds (30 * 100ms)
    const interval = setInterval(() => {
      attempts += 1;
      if (tryScroll() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);
  };

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
        <nav
          id="mainNav"
          ref={navRef}
          className={`mainNav ${open ? "open" : ""}`}
          role="navigation"
        >
          <a href="#home" onClick={handleNavClick}>Home</a>
          <a href="#portfolio" onClick={handleNavClick}>Portfolio</a>
          <a href="#education" onClick={handleNavClick}>Education</a>
          <a href="#footer" onClick={handleNavClick}>Contact</a>
        </nav>

        <div className="headerActions">
          <button
            className="themeToggle"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            aria-pressed={isDark}
            type="button"
          >
            <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            <span className="themeToggleText">{isDark ? "Light" : "Dark"}</span>
          </button>

          <button
            className="hamburger"
            aria-controls="mainNav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
            type="button"
          >
            <span className={`hamburgerBox ${open ? "open" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  theme: PropTypes.string,
  onToggleTheme: PropTypes.func.isRequired,
};
