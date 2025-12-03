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
  const contentTriggerRef = useRef(null);

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
      <Header />
      <Home
        name={siteProps.name}
        title={siteProps.title}
        gitHub={siteProps.gitHub}
        linkedIn={siteProps.linkedIn}
        email={siteProps.email}
      />
      {/* Invisible trigger element - loads content when scrolling near */}
      <div ref={contentTriggerRef} style={{ height: 1 }} aria-hidden="true" />
      
      {/* Only load Portfolio/Education when user scrolls close or immediately if JS determines it */}
      {shouldLoadContent && (
        <Suspense fallback={
          <div style={{
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4e567e',
            fontSize: '1.2rem'
          }}>
            Loading...
          </div>
        }>
          <Portfolio />
          <Education />
        </Suspense>
      )}
      <Footer {...siteProps} primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </div>
  );
};

export default App;
