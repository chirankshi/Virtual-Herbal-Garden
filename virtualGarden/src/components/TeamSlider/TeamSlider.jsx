import React from 'react';
import Slider from 'react-slick';
import './TeamSlider.css';
import PlantDetail from '../../components/ExplorePlants/PlantDetail';

const TeamSlider = ({ images = [], button = null,onButtonClick = () => {} }) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, // Enable centering of cards
    centerPadding: '1rem', // Add space on both sides of the center card
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  
  return (
    <>
    <div className="team-slider-container">
      <Slider {...settings}>
        {images.map((member, idx) => (
          <div className="team-card" key={idx}>
          <div className="image-wrapper">
            <img
              src={member.img || member.image}
              alt={member.name || member.commonName || "Unnamed"}
            />
            {button && (
              <div className="overlay" 
              onClick={(e) => {
                e.stopPropagation(); // prevents event bubbling
                onButtonClick(member); // pass the specific member as argument
              }}>
                <div className="hover-button" >{button}</div>
              </div>
            )}
          </div>
          <div className="member-name">
            {member.name || member.commonName || "Unnamed"}
          </div>
        </div>
        
        ))}
      </Slider>
    </div>


    </>
  );
};

export default TeamSlider;
