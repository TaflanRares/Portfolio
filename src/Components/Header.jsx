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
      let el = document.getElementById(id);

      // For contact, target the actual footer container instead of the 0-height anchor
      if (id === 'contact') {
        const footerEl = document.getElementById('footer');
        if (footerEl) el = footerEl;
      }

      if (el) {
        const toFooter = (id === 'footer' || id === 'contact');
        const block = toFooter ? 'end' : 'start';
        el.scrollIntoView({ behavior: 'smooth', block });

        // Reinforce scroll for footer/contact until it's properly aligned at bottom
        if (toFooter) {
          let attempts = 0;
          const maxAttempts = 15; // up to ~3s at 200ms
          const tick = () => {
            attempts += 1;
            const footerEl = document.getElementById('footer');
            if (footerEl) {
              const rect = footerEl.getBoundingClientRect();
              const atBottom = rect.bottom <= window.innerHeight + 2; // tolerance
              if (atBottom) return; // aligned
              // Scroll explicitly to the bottom of the footer
              const targetTop = footerEl.offsetTop + footerEl.offsetHeight - window.innerHeight;
              window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            }
            if (attempts < maxAttempts) {
              setTimeout(tick, 200);
            }
          };
          setTimeout(tick, 200);
        }
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
          <a href="#contact" onClick={handleNavClick}>Contact</a>
        </nav>

        <div className="headerActions">
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
