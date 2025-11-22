/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React from "react";

import About from "./Components/About";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Portfolio from "./Components/Portfolio";
import Education from "./Components/Education";

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
  return (
    <div id="main">
      <Header />
      <Home
        name={siteProps.name}
        title={siteProps.title}
        gitHub={siteProps.gitHub}
        linkedIn={siteProps.linkedIn}
      />
      <About />
      <Portfolio />
      <Education />
      <Footer {...siteProps} primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </div>
  );
};

export default App;
