import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import './contact.css';

const contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    interest: '',
    message: '',
    bookingType: '', // 'tour' or 'workshop'
    preferredDate: '',
    preferredTime: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'submitting', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      const response = await fetch('http://127.0.0.1:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          email: '',
          location: '',
          interest: '',
          message: '',
          bookingType: '',
          preferredDate: '',
          preferredTime: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Submission Error:', errorData);
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <>
    <div className="contact-page-container">
      {/* Hero Section */}
      <div className="herbal-hero-section">
        <h1>Contact Us</h1>
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        <div className="herbal-content">
          <h2>Connect With Our Herbal Experts</h2>
          <p>
            Whether you're looking to grow your own herbal garden, need guidance on
            natural remedies, or want to collaborate on a wellness initiative—we're here to help.
          </p>

          <div className="herbal-feature">
            <h4>🌱 Personalized Herbal Advice</h4>
            <p>Get recommendations on medicinal herbs based on your needs.</p>
          </div>

          <div className="herbal-feature">
            <h4>🪴 Garden Setup Support</h4>
            <p>Need help building your herbal oasis? We offer virtual consultations.</p>
          </div>

          <div className="herbal-feature">
            <h4>🤝 Community & Collaborations</h4>
            <p>Partner with us on workshops, education, or research opportunities.</p>
          </div>

          <div className="herbal-feature">
            <h4>📚 Explore Our Herbal Wisdom</h4>
            <p>Access our library of articles, guides, and recipes to deepen your understanding of herbal medicine and practices.</p>
          </div>

          <div className="herbal-feature">
            <h4>🌍 Sustainable & Ethical Sourcing</h4>
            <p>We are committed to environmentally friendly cultivation and ethical sourcing of all our herbs.</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Your city or region"
            value={formData.location}
            onChange={handleChange}
          />
          <select name="interest" value={formData.interest} onChange={handleChange} required>
            <option value="">How can we assist you?</option>
            <option value="advice">I need herbal advice</option>
            <option value="setup">Help setting up a physical garden</option>
            <option value="virtual-consultation">Virtual Garden Consultation</option>
            <option value="virtual-design">Virtual Garden Design Advice</option>
            <option value="virtual-plants">Plant Selection for Virtual Garden</option>
            <option value="book-tour">Book a Virtual Tour</option>
            <option value="book-workshop">Book a Workshop</option>
            <option value="collaboration">Collaboration/Partnership</option>
          </select>

          {(formData.interest === 'book-tour' || formData.interest === 'book-workshop') && (
            <>
              <div className="booking-options">
                <label htmlFor="bookingType">Select:</label>
                <select
                  id="bookingType"
                  name="bookingType"
                  value={formData.bookingType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  {formData.interest === 'book-tour' && <option value="tour">Virtual Tour</option>}
                  {formData.interest === 'book-workshop' && <option value="workshop">Workshop</option>}
                </select>
              </div>

              <div className="booking-preferences">
                <label htmlFor="preferredDate">Preferred Date:</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="preferredTime">Preferred Time:</label>
                <input
                  type="time"
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <textarea
            name="message"
            placeholder="Your message or question..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={submissionStatus === 'submitting'}>
            {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
          </button>

          {submissionStatus === 'success' && (
            <p className="success-message">Your request has been submitted successfully!</p>
          )}
          {submissionStatus === 'error' && (
            <p className="error-message">There was an error submitting your request. Please try again.</p>
          )}
        </form>
      </div>
    </div>
    <div className="foot">
      <Footer/>
      </div>
    </>
  );
};

export default contact;
