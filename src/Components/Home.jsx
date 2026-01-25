/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React, { useState, useRef, useEffect } from "react";
import arrowSvg from "../images/down-arrow.svg";
import gitHubIcon from "../images/socials/github.svg";
import linkedInIcon from "../images/socials/linkedin.svg";
import envelopeIcon from "../images/socials/envelope.svg";
import PropTypes from "prop-types";

/**
 * Home background image
 *
 * Below is a sample image. Upload the image of your choice into the "images"
 * directory and import here for use. Then, set imageAltText to string that
 * represents what you see in that image.
 *
 *
 * Need an image? Check out https://unsplash.com to download a photo you
 * freely use on your site.
 */
import image from "../images/image_home1.webp";

const imageAltText = "Forest";

const Home = ({ name, title, gitHub, linkedIn, email }) => {
  // Split name into first and last for mobile
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Split name into letters with random offsets
  const nameLetters = name.split('').map((letter, i) => ({
    letter,
    offsetX: (Math.random() - 0.5) * 120,
    offsetY: (Math.random() - 0.5) * 80,
    rotation: (Math.random() - 0.5) * 30,
    delay: i * 0.06
  }));

  // Preload the hero background image so it starts loading immediately
  useEffect(() => {
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image;
      document.head.appendChild(link);
      return () => {
        if (link && link.parentNode) link.parentNode.removeChild(link);
      };
    } catch {}
  }, []);

  return (
    <section id="home" className="min-height">
      <img
        className="background"
        src={image}
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div
        className="homeText"
        style={{
          position: "absolute",
          top: "7rem",
          left: "3rem",
          color: "white",
          opacity: "0.85",
        }}
      >
        <h1 style={{ margin: 0 }} className="nameAnimated">
          <span className="firstName">
            {firstName.split('').map((letter, i) => (
              <span
                key={i}
                className="letter"
                data-letter-index={i}
                style={{
                  '--offset-x': `${nameLetters[i].offsetX}px`,
                  '--offset-y': `${nameLetters[i].offsetY}px`,
                  '--rotation': `${nameLetters[i].rotation}deg`,
                  '--delay': `${nameLetters[i].delay}s`
                }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="nameBreak"> </span>
          <span className="lastName">
            {lastName.split('').map((letter, i) => {
              const letterIndex = firstName.length + 1 + i;
              return (
                <span
                  key={letterIndex}
                  className="letter"
                  data-letter-index={letterIndex}
                  style={{
                    '--offset-x': `${nameLetters[letterIndex].offsetX}px`,
                    '--offset-y': `${nameLetters[letterIndex].offsetY}px`,
                    '--rotation': `${nameLetters[letterIndex].rotation}deg`,
                    '--delay': `${nameLetters[letterIndex].delay}s`
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        </h1>
        <h2 style={{ marginTop: "0.25rem" }}>{title}</h2>
        <div className="homeSocials" style={{ marginTop: "0.5rem" }}>
          {gitHub && (
            <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer">
              <img src={gitHubIcon} alt="GitHub" className="homeSocialIcon" width="42" height="42" />
            </a>
          )}
          {linkedIn && (
            <a
              href={`https://www.linkedin.com/in/${linkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedInIcon} alt="LinkedIn" className="homeSocialIcon" width="42" height="42" />
            </a>
          )}
          {email && (
            <>
              <button
                type="button"
                className="copyEmailBtn"
                onClick={async () => {
                  try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      await navigator.clipboard.writeText(email);
                    } else {
                      const ta = document.createElement("textarea");
                      ta.value = email;
                      ta.setAttribute("readonly", "");
                      ta.style.position = "absolute";
                      ta.style.left = "-9999px";
                      document.body.appendChild(ta);
                      ta.select();
                      document.execCommand("copy");
                      document.body.removeChild(ta);
                    }
                    // show toast below (managed by state)
                    if (window && window.dispatchEvent) {
                      const msg = (window.matchMedia && window.matchMedia('(max-width:480px)').matches)
                        ? 'Copied'
                        : 'Email copied to clipboard';
                      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: msg } }));
                    }
                  } catch (err) {
                    if (window && window.dispatchEvent) {
                      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Could not copy email' } }));
                    }
                  }
                }}
                aria-label="Copy email to clipboard"
                title="Copy email"
              >
                <img src={envelopeIcon} alt="Email" className="homeSocialIcon" width="42" height="42" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="homeLocation" aria-hidden="false">
        Brașov, Romania
      </div>
      <a
        href="#portfolio"
        className="scrollDown"
        aria-label="Scroll to Portfolio"
        onClick={(e) => {
          e.preventDefault();
          // Try to scroll to #portfolio immediately; if it's not mounted yet (lazy loaded),
          // poll briefly until the element appears (or give up after ~5s).
          const tryScroll = () => {
            const target = document.getElementById("portfolio");
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              return true;
            }
            return false;
          };

          if (tryScroll()) return;

          let attempts = 0;
          const maxAttempts = 50; // ~5 seconds at 100ms interval
          const iv = setInterval(() => {
            attempts += 1;
            if (tryScroll() || attempts >= maxAttempts) {
              clearInterval(iv);
            }
          }, 100);
        }}
      >
        <img src={arrowSvg} style={{ height: "3rem", width: "3rem" }} alt={imageAltText} width="48" height="48" />
      </a>
      <div className="scrollGradient" aria-hidden="true" />
      {/* Toast: listen for global show-toast events to reuse the same toast CSS */}
      <HomeToast />
    </section>
  );
};

// Small toast component reused inside Home via a window event
const HomeToast = () => {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const timerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const msg = e?.detail?.message || '';
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ visible: true, message: msg });
      timerRef.current = setTimeout(() => setToast({ visible: false, message: '' }), 3000);
    };
    window.addEventListener('show-toast', handler);
    return () => {
      window.removeEventListener('show-toast', handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className={`toast ${toast.visible ? 'visible' : ''}`}>
      <div className="toastMessage">{toast.message}</div>
      <button className="toastClose" onClick={() => setToast({ visible: false, message: '' })} aria-label="Dismiss notification" tabIndex={toast.visible ? 0 : -1}>×</button>
    </div>
  );
};

Home.defaultProps = {
  name: "",
  title: "",
  gitHub: "",
  linkedIn: "",
  email: "",
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  gitHub: PropTypes.string,
  linkedIn: PropTypes.string,
  email: PropTypes.string,
};

export default Home;
