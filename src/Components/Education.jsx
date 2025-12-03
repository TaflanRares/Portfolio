import React, { useState, useEffect } from "react";
import image from "../images/motion-background.jpg";

const Education = () => {
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.location.hash === "#education") {
        const el = document.getElementById("education");
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        }
      }
    } catch (e) {
      // Safe no-op if DOM not available
    }
  }, []);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="padding" id="education">
      <img 
        className="background" 
        src={image} 
        alt="education background"
        loading="lazy"
        width="1920"
        height="1080"
      />
      <div
        className="educationContent"
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
          <h3>Transilvania University of Brașov</h3>
          <p className="small" style={{ marginTop: "0.25rem" }}>
            Bachelor of Computer Engineering — Started 2024
          </p>
          <p className="educationDescription" style={{ marginTop: "0.5rem" }}>
            <span className={expandedItems['unitbv'] ? "expanded" : "truncated"}>
              Coursework includes core computer engineering topics. Currently pursuing studies while
              contributing to projects and competitions.
            </span>
            <button 
              className="readMoreBtn"
              onClick={() => toggleExpand('unitbv')}
              aria-label={expandedItems['unitbv'] ? "Show less" : "Read more"}
            >
              {expandedItems['unitbv'] ? " Show less" : "..."}
            </button>
          </p>
        </div>

        <hr style={{ margin: "1.75rem 0" }} />

        <div>
          <h3>PNRR — Cybersecurity and AI Course</h3>
          <p className="small" style={{ marginTop: "0.25rem" }}>
            National Recovery and Resilience Plan (PNRR) initiative — Cybersecurity and Artificial
            Intelligence course - 2025.
          </p>
          <p className="educationDescription" style={{ marginTop: "0.5rem" }}>
            <span className={expandedItems['pnrr'] ? "expanded" : "truncated"}>
              Completed training focused on applied cybersecurity techniques and practical AI
              applications relevant to software and systems engineering.
              <br></br>
              <small>ASEPNS nr 8356/02.06.2025</small>
            </span>
            <button 
              className="readMoreBtn"
              onClick={() => toggleExpand('pnrr')}
              aria-label={expandedItems['pnrr'] ? "Show less" : "Read more"}
            >
              {expandedItems['pnrr'] ? " Show less" : "..."}
            </button>
          </p>
        </div>

        <hr style={{ margin: "1.75rem 0" }} />

        <div>
          <h3>Colegiul Național &quot;Radu Negru&quot;</h3>
          <p className="small" style={{ marginTop: "0.25rem" }}>
            Mathematics and Computer Science — Graduated 2024
          </p>
          <p className="educationDescription" style={{ marginTop: "0.5rem" }}>
            <span className={expandedItems['highschool'] ? "expanded" : "truncated"}>
              Developed basic programming skills and mathematical foundations. Participated in various
              competitions and olympiads. Honourable mention at 2023 National English Olympiad.
            </span>
            <button 
              className="readMoreBtn"
              onClick={() => toggleExpand('highschool')}
              aria-label={expandedItems['highschool'] ? "Show less" : "Read more"}
            >
              {expandedItems['highschool'] ? " Show less" : "..."}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;
