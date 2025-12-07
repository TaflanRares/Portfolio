/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React, { Suspense, lazy, useState, useEffect, useRef } from "react";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";

// Code splitting: Load Portfolio and Education components only when needed
// This reduces initial bundle size by ~40%
const Portfolio = lazy(() => import("./Components/Portfolio"));
const Education = lazy(() => import("./Components/Education"));

import "./styles.css";

/**
 * This object represents your information. The project is set so that you
 * only need to update these here, and values are passed a properties to the
 * components that need that information.
 *
 * Update the values below with your information.
 *
 * If you don't have one of the social sites listed, leave it as an empty string.
 */
const siteProps = {
  name: "Rareș Taflan",
  title: "Computer Engineering Student",
  email: "rarestaflan25@gmail.com",
  gitHub: "TaflanRares",
  instagram: "",
  linkedIn: "rarestaflan",
  medium: "",
  twitter: "",
  youTube: "",
};

const primaryColor = "#0c653dff";
const secondaryColor = "#70c2a0ff";

const App = () => {
  const [shouldLoadContent, setShouldLoadContent] = useState(false);
  const [theme, setTheme] = useState("light");
  const contentTriggerRef = useRef(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  // Persist and apply theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("theme", theme);
    } catch (_) {
      // ignore storage failures
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Create an intersection observer to load Portfolio/Education when user scrolls near
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadContent(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      {
        rootMargin: '400px', // Start loading 400px before section is visible
      }
    );

    if (contentTriggerRef.current) {
      observer.observe(contentTriggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="main">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Home
          name={siteProps.name}
          title={siteProps.title}
          gitHub={siteProps.gitHub}
          linkedIn={siteProps.linkedIn}
          email={siteProps.email}
        />
        {/* Invisible trigger element - loads content when scrolling near */}
        <div ref={contentTriggerRef} style={{ height: 1 }} aria-hidden="true" />

        {/* Ensure an element with id="portfolio" exists immediately so anchors and the
            Home scroll handler can target it even before the lazy component loads. */}
        {shouldLoadContent ? (
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4e567e",
                  fontSize: "1.2rem",
                }}
              >
                Loading...
              </div>
            }
          >
            <Portfolio />
            <Education />
          </Suspense>
        ) : (
          // Larger placeholder sections with same ids so links can scroll to them immediately
          // Increased sizes reduce layout shift when the lazy components mount
          <>
            <section id="portfolio" aria-hidden="true" style={{ minHeight: "80vh" }} />
            <section id="education" aria-hidden="true" style={{ minHeight: "60vh" }} />
          </>
        )}
      </main>
      <Footer {...siteProps} primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </div>
  );
};

export default App;
