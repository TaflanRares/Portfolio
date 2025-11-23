/**
 * Portfolio component
 *
 * Highlights some of  your creations. These can be designs, websites,
 * open source contributions, articles you've written and more.
 *
 * This is a great area for you to to continually add to and refine
 * as you continue to learn and create.
 */

import React from "react";

import LinguaAstraImg from "../images/projects/LinguaAstra.png";
import BazeleElectrotehniciiVRImg from "../images/projects/BazeleElectrotehniciiVR.png";
import ReactImg from "../images/projects/ReactLogo.png";
import BESTImg from "../images/projects/BESTLogoVisiniu.png";

/**
 * Project list
 *
 * An array of objects that will be used to display for your project
 * links section. Below is a sample, update to reflect links you'd like to highlight.
 */
const projectList = [
  {
    title: "BEST Brașov",
    description:
      "Active member of the student organization BEST (Board of European Students of Technology) in Brașov, Romania. Logistics responsible for Best Training Week 2025, with over 100 participants.",
    url: "https://bestbrasov.ro/",
    skills: ["Event logistics", "Teamwork", "Communication"],
    image: BESTImg,
  },
  {
    title: "Lingua Astra",
    description:
      "Entry in the Epic Games 2025 Epic MegaJam as part of a 3-person team, a scifi puzzle game. I used C++ and Unreal Engine, implementing postprocessing, core gameplay mechanics and level design.",
    url: "https://itch.io/jam/2025-epic-megajam/rate/3985405",
    skills: ["C++", "Game Design", "Level Design"],
    image: LinguaAstraImg,
  },
  {
    title: "Basic Electrotechnics in Virtual Reality",
    description:
      "A VR app developed in Unreal Engine to help students understand the basics of electrotechnics. Winner of AFCO 2025 at Transilvania University of Brașov. ",
    url: "https://afco.unitbv.ro/images/Documente/Premii_AFCO_2025-1.pdf",
    skills: ["Unreal Engine", "VR", "Educational UX"],
    image: BazeleElectrotehniciiVRImg,
  },
  {
    title: "My Portfolio Website",
    description:
      "The website you are on right now. Built using react.js and hosted on GitHub pages. Continuously updated to showcase my latest projects and skills.",
    url: "",
    skills: ["React", "Web Dev", "Deployment"],
    image: ReactImg,
  },
];

const Portfolio = () => {
  return (
    <section className="padding" id="portfolio">
      <h2 style={{ textAlign: "center" }}>Portfolio</h2>
      <div className="portfolioInner" style={{ paddingTop: "3rem" }}>
        <div className="container">
          {projectList.map((project) => (
            <div className="box" key={project.title}>
              <div className="projectImageWrap">
                {project.image ? (
                  <img src={project.image} className="projectImage" alt={project.title} />
                ) : (
                  <div className="projectImagePlaceholder" aria-hidden="true">
                    No image
                  </div>
                )}
              </div>

              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <h3 style={{ flexBasis: "40px" }}>{project.title}</h3>
              </a>
              <p className="small">{project.description}</p>
              <div className="projectSkills" aria-label={`${project.title} skills`}>
                {(project.skills || []).map((skill) => (
                  <span className="skillChip" key={skill} aria-hidden="true">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
