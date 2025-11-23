/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
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

  return (
    <header className="siteHeader" role="banner">
      <div className="headerInner">
        <div className="brand" aria-hidden="true"></div>

        <button
          className="hamburger"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
        >
          <span className={`hamburgerBox ${open ? "open" : ""}`} />
        </button>

        <nav id="mainNav" ref={navRef} className={`mainNav ${open ? "open" : ""}`} role="navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#education">Education</a>
          <a href="#footer">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
