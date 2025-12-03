/**
 * Footer component
 *
 * Displays avenues to contact you.
 * Contact information is passed in from the App component that
 * renders the Footer.
 *
 * If a social value has an empty string it will not be displayed.
 */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import devDotToIcon from "../images/socials/devdotto.svg";
import envelopeIcon from "../images/socials/envelope.svg";
import gitHubIcon from "../images/socials/github.svg";
import instagramIcon from "../images/socials/instagram.svg";
import linkedInIcon from "../images/socials/linkedin.svg";
import mediumIcon from "../images/socials/medium.svg";
import twitterIcon from "../images/socials/twitter.svg";
import youTubeIcon from "../images/socials/youtube.svg";

/**
 * 💡 Learning resources
 *
 *  HTML hyperlinks: https://www.w3schools.com/html/html_links.asp
 *  Opening links in new tabs: https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
 */

const Footer = (props) => {
  const {
    devDotTo,
    email,
    gitHub,
    instagram,
    linkedIn,
    medium,
    name,
    primaryColor,
    twitter,
    youTube,
  } = props;

  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimer = useRef(null);

  const showToast = (message, duration = 3000) => {
    // clear any existing timer
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ visible: true, message });
    toastTimer.current = setTimeout(() => {
      setToast({ visible: false, message: "" });
      toastTimer.current = null;
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.location.hash === "#footer") {
        const el = document.getElementById("footer");
        if (el) {
          // Allow layout to settle after mount, then scroll into view
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        }
      }
    } catch (e) {
      // Safe no-op if DOM not available
    }
  }, []);

  const copyEmailToClipboard = async () => {
    if (!email) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback
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
      const shortMsg = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width:480px)').matches)
        ? 'Copied'
        : 'Email copied to clipboard';
      showToast(shortMsg);
    } catch (err) {
      showToast("Could not copy email");
    }
  };

  return (
    <div
      id="footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        padding: "2.5rem 0 1.5rem",
        backgroundColor: primaryColor,
        width: "100vw",
      }}
    >
      {/* Anchor for contact so links can target #contact immediately */}
      <div id="contact" aria-hidden="true" style={{ width: 0, height: 0, overflow: 'hidden' }} />

      {/* Accessible heading for the footer (screen readers + SEO) */}
      <h2 className="visually-hidden">Contact</h2>
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', justifyContent: 'center' }}>
        <div className="footerPrimarySocials" aria-hidden={false}>
          {gitHub && (
            <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={gitHubIcon} alt="GitHub" className="homeSocialIcon" width="36" height="36" />
            </a>
          )}

          {linkedIn && (
            <a href={`https://www.linkedin.com/in/${linkedIn}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedInIcon} alt="LinkedIn" className="homeSocialIcon" width="36" height="36" />
            </a>
          )}

          {email && (
            <button
              type="button"
              className="copyEmailBtn"
              onClick={copyEmailToClipboard}
              aria-label="Copy email to clipboard"
              title="Copy email"
            >
              <img src={envelopeIcon} alt="Email" className="homeSocialIcon" width="36" height="36" />
            </button>
          )}
        </div>

        {/* secondary/extra socials */}
        <div className="homeSocials" aria-hidden={false}>
          {devDotTo && (
            <a href={`https://dev.to/${devDotTo}`} target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
              <img src={devDotToIcon} alt="Dev.to" className="socialIcon" />
            </a>
          )}
          {instagram && (
            <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" className="socialIcon" />
            </a>
          )}
          {medium && (
            <a href={`https://medium.com/@${medium}`} target="_blank" rel="noopener noreferrer" aria-label="Medium">
              <img src={mediumIcon} alt="Medium" className="socialIcon" />
            </a>
          )}
          {twitter && (
            <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" className="socialIcon" />
            </a>
          )}
          {youTube && (
            <a href={`https://www.youtube.com/c/${youTube}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src={youTubeIcon} alt="YouTube" className="socialIcon" />
            </a>
          )}
        </div>
      </div>
      <p className="small" style={{ marginTop: 0, color: "white" }}>
        Created by {name}
      </p>

      {/* Toast notification */}
      <div
        role="status"
        aria-live="polite"
        className={`toast ${toast.visible ? "visible" : ""}`}
        aria-hidden={!toast.visible}
      >
        <div className="toastMessage">{toast.message}</div>
        <button
          className="toastClose"
          onClick={() => setToast({ visible: false, message: "" })}
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  name: "",
};

Footer.propTypes = {
  devDotTo: PropTypes.string,
  email: PropTypes.string,
  gitHub: PropTypes.string,
  instagram: PropTypes.string,
  linkedIn: PropTypes.string,
  medium: PropTypes.string,
  name: PropTypes.string.isRequired,
  primaryColor: PropTypes.string,
  twitter: PropTypes.string,
  youTube: PropTypes.string,
};

export default Footer;
