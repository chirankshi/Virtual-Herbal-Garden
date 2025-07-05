import React, { useState } from 'react';
import './Review.css';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: "Ray Robertson",
    role: "CEO Company",
    date: "10th February, 2025",
    image: "https://media.istockphoto.com/id/906808234/photo/handsome-man.jpg?s=612x612&w=0&k=20&c=Ec8IY-ETslaS56vmO77BJyEOpPM1hzJlLbs6xeKRoAc=",
    rating: 5,
    message: "The Virtual Herbal Garden has been a blessing! I discovered simple home remedies for cold and sore throat that actually worked. It's so refreshing to see ancient wisdom presented in such a modern and easy-to-understand format."
  },
  {
    name: "Sherl",
    role: "Marketing Director ",
    date: "15th March, 2025",
    image: "https://manofmany.com/wp-content/uploads/2024/02/10-Most-Famous-Male-Models-of-All-Time-David-Gandy.jpg",
    rating: 4,
    message: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore. Lorem Ipsum Dolor Sit Amet."
  },
  {
    name: "Liam Johnson",
    role: "Software Engineer",
    date: "18th April, 2025",
    image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740",
    rating: 5,
    message: "I've been exploring herbal medicine lately, and this site is a goldmine! The plant profiles are informative. It feels like having a personal herbalist in my pocket."
  },
  {
    name: "Sofia Martínez",
    role: "Administrative Assistant ",
    date: "25th April, 2025",
    image: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?semt=ais_hybrid&w=740",
    rating: 5,
    message: "Great educational resource! As someone who's new to natural healing, I found the explanations simple, scientific, and practical. I also love that you can filter remedies based on symptoms—very user-friendly!"
  },
  {
    name: "Fatima Noor",
    role: "Project Manager",
    date: "6th May, 2025",
    image: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid&w=740",
    rating: 5,
    message: "The website is beautifully designed and easy to navigate. I appreciate the cultural insights behind each herb. My grandmother used many of these, and it's amazing to reconnect with those remedies online."
  },
  {
    name: "Kenji Tanaka",
    role: "CEO Company",
    date: "10th Feb, 2023",
    image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    rating: 4,
    message: "The virtual garden concept is brilliant! It feels interactive and personal. I've learned so much about herbs I never knew existed. Also, the PDF download feature for each blog is a big plus!"
  },
  {
    name: "Kenji Tanaka",
    role: "CEO Company",
    date: "10th Feb, 2023",
    image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    rating: 4,
    message: "The virtual garden concept is brilliant! It feels interactive and personal. I've learned so much about herbs I never knew existed. Also, the PDF download feature for each blog is a big plus!"
  },
];

const MAX_CHARS = 150;

const Review = () => {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState({});

  const prevTestimonial = () => {
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setIndex((index + 1) % testimonials.length);
  };

  const toggleReadMore = (i) => {
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="testimonial-section">
      <h2 className="section-title">
        What people Think <span>About Us</span>
      </h2>

      <div className="carousel-container">
        <button className="arrow left" onClick={prevTestimonial}>
          <FaArrowLeft />
        </button>

        {[0, 1].map((offset) => {
          const currentIndex = (index + offset) % testimonials.length;
          const testimonial = testimonials[currentIndex];
          const isExpanded = expanded[currentIndex];

          const shortText = testimonial.message.length > MAX_CHARS
            ? testimonial.message.slice(0, MAX_CHARS) + "..."
            : testimonial.message;

          return (
            <>
            <div className="testimonial-card" key={testimonial.name + offset}>
              <div className="stars-review">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="star-review" />
                ))}
              </div>

              <p className={`testimonial-text ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded ? testimonial.message : shortText}
              </p>

              <p className="testimonial-date">{testimonial.date}</p>

              <div className="testimonial-user">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                  {testimonial.message.length > MAX_CHARS && (
                    <div className="read-more-container">
                      <button className="read-more-btn" onClick={() => toggleReadMore(currentIndex)}>
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </>
          );
        })}

        <button className="arrow right" onClick={nextTestimonial}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Review;
