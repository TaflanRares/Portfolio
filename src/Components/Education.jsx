import React from "react";
import image from "../images/motion-background.jpg";

const Education = () => {
  return (
    <section className="padding" id="education">
      <img className="background" src={image} alt="education background" />
      <div
        style={{
          backgroundColor: "white",
          width: "60%",
          padding: "3rem",
          margin: "3rem auto",
          textAlign: "left",
          borderRadius: "8px",
        }}
      >
        <h2>Education</h2>

        <div style={{ marginTop: "1.5rem" }}>
          <h3>Bachelor of Computer Engineering</h3>
          <p className="small" style={{ marginTop: "0.25rem" }}>
            Transilvania University of Brașov — Started 2024
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            Coursework includes core computer engineering topics. Currently pursuing studies while
            contributing to projects and competitions.
          </p>
        </div>

        <hr style={{ margin: "1.75rem 0" }} />

        <div>
          <h3>PNRR — Cybersecurity and AI Course</h3>
          <p className="small" style={{ marginTop: "0.25rem" }}>
            National Recovery and Resilience Plan (PNRR) initiative — Cybersecurity and Artificial
            Intelligence course.
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            Completed training focused on applied cybersecurity techniques and practical AI
            applications relevant to software and systems engineering.
            <br></br>
            <small>ASEPNS nr 8356/02.06.2025</small>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;
