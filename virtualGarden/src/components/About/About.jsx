import React from 'react'
import "./About.css"
import gardenImage from "../../assets/images/abouthome.jpg";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="about-section" id="about">
      <h2> <span>About GreenBloom 🌿</span></h2>
    <div className="about-container">
      <div className="about-text" data-aos="fade-right">
        <p>
            Welcome to <strong>GreenBloom</strong> — your digital herbal sanctuary where ancient botanical wisdom meets modern technology. We’re here to reconnect you with nature’s healing power through an immersive virtual experience.
          </p>
          <p>
            🌿 Whether you’re an herbal enthusiast, a curious learner, or a health-conscious explorer, GreenBloom provides comprehensive knowledge of medicinal plants, from roots to remedies.
          </p>
        <p>
          GreenBloom is your digital gateway to the world of medicinal herbs. 🌱<br />
          Explore nature’s pharmacy, discover ancient healing secrets, and learn how plants
          can nurture your body, mind, and soul—all from one vibrant virtual garden.
        </p>
        <Link to="/aboutus" className="about-button">Read More</Link>
      </div>
      <div className="about-image" data-aos="fade-left">
        <img src={gardenImage} alt="Herbal Garden" />
      </div>
    </div>
  </section>
  )
}

export default About
