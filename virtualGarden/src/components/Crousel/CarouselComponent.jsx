import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';

function CarouselComponent({ slides }) {
  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="carousel-image"
            src={slide.image}
            alt={`Slide ${index + 1}`}
          />
          {slide.caption && (
            <Carousel.Caption>
              <h3>{slide.caption.title}</h3>
              <p>{slide.caption.text}</p>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
