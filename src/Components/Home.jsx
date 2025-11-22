/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React from "react";
import arrowSvg from "../images/down-arrow.svg";
import gitHubIcon from "../images/socials/github.svg";
import linkedInIcon from "../images/socials/linkedin.svg";
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
import image from "../images/image_home1.jpg";

const imageAltText = "Forest";

const Home = ({ name, title, gitHub, linkedIn }) => {
  return (
    <section id="home" className="min-height">
      <img className="background" src={image} alt="" />
      <div
        className="homeText"
        style={{
          position: "absolute",
          top: "5rem",
          left: "2rem",
          color: "white",
          opacity: "0.8",
        }}
      >
        <h1 style={{ margin: 0 }}>{name}</h1>
        <h2 style={{ marginTop: "0.25rem" }}>{title}</h2>
        <div className="homeSocials" style={{ marginTop: "0.5rem" }}>
          {gitHub && (
            <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer">
              <img src={gitHubIcon} alt="GitHub" className="homeSocialIcon" />
            </a>
          )}
          {linkedIn && (
            <a
              href={`https://www.linkedin.com/in/${linkedIn}`}
              target="_blank" rel="noopener noreferrer">
              <img src={linkedInIcon} alt="LinkedIn" className="homeSocialIcon" />
            </a>
          )}
        </div>
      </div>
      <a href="#about" className="scrollDown" aria-label="Scroll to About">
        <img src={arrowSvg} style={{ height: "3rem", width: "3rem" }} alt={imageAltText} />
      </a>
      <div className="scrollGradient" aria-hidden="true" />
    </section>
  );
};

Home.defaultProps = {
  name: "",
  title: "",
  gitHub: "",
  linkedIn: "",
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  gitHub: PropTypes.string,
  linkedIn: PropTypes.string,
};

export default Home;
