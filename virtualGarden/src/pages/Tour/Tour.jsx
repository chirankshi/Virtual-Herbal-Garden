// import React from 'react'
// import './Tour.css'
// import Footer from '../../components/Footer/Footer'
// import MainTour from '../../pages/Tour/MainTour';

// const Tour = () => {
  
//   return (
//     <>
//          {/* Hero Section */}
//       <section className="tour-hero">
//         <div className="tour-hero__overlay">
//           <h1 className="tour-hero__title">
//            Explore Greenbloom Tour
//           </h1>
//         </div>
//       </section>
      
//       <div className="tourContainer">
//        <MainTour/>
//       </div>

//       <div className="footcont">
//         <Footer/>
//       </div>
//     </>
//   )
// }

// export default Tour



import React, { useState } from 'react';
import './Tour.css';
import Footer from '../../components/Footer/Footer';
import MainTour from '../../pages/Tour/MainTour';

const Tour = () => {
  const [showTour, setShowTour] = useState(false);

  const handleExploreClick = () => {
    setShowTour(true);
    setTimeout(() => {
      const tourSection = document.getElementById('tour-section');
      if (tourSection) {
        tourSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="tour-hero">
        <div className="tour-hero__overlay">
          <h1 className="tour-hero__title">Explore Greenbloom Tour</h1>
        </div>
      </section>
     <div className="buttondiv">
        {!showTour ? (
          <button className="explore-btn" onClick={handleExploreClick}>
            Explore Tour
          </button>
        ) : (
          <button className="Tourmainclose-btn" onClick={() => setShowTour(false)}>
            Close Tour
          </button>
        )}
      </div>

      {showTour && (
        <div id="tour-section" className="tourContainer">
          <MainTour />
        </div>
      )}

      <div className="footcont">
        <Footer />
      </div>
    </>
  );
};

export default Tour;
